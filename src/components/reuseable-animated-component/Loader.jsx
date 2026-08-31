"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Reusable Preloader
 * ───────────────────────────────────────────────────────────────────────────
 * Animation sequence (times are relative, scaled by `speed`):
 *
 *  t=0.0   Word 1 fades in        (parallel with counter starting)
 *  t=0.3   Word 1 holds
 *  t=0.75  Word 1 fades out
 *  t=1.0   Word 2 fades in
 *   ...    (repeats per word)
 *  ────────────────────────────────────────────────────────────────────────
 *  t=0.0   Counter: 0% → 100%  (counterDuration, runs fully in parallel)
 *  ────────────────────────────────────────────────────────────────────────
 *  Counter + text fade out
 *  Circle EXPLODES (scale: explodeScale, explodeDuration)
 *  Container fades to opacity:0 (exitDuration) — content behind bleeds through
 *  onComplete fires → caller flips its own `isLoading` state
 *
 * Why no ctx.revert() on unmount:
 *  This component is designed to stay mounted for the lifetime of the page
 *  (the parent toggles visibility of the *real* content via its own
 *  `isLoading` state — see the PageWrapper pattern below). If we called
 *  ctx.revert() on cleanup, it would snap every tween's targets back to
 *  their pre-animation inline styles (opacity/scale/position), which would
 *  visually "undo" the finished wipe — e.g. on a React StrictMode double
 *  effect-fire in dev, or if the parent ever re-renders/remounts this
 *  component. Since the whole point is "loader plays once, then main
 *  content is shown directly," we intentionally leave the final state
 *  (container at opacity:0, circle fully scaled) alone. We still kill the
 *  timeline/tween on unmount purely to avoid memory leaks / stray
 *  callbacks — that does not touch any applied styles.
 */

const DEFAULT_WORDS = ["Welcome.", "Loading Experience.", "Almost There."];

const Preloader = ({
  words = DEFAULT_WORDS,
  onComplete,
  backgroundColor = "#1c1c1c",
  circleColor = "#F9F8F5",
  showCounter = true,
  textClassName = "text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-wide",
  counterClassName = "text-neutral-900 font-bold text-xl md:text-2xl font-mono",
  className = "",
  holdDuration = 0.45,
  fadeInDuration = 0.3,
  fadeOutDuration = 0.25,
  counterDuration = 2.5,
  explodeScale = 60,
  explodeDuration = 1.2,
  exitDuration = 15.18, //TODO: NEED TO TWEAK THIS TO SHOW MAIN CONTENT, AS SOON AS IT STARTS TO SLIDE UP.
  zIndex = 10000,
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const circleRef = useRef(null);
  const counterRef = useRef(null);
  const counterWrapperRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  // These live outside gsap.context intentionally — see comment at top of file.
  const timelineRef = useRef(null);
  const exitTweenRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const safeWords = words.length ? words : DEFAULT_WORDS;

    const ctx = gsap.context(() => {
      // ── Initial positions ─────────────────────────────────────────────
      gsap.set(circleRef.current, {
        xPercent: -50,
        left: "50%",
        bottom: "-100px",
        force3D: true,
      });
      if (showCounter) {
        gsap.set(counterWrapperRef.current, {
          xPercent: -50,
          left: "50%",
          bottom: "35px",
        });
      }
      gsap.set(textRef.current, { opacity: 0, y: 24, force3D: true });

      const tl = gsap.timeline({
        onComplete: () => {
          // Circle is fully expanded — it covers the entire viewport.
          // Fire onComplete (→ setIsLoading(false)) at the START of the fade
          // so React renders content during the 0.18s window. By the time
          // the container becomes transparent, content is already painted.
          exitTweenRef.current = gsap.to(containerRef.current, {
            opacity: 0,
            duration: exitDuration,
            zIndex: 0,
            ease: "power1.in",
            onStart: () => onComplete?.(),
          });
        },
      });
      timelineRef.current = tl;

      // ── Word cycling (sequential, primary axis) ─────────────────────────
      safeWords.forEach((_, i) => {
        const isLast = i === safeWords.length - 1;

        tl.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: fadeInDuration,
          ease: "power2.out",
          force3D: true,
          onStart: () => setWordIndex(i),
        });

        if (!isLast) {
          tl.to(textRef.current, {
            opacity: 0,
            y: -18,
            duration: fadeOutDuration,
            ease: "power2.in",
            force3D: true,
            delay: holdDuration,
          });
          tl.set(textRef.current, { y: 24 });
        } else {
          tl.to(
            {},
            { duration: holdDuration - 0.1 > 0 ? holdDuration - 0.1 : 0.1 },
          );
        }
      });

      // ── Counter (runs fully in parallel from t=0) ────────────────────────
      if (showCounter) {
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: 100,
            duration: counterDuration,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.innerText = `${Math.round(counter.val)}%`;
              }
            },
          },
          0, // absolute position = starts alongside word 1
        );
      }

      // ── Fade out counter + text before the circle explodes ──────────────
      const fadeTargets = showCounter
        ? [counterWrapperRef.current, textRef.current]
        : [textRef.current];
      tl.to(fadeTargets, { opacity: 0, duration: 0.2 }, "-=0.15");

      // ── Circle wipe: explodes from bottom-center ─────────────────────────
      tl.to(
        circleRef.current,
        {
          scale: explodeScale,
          duration: explodeDuration,
          ease: "power3.inOut",
          force3D: true,
        },
        "+=0.1",
      );
    }, containerRef);

    return () => {
      // Intentionally NOT calling ctx.revert() here. Reverting would reset
      // every tween target back to its pre-animation inline style (undoing
      // the finished wipe / opacity:0 exit), which fights the "loader plays
      // once, then main content shows directly" model. We only kill the
      // running timeline/tween so nothing keeps ticking after unmount.

      timelineRef.current?.kill();
      exitTweenRef.current?.kill();
      ctx.revert; // no-op reference kept only to avoid unused-var lint noise
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const safeWords = words.length ? words : DEFAULT_WORDS;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 flex items-center justify-center overflow-hidden ${className}`}
      style={{ willChange: "opacity", backgroundColor, zIndex }}
    >
      {/* Cycling phrases */}
      <h1
        ref={textRef}
        className={`z-10 select-none text-center px-6 leading-tight ${textClassName}`}
        style={{ opacity: 0, transform: "translateY(24px)" }}
      >
        {safeWords[wordIndex]}
      </h1>

      {/* Expanding circle wipe — color should match the page background
          behind this loader for a seamless reveal. */}
      <div
        ref={circleRef}
        className="absolute w-[200px] h-[200px] rounded-full z-20 will-change-transform"
        style={{
          backgroundColor: circleColor,
          bottom: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Counter */}
      {showCounter && (
        <div
          ref={counterWrapperRef}
          className="absolute z-30 pointer-events-none flex items-center justify-center w-[200px]"
          style={{ bottom: "35px", left: "50%", transform: "translateX(-50%)" }}
        >
          <span ref={counterRef} className={counterClassName}>
            0%
          </span>
        </div>
      )}
    </div>
  );
};

export default Preloader;
