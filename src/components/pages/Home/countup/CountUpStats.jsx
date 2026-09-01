"use client";
import React, { useRef, useEffect, forwardRef } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap.utils";
import { animateCountUp } from "./animateCountUp";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const StatItem = forwardRef(({ endValue, suffix, label }, ref) => {
  return (
    <div className="relative flex flex-row md:flex-col items-center justify-start md:justify-between w-full md:w-1/4 group z-10 gap-6 md:gap-0 pl-2 sm:pl-4 md:pl-0">
      {/* Pinpoint Dot (Left on Mobile, Bottom on Desktop) */}
      <div className="w-6 h-6 rounded-full bg-white border-[3px] border-primary shadow-md z-20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-125 order-1 md:order-2">
        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
      </div>

      {/* Content Container (Right on Mobile, Top on Desktop) */}
      <div className="flex flex-col items-start md:items-center mb-0 md:mb-10 order-2 md:order-1">
        <div className="flex items-baseline text-neutral-900 font-semibold text-4xl sm:text-5xl md:text-6xl tracking-tighter">
          {/* The ref is attached specifically to the number that will change */}
          <span ref={ref}>0</span>
          <span>{suffix}</span>
        </div>

        <p className="mt-1 md:mt-3 text-xs sm:text-sm font-bold tracking-[0.15em] text-primary uppercase text-left md:text-center">
          {label}
        </p>
      </div>
    </div>
  );
});

StatItem.displayName = "StatItem";

const statsData = [
  { id: 1, endValue: 35, suffix: "+", label: "Years of Trust" },
  { id: 2, endValue: 7, suffix: "K+", label: "Happy Customers" },
  { id: 3, endValue: 75, suffix: "LACS", label: "Sq.Ft. Developed" },
  { id: 4, endValue: 45, suffix: "LACS", label: "Sq.Ft. Evolving" },
];

const CountUpStats = () => {
  const sectionRef = useRef(null);
  const lineFillRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const totalDuration = 1.5; // How long the line takes to draw completely

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 60%" : "top 80%", // Triggers when section is visible
          end: isMobile ? "top 30%" : "top 50%",
          once: true, // Only run once for clean UX
          scrub: true,
        },
      });

      // 1. Draw the connecting line (Vertical for mobile, Horizontal for desktop)
      if (isMobile) {
        tl.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: totalDuration,
            ease: "power1.inOut",
            transformOrigin: "top center",
          },
        );
      } else {
        tl.fromTo(
          lineFillRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: totalDuration,
            ease: "power1.inOut",
            transformOrigin: "left center",
          },
        );
      }

      // 2. Fire the count-up exactly when the line hits each pinpoint
      statsData.forEach((stat, index) => {
        // Calculate exact time in timeline this dot gets hit
        const hitTime = index * (totalDuration / (statsData.length - 1));

        tl.add(() => {
          // Trigger the utility function
          animateCountUp(numberRefs.current[index], stat.endValue, 2);

          // Pop scale effect to the number container as it triggers
          if (numberRefs.current[index]?.parentNode) {
            gsap.fromTo(
              numberRefs.current[index].parentNode,
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" },
            );
          }
        }, hitTime);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative w-full flex flex-col md:flex-row justify-between items-start md:items-stretch gap-12 md:gap-0 pt-4">
          {/* THE BACKGROUND TRACK */}
          {/* 
            Mobile: Left vertical line aligned at left-[20px] (pl-2 [8px] + 12px dot center).
            Desktop: Bottom horizontal line aligned at md:left-[12.5%] md:w-[75%] md:bottom-2.5.
          */}
          <div className="absolute left-[20px] sm:left-[28px] md:left-[12.5%] top-3 bottom-3 md:top-auto md:bottom-2.5 -translate-x-1/2 md:translate-x-0 w-1 md:w-[75%] md:h-1 bg-neutral-100 rounded-full z-0 pointer-events-none">
            {/* THE GLOWING FILL LINE */}
            <div
              ref={lineFillRef}
              className="w-full h-full bg-primary rounded-full shadow-[0_0_10px_rgba(192,123,69,0.5)]"
            ></div>
          </div>

          {/* RENDER THE STAT ITEMS */}
          {statsData.map((stat, index) => (
            <StatItem
              key={stat.id}
              ref={(el) => (numberRefs.current[index] = el)}
              endValue={stat.endValue}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountUpStats;
