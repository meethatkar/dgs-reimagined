"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import CircularScrollCarousel from "@/components/reuseable-animated-component/circular-carousel/CircularCarousel";
import { projects } from "@/data/projects";

export default function ProjectSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] || projects[0];

  const carouselImages = projects.map((proj) => ({
    id: proj.id,
    src: proj.image,
    alt: proj.title,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#FAFAF8] text-[#111111] flex flex-col justify-between py-8 px-4 md:px-8 overflow-hidden border-t border-b border-[#EADFC9]/40"
    >
      {/* Section Header */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center pt-2">
        <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#C5A059] font-semibold">
          Architectural Marvels
        </span>
        <h2 className="text-3xl md:text-5xl font-serif mt-1 tracking-tight text-[#111111]">
          Featured Developments
        </h2>
        <p className="text-neutral-600 text-xs md:text-sm mt-1.5 max-w-xl mx-auto font-sans">
          Explore iconic residential and commercial landmarks crafted with
          precision across Mumbai.
        </p>
      </div>

      {/* 3D Circular Scroll Carousel */}
      <div className="relative w-full flex-1 flex items-center justify-center my-2">
        <CircularScrollCarousel
          triggerRef={sectionRef}
          images={carouselImages}
          perspective="1400px"
          itemWidth="clamp(200px, 20vw, 320px)"
          itemHeight="clamp(270px, 30vh, 420px)"
          rotations={1.5}
          end={"bottom 10%"}
          onActiveChange={(idx) => setActiveIndex(idx)}
          //   className="bg-"
          itemClassName="border border-[#E2E6EA] rounded-2xl shadow-xl transition-all duration-300 hover:border-[#C5A059]/80"
        />
      </div>

      {/* Floating Active Project Metadata Bar */}
      <div className="relative z-20 max-w-xl mx-auto w-full px-4 pb-2">
        <div className="bg-white/95 backdrop-blur-md border border-[#E2E6EA] rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-all duration-300">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#C5A059]/10 px-2.5 py-0.5 rounded-full border border-[#C5A059]/20">
                {activeProject.businessType || "Featured"}
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                {activeProject.location}
              </span>
            </div>
            <h3 className="text-base md:text-lg font-bold font-serif text-[#111111] mt-1">
              {activeProject.title}
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5 font-sans">
              {activeProject.type} •{" "}
              <span className="text-[#C5A059] font-semibold">
                {activeProject.price}
              </span>
            </p>
          </div>

          <Link
            href={`/project/${activeProject.slug}`}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#C5A059] hover:bg-[#b08d48] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-[#C5A059]/30 text-center"
          >
            Explore Project →
          </Link>
        </div>
      </div>
    </section>
  );
}
