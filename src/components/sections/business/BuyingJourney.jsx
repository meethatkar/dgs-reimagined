"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BuyingJourney = ({ data }) => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || !data?.steps?.length) return undefined;

    const ctx = gsap.context(() => {
      // 1. Animate the path line drawing downwards as user scrolls
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: true,
            },
          },
        );
      }

      // 2. Animate each step fading and sliding in
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        const textContent = step.querySelector(".step-text");
        const visualContent = step.querySelector(".step-visual");
        const direction = index % 2 === 0 ? 40 : -40;

        gsap.fromTo(
          [textContent, visualContent].filter(Boolean),
          { y: 40, x: direction, autoAlpha: 0 },
          {
            y: 0,
            x: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (!data) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 mb-12 sm:mb-20">
        <h3 className="text-primary text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-3 sm:mb-4">
          {data.subtitle}
        </h3>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight">
          {data.title}
        </h2>
      </div>

      {/* Journey Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Central Progress Path Line (Visible on both mobile & desktop) */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-neutral-100 -translate-x-1/2 z-0 rounded-full">
          <div
            ref={lineRef}
            className="w-full h-full bg-primary origin-top rounded-full shadow-[0_0_10px_rgba(197,155,109,0.5)]"
          ></div>
        </div>

        {/* The Steps */}
        <div className="flex flex-col gap-12 sm:gap-16 md:gap-32 relative z-10 pl-8 md:pl-0">
          {data.steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.id}
                ref={(el) => (stepsRef.current[index] = el)}
                className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-20 ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Visual / Illustration Side */}
                <div className="step-visual w-full md:w-1/2 relative flex justify-center items-center">
                  {/* Container for Illustration / Responsive GIF */}
                  <div className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] aspect-square bg-white shadow-xl rounded-2xl border border-neutral-100 p-3 sm:p-4">
                    {/* Step Number on Top-Left of Image */}
                    <span
                      className={`absolute -top-6 sm:-top-10 right-0 left-auto ${
                        isEven
                          ? "sm:right-auto sm:left-0 sm:-left-10 md:-left-20"
                          : "sm:right-0 sm:left-auto sm:-right-10 md:-right-20"
                      } text-[5.2rem] sm:text-[7.8rem] md:text-[7.4rem] font-black text-neutral-200/50 leading-none z-20 tracking-tighter select-none pointer-events-none drop-shadow-xs`}
                    >
                      {step.id}
                    </span>

                    <div className="relative w-full h-full overflow-hidden rounded-xl flex items-center justify-center">
                      {step.gif ? (
                        typeof step.gif === "object" ? (
                          <>
                            {/* Mobile GIF */}
                            <div className="block sm:hidden relative w-full h-full">
                              <Image
                                src={step.gif.mobile || step.gif.desktop}
                                alt={step.title}
                                fill
                                className="object-contain rounded-xl"
                                unoptimized
                                priority={index === 0}
                                sizes="(max-width: 640px) 280px, 340px"
                              />
                            </div>
                            {/* Desktop GIF */}
                            <div className="hidden sm:block relative w-full h-full">
                              <Image
                                src={step.gif.desktop || step.gif.mobile}
                                alt={step.title}
                                fill
                                className="object-contain rounded-xl"
                                unoptimized
                                priority={index === 0}
                                sizes="(max-width: 640px) 280px, 340px"
                              />
                            </div>
                          </>
                        ) : (
                          <div className="relative w-full h-full">
                            <Image
                              src={step.gif}
                              alt={step.title}
                              fill
                              className="object-contain rounded-xl"
                              unoptimized
                              priority={index === 0}
                              sizes="(max-width: 640px) 280px, 340px"
                            />
                          </div>
                        )
                      ) : (
                        <div className="text-center text-neutral-400 text-xs sm:text-sm italic">
                          [Insert Lottie: <br /> {step.lottieKeyword}]
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Text Content Side */}
                <div
                  className={`step-text w-full md:w-1/2 flex flex-col ${
                    isEven ? "md:text-left" : "md:text-left"
                  }`}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-3 sm:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-xs sm:text-sm md:text-base max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BuyingJourney;
