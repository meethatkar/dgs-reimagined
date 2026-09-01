"use client";
import React, { useRef, useEffect, useId } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MultiStepTextScroll = ({ data = [], bgColor = "#F9F8F5" }) => {
  const containerRef = useRef(null);
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".step-content-section");
      const fillLayers = gsap.utils.toArray(".step-number-fill");

      // 1. Initial Setup: Hide all content except first, set initial fill state
      gsap.set(sections, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(sections[0], { autoAlpha: 1, pointerEvents: "auto" });

      // First number filled (100% height), remaining numbers empty (0% height)
      gsap.set(fillLayers[0], { height: "100%" });
      gsap.set(fillLayers.slice(1), { height: "0%" });

      // 2. Master Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: `multistep-${uid}`,
          trigger: containerRef.current,
          start: "top top",
          end: `+=${data.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 3. Sequence Loop
      sections.forEach((sec, i) => {
        // Hold phase for reading
        tl.to({}, { duration: 1 });

        if (i < sections.length - 1) {
          const nextSec = sections[i + 1];
          const currChars = sec.querySelectorAll(".char-item");
          const nextChars = nextSec.querySelectorAll(".char-item");
          const transitionLabel = `crossfade-${i}`;

          tl.addLabel(transitionLabel)
            // --- ANIMATE OUT CURRENT CONTENT ---
            .to(
              currChars,
              {
                y: -40,
                autoAlpha: 0,
                stagger: 0.01,
                duration: 0.5,
                ease: "power2.in",
                force3D: true,
              },
              transitionLabel
            )
            .to(
              sec.querySelectorAll(".step-feature-item"),
              {
                y: -20,
                autoAlpha: 0,
                stagger: 0.05,
                duration: 0.4,
                force3D: true,
              },
              transitionLabel
            )
            // Slide fill out for current number indicator
            .to(
              fillLayers[i],
              {
                height: "0%",
                duration: 0.4,
                ease: "power2.inOut",
              },
              transitionLabel
            )
            .set(sec, { pointerEvents: "none" }, transitionLabel + "+=0.5")

            // --- ANIMATE IN NEXT CONTENT ---
            .set(nextSec, { autoAlpha: 1, pointerEvents: "auto" }, transitionLabel)
            .fromTo(
              nextChars,
              { y: 40, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                stagger: 0.02,
                duration: 0.6,
                ease: "power2.out",
                force3D: true,
              },
              transitionLabel
            )
            .fromTo(
              nextSec.querySelectorAll(".step-feature-item"),
              { y: 20, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                stagger: 0.05,
                duration: 0.5,
                force3D: true,
              },
              transitionLabel
            )
            // Slide fill up for next number indicator
            .to(
              fillLayers[i + 1],
              {
                height: "100%",
                duration: 0.4,
                ease: "power2.inOut",
              },
              transitionLabel
            );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data, uid]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: bgColor }}
    >
      {/* 1. Numbers Indicator (Sliding Bottom-to-Top Fill Reveal) */}
      <div className="absolute top-[12vh] md:top-[16vh] w-full flex justify-center gap-6 md:gap-16 z-20 px-4">
        {data.map((step, i) => (
          <div
            key={i}
            className="step-number-indicator relative inline-flex items-center text-2xl sm:text-4xl md:text-5xl font-black font-mono select-none"
          >
            {/* Base Muted Number Text */}
            <span className="text-neutral-300">
              {step.id || `0${i + 1}`}.
            </span>

            {/* Sliding Fill Overlay */}
            <div
              className="step-number-fill absolute bottom-0 left-0 w-full flex items-end overflow-hidden pointer-events-none transition-none"
              style={{ height: "0%" }}
            >
              <span className="text-[#121212] whitespace-nowrap">
                {step.id || `0${i + 1}`}.
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Text Content Stack (Perfectly Vertically Centered with Word Grouping) */}
      <div className="relative w-full max-w-7xl h-[60vh] flex items-center justify-center z-10 mt-[6vh]">
        {data.map((step, i) => (
          <div
            key={i}
            className="step-content-section absolute inset-0 w-full flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="step-title text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter leading-tight text-[#121212] will-change-transform flex flex-wrap justify-center gap-x-[0.3em]">
              {step.title.split(" ").map((word, wordIdx) => (
                <span
                  key={wordIdx}
                  className="inline-block whitespace-nowrap"
                >
                  {word.split("").map((char, charIdx) => (
                    <span
                      key={charIdx}
                      className="char-item inline-block will-change-transform"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Sub-features Grid */}
            {step.features && step.features.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 md:gap-10 mt-6 md:mt-12 w-full max-w-5xl">
                {step.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="step-feature-item flex flex-col items-center gap-1.5 md:gap-2 will-change-transform"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-neutral-600 uppercase tracking-widest max-w-[220px]">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MultiStepTextScroll;
