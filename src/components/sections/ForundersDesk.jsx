"use client";

import React from "react";
import Image from "next/image";
import ParallaxScrollEffect from "@/components/reuseable-animated-component/ParallaxScrollEffect";

export default function FoundersDesk({ data }) {
  if (!data) return null;

  return (
    <section className="w-full bg-white py-24 px-6 sm:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left: Founder's Portrait with Architectural Frame & Reusable Parallax */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center">
          <div className="relative w-full max-w-[460px]">
            {/* Offset Gold Border Frame */}
            <div className="absolute -inset-4 border-2 border-[#C5A059]/70 z-0 hidden sm:block pointer-events-none rounded-sm"></div>

            {/* Reusable Parallax Wrapper */}
            <ParallaxScrollEffect
              speed={0.25}
              scale={true}
              scaleAmount={1.15}
              className="relative z-10 w-full aspect-[4/5] bg-[#FAFAF8] shadow-2xl rounded-sm border border-neutral-100"
            >
              <Image
                fill
                src={data.imageUrl}
                alt={`${data.name} - ${data.designation}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 460px"
                quality={90}
                priority
                className="object-cover"
              />
            </ParallaxScrollEffect>
          </div>
        </div>

        {/* Right: The Quote & Vision */}
        <div className="w-full lg:w-1/2 relative">
          {/* Giant Background Quote Mark */}
          <span className="absolute -top-16 -left-10 text-[180px] font-serif text-[#F2EFE9] leading-none z-0 select-none pointer-events-none">
            “
          </span>

          <div className="relative z-10">
            {/* Eyebrow Text */}
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-6">
              {data.eyebrow}
            </p>

            {/* Main Quote */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1C1C] leading-snug mb-8">
              {data.mainQuote}
            </h3>

            {/* Supporting Text */}
            <p className="text-[#666666] text-sm sm:text-base leading-relaxed mb-10 max-w-md">
              {data.supportText}
            </p>

            {/* Sign-off */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#C5A059]"></div>
              <div>
                <h4 className="text-lg font-serif text-[#1C1C1C]">
                  {data.name}
                </h4>
                <p className="text-xs uppercase tracking-widest text-[#8A857A] mt-1">
                  {data.designation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
