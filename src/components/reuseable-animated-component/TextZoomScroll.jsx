"use client";
import React, { useRef, useEffect, useId } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TextZoomScroll = ({
  batches = [],
  subText,
  mainText,
  bgColor = "#F9F8F5",
  textColor = "#121212",
  subTextColor = "var(--color-primary, #C59B6D)",
  imageSrc,
}) => {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");

  // Normalize batches: handle both array of batches and single item props
  const normalizedBatches =
    batches.length > 0
      ? batches
      : subText || mainText
        ? [{ subText, mainText, imageSrc }]
        : [];

  useEffect(() => {
    if (!sectionRef.current || normalizedBatches.length === 0) return;

    const ctx = gsap.context(() => {
      const validPanels = panelsRef.current.filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          id: `seq-zoom-${uid}`,
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${normalizedBatches.length * 120}%`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      validPanels.forEach((panel, i) => {
        // 1. Bring the panel IN (if not the first item)
        if (i !== 0) {
          tl.fromTo(
            panel,
            { scale: 0.5, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 1, ease: "power2.inOut" },
            "-=0.5",
          );
        }
        // 3. Zoom panel OUT (Capped scale: 15 prevents GPU texture memory limits & reverse scroll lag)
        if (i !== validPanels.length - 1) {
          tl.to(
            panel,
            {
              scale: 15,
              autoAlpha: 0,
              duration: 1.5,
              ease: "sine.inOut",
            },
            "-=0.05",
          );
        } else {
          // 4. Hold the last panel on screen so it can be read before the section unpins
          tl.to({}, { duration: 1 });
        }
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, [normalizedBatches, uid]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {normalizedBatches.map((batch, index) => (
        <div
          key={index}
          ref={(el) => (panelsRef.current[index] = el)}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none z-10"
        >
          {/* Optional Floating Image */}
          {batch.imageSrc && (
            <div className="absolute top-[10%] md:top-[15%] w-32 h-24 md:w-56 md:h-40 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={batch.imageSrc}
                alt={batch.mainText || "Highlight"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 224px"
              />
            </div>
          )}

          {/* Subtext */}
          {batch.subText && (
            <h3
              className="text-sm md:text-xl font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: subTextColor }}
            >
              {batch.subText}
            </h3>
          )}

          {/* Main Massive Text */}
          <h1
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-[1.1] max-w-[90vw]"
            style={{ color: textColor }}
          >
            {batch.mainText}
          </h1>
        </div>
      ))}
    </section>
  );
};

export default TextZoomScroll;
