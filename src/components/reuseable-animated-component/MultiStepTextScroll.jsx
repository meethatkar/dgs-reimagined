"use client";
import { gsap, ScrollTrigger } from "@/utils/gsap.utils";
import React, { useRef, useEffect, useId } from "react";

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
          invalidateOnRefresh: true,
        },
      });

      // 3. Sequence Loop
      sections.forEach((sec, i) => {
        // Hold phase for reading
        tl.to({}, { duration: 1 });

        if (i < sections.length - 1) {
          const nextSec = sections[i + 1];
          const currWords = sec.querySelectorAll(".word-item");
          const nextWords = nextSec.querySelectorAll(".word-item");
          const transitionLabel = `crossfade-${i}`;

          tl.addLabel(transitionLabel)
            // --- ANIMATE OUT CURRENT CONTENT ---
            .to(
              currWords,
              {
                y: -100,
                autoAlpha: 0,
                stagger: 0.05,
                duration: 0.6,
                ease: "sine.inOut",
                force3D: true,
              },
              transitionLabel,
            )
            .to(
              sec.querySelectorAll(".step-feature-item"),
              {
                y: -50,
                autoAlpha: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: "sine.inOut",
                force3D: true,
              },
              transitionLabel,
            )
            // Slide fill out for current number indicator
            .to(
              fillLayers[i],
              {
                height: "0%",
                duration: 0.8,
                ease: "sine.inOut",
              },
              transitionLabel,
            )
            .set(sec, { pointerEvents: "none" }, transitionLabel + "+=0.5")

            // --- ANIMATE IN NEXT CONTENT ---
            .set(
              nextSec,
              { autoAlpha: 1, pointerEvents: "auto" },
              transitionLabel,
            )
            .fromTo(
              nextWords,
              { y: 100, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                stagger: 0.05,
                duration: 0.7,
                ease: "sine.inOut",
                force3D: true,
              },
              transitionLabel,
            )
            .fromTo(
              nextSec.querySelectorAll(".step-feature-item"),
              { y: 20, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                stagger: 0.05,
                duration: 0.5,
                ease: "sine.inOut",
                force3D: true,
              },
              transitionLabel,
            )
            // Slide fill up for next number indicator
            .to(
              fillLayers[i + 1],
              {
                height: "100%",
                duration: 0.4,
                ease: "sine.inOut",
              },
              transitionLabel,
            );
        }
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, [data, uid]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden"
    >
      {/* ── Split Background ── */}
      <div className="absolute inset-0 flex">
        <div className="w-[35%] h-full bg-white relative">
          <div className="absolute right-4 md:right-8 top-[15%] text-right text-[10px] md:text-xs uppercase font-medium text-[#121212] tracking-widest flex flex-col items-end pointer-events-none">
            <span className="text-xl md:text-2xl leading-none mb-1 font-light">
              +
            </span>
            <span className="whitespace-nowrap">THE DGS STANDARD</span>
          </div>
        </div>
        <div
          className="w-[65%] h-full"
          style={{ backgroundColor: bgColor }}
        ></div>
      </div>

      {/* ── Static Numbers Indicator ── */}
      <div className="absolute top-[15%] left-[35%] w-[65%] pl-6 md:pl-16 z-20 pointer-events-none">
        <div className="flex gap-4 md:gap-8 text-3xl md:text-5xl font-semibold font-poppins text-neutral-300">
          {data.map((step, i) => (
            <div
              key={`num-${i}`}
              className="relative overflow-hidden inline-block pb-1"
            >
              <span className="opacity-40">{step.id}.</span>
              <span
                className="step-number-fill absolute bottom-0 left-0 w-full overflow-hidden text-[#121212] transition-colors"
                style={{ height: i === 0 ? "100%" : "0%" }}
              >
                <span className="absolute bottom-1 left-0 leading-none">
                  {step.id}.
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Foreground Content ── */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        {data.map((step, i) => {
          const words = step.title.split(" ");
          return (
            <div
              key={`step-${i}`}
              className="step-content-section absolute inset-0 flex flex-col justify-center"
              style={{
                opacity: i === 0 ? 1 : 0,
                visibility: i === 0 ? "visible" : "hidden",
                pointerEvents: i === 0 ? "auto" : "none",
              }}
            >
              {/* Massive Title crossing the split */}
              <h1 className="w-full pl-[10%] text-[13vw] md:text-[11vw] lg:text-[10vw] font-medium font-poppins text-[#121212] leading-[0.85] tracking-tighter text-left uppercase mt-[-5vh]">
                {words.map((word, wIdx) => (
                  <div key={wIdx} className="overflow-hidden block">
                    <span className="word-item inline-block will-change-transform whitespace-nowrap">
                      {word}
                    </span>
                  </div>
                ))}
              </h1>

              {/* Sub-features Grid on the right side */}
              {step.features && step.features.length > 0 && (
                <div className="absolute bottom-[10%] left-[35%] w-[65%] pl-6 md:pl-16 pr-6 pointer-events-auto">
                  <div className="flex flex-row flex-wrap gap-x-8 md:gap-x-16 gap-y-6">
                    {step.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="step-feature-item flex flex-col items-start gap-1 md:gap-2 will-change-transform flex-1 min-w-[120px] max-w-[200px]"
                      >
                        <span className="text-xl md:text-2xl font-bold text-[#121212] leading-none">
                          -
                        </span>
                        <p className="text-xs md:text-sm font-medium text-[#121212] leading-snug tracking-wide">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MultiStepTextScroll;
