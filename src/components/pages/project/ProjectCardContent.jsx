"use client";
import { memo } from "react";
import Pin from "../../../../public/icons/Pin";
import Arrow from "../../../../public/icons/Arrow";
import TiltedArrow from "../../../../public/icons/TiltedArrow";
import Button from "@/components/ui/Button";

const ProjectCardContent = memo(function ProjectCardContent({
  project,
  topHeaderRef,
  subtitleRef,
  titleRef,
  viewDetailsRef,
  normalContentRef,
}) {
  if (!project) return null;

  return (
    <>
      {/* 1. TOP HEADER BAR (Shown on Hover - Desktop) */}
      <div
        ref={topHeaderRef}
        className="w-full opacity-0 z-20 pointer-events-auto flex flex-col h-1/4 justify-between"
      >
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-neutral-300/80">
          {/* Left: ID & Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-serif font-medium text-neutral-900 tracking-tight">
              {project.id}
            </span>

            {/* Status Badge */}
            {project.status && (
              <div className="px-2.5 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-semibold">
                {project.status}
              </div>
            )}

            {/* Location Badge */}
            <div className="flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-300 bg-neutral-100/70 text-neutral-800 text-xs font-medium">
              <Pin className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
              <span>{project.location}</span>
            </div>

            {/* Property Type Badge */}
            {project.type && (
              <div className="px-3 py-1 rounded-full border border-neutral-300 bg-neutral-100/70 text-neutral-800 text-xs font-medium">
                {project.type}
              </div>
            )}
          </div>

          {/* Right: Price / Value */}
          {project.price && (
            <div className="text-sm sm:text-base md:text-lg font-light text-neutral-900 tracking-wide font-sans text-right shrink-0">
              {project.price}
            </div>
          )}
        </div>
      </div>

      {/* 2. MIDDLE BODY SECTION (Shown on Hover - Desktop) */}
      <div className="w-full flex items-end justify-between gap-4 z-20 mb-auto mt-2">
        {/* Left Column: Subtitle & Title */}
        <div className="flex flex-col max-w-[65%]">
          {/* Subtitle comes from right 20% */}
          <div
            ref={subtitleRef}
            className="text-xs sm:text-sm font-medium text-neutral-500 mb-1 opacity-0"
          >
            {project.subtitle || "DGS Signature Series"}
          </div>

          {/* Main Title comes from up (y: -100%) in overflow-hidden wrapper */}
          <div className="overflow-hidden">
            <h3
              ref={titleRef}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-neutral-900 leading-tight block"
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* Right Column: View Details Button Box */}
        <div
          ref={viewDetailsRef}
          className="bg-primary/70 hover:bg-primary text-white rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between w-32 sm:w-36 h-24 sm:h-28 shrink-0 opacity-0 relative group/btn cursor-pointer shadow-md transition-colors border border-primary/70"
        >
          <div className="flex justify-end">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg border border-white/30 bg-white/20 flex items-center justify-center text-white">
              <Arrow className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>

          <span className="text-xs sm:text-sm font-semibold text-white leading-tight max-w-[60px]">
            View Details
          </span>
        </div>
      </div>

      {/* 3. UNHOVERED & MOBILE OVERLAY CONTENT */}
      <div
        ref={normalContentRef}
        className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-6 pointer-events-none"
      >
        {/* Top bar badges & arrow button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Badge */}
            {project.status && (
              <div className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md border border-primary/40 text-white text-xs font-semibold shadow-xs">
                {project.status}
              </div>
            )}

            {/* Location Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-medium tracking-wide shadow-xs">
              <Pin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span>{project.location}</span>
            </div>

            {/* Property Type Tag */}
            {project.type && (
              <div className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white/90 text-xs sm:text-sm font-medium shadow-xs">
                {project.type}
              </div>
            )}
          </div>

          <button
            aria-label="View Project"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white text-neutral-800 flex items-center justify-center shadow-lg pointer-events-auto shrink-0 group/topbtn transition-transform hover:scale-105"
          >
            <TiltedArrow className="w-5 h-5 transition-transform duration-300 group-hover/topbtn:scale-110" />
          </button>
        </div>

        {/* Bottom text & Price */}
        <div>
          <div className="text-xl sm:text-2xl font-light text-white/90 tracking-widest font-mono -mb-1.5">
            {project.id}
          </div>
          <h3 className="text-2xl sm:text-3xl font-normal text-white leading-snug tracking-tight max-w-[90%]">
            {project.title}
          </h3>
          {project.price && (
            <div className="mt-1 text-xs font-light text-white/90 tracking-wide font-sans">
              {project.price}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default ProjectCardContent;
