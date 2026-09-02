"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const InfiniteTrack = ({ items = [] }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Moves wrapper by -50% to create a continuous, seamless infinite loop from right to left
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: "none",
        force3D: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to render the string of keywords
  const renderKeywords = () => (
    <div className="flex items-center whitespace-nowrap pr-6 sm:pr-10">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span className="text-[13vw] sm:text-[11vw] md:text-[9.5vw] font-semibold text-neutral-950 tracking-tighter leading-none select-none">
            {item}
          </span>
          {/* Delimiter star/sparkle centered vertically relative to the visible track height */}
          <div className="h-[7.8vw] sm:h-[6.8vw] md:h-[5.6vw] flex items-center justify-center mx-4 sm:mx-8 md:mx-10 select-none">
            <span className="text-[4vw] sm:text-[3.2vw] md:text-[2.6vw] text-neutral-950 leading-none">
              ✦
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    // Height is clamped to cut off bottom portion of text cleanly (increased by ~10% for more visible text height)
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden h-[7.8vw] sm:h-[6.8vw] md:h-[5.6vw] flex items-start border-b border-neutral-300"
    >
      <div className="marquee-inner flex w-max will-change-transform items-start">
        {/* Render two identical blocks for seamless infinite loop */}
        <div className="flex items-start">{renderKeywords()}</div>
        <div className="flex items-start">{renderKeywords()}</div>
      </div>
    </div>
  );
};

export default InfiniteTrack;
