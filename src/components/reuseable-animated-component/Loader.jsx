"use client";
import { gsap } from "@/utils/gsap.utils";
import React, { useEffect, useRef, useState } from "react";

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
  holdDuration = 0.25,
  fadeInDuration = 0.25,
  fadeOutDuration = 0.2,
  counterDuration = 3,
  explodeScale = 60,
  explodeDuration = 0.6,
  exitDuration = 0.15,
  zIndex = 10000,
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const circleRef = useRef(null);
  const counterRef = useRef(null);
  const counterWrapperRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  const timelineRef = useRef(null);
  const exitTweenRef = useRef(null);
  const rafIdRef = useRef(null);

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

      // ── Word cycling (sequential) ────────────────────────────────────────
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

      // ── Counter (throttled RAF for zero layout reflows) ───────────────────
      if (showCounter) {
        const counter = { val: 0 };
        let lastValue = -1;

        tl.to(
          counter,
          {
            val: 100,
            duration: counterDuration,
            ease: "power2.inOut",
            onUpdate: () => {
              const currentRound = Math.round(counter.val);
              if (currentRound !== lastValue) {
                lastValue = currentRound;
                if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = requestAnimationFrame(() => {
                  if (counterRef.current) {
                    counterRef.current.innerText = `${currentRound}%`;
                  }
                });
              }
            },
          },
          0,
        );
      }

      // ── Fade out counter + text before mask wipe ──────────────────
      const fadeTargets = showCounter
        ? [counterWrapperRef.current, textRef.current]
        : [textRef.current];
      tl.to(fadeTargets, { opacity: 0, duration: 0.15 }, "-=0.1");

      // ── Shrink & drop circle ───────────────────────────────────────────────
      tl.to(
        circleRef.current,
        {
          scale: 0,
          opacity: 0,
          y: 100, // drop further down
          duration: 0.4,
          ease: "power2.inOut",
        },
        "<", // start simultaneously with text fade
      );

      // ── Mask wipe: hole expands from bottom-center ─────────────────────────
      tl.to(
        containerRef.current,
        {
          "--hole": "150%",
          duration: explodeDuration,
          ease: "power3.inOut",
        },
        "+=0.05",
      );
    }, containerRef);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      timelineRef.current?.kill();
      exitTweenRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const safeWords = words.length ? words : DEFAULT_WORDS;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 flex items-center justify-center overflow-hidden ${className}`}
      style={{
        willChange: "opacity",
        backgroundColor,
        zIndex,
        "--hole": "0%",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 100%, transparent var(--hole), black var(--hole))",
        maskImage:
          "radial-gradient(circle at 50% 100%, transparent var(--hole), black var(--hole))",
      }}
    >
      {/* Cycling phrases */}
      <h1
        ref={textRef}
        className={`z-10 select-none text-center px-6 leading-tight ${textClassName}`}
        style={{ opacity: 0, transform: "translateY(24px)" }}
      >
        {safeWords[wordIndex]}
      </h1>

      {/* Decorative circle */}
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
