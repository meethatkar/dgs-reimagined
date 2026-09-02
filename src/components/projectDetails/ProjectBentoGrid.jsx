"use client";

import React from "react";
import Image from "next/image";

export default function ProjectBentoGrid({ title = "Project Gallery" }) {
  // Standard high-quality default images for all properties in the Bento Grid showcase
  const displayImages = [
    "/buildings/sheetail-infinity.jpg",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
  ];

  return (
    <section className="w-full my-8 sm:my-12 lg:my-16">
      {/* Responsive stylesheet for grid areas layout */}
      <style>{`
        .new-bento-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr;
          grid-template-areas:
            "card1"
            "card2"
            "card3"
            "card4"
            "card5";
        }
        @media (min-width: 768px) {
          .new-bento-grid {
            gap: 1.25rem;
            grid-template-columns: 1fr 1.6fr 1.2fr;
            grid-template-rows: 280px 240px;
            grid-template-areas:
              "card1 card2 card3"
              "card4 card4 card5";
          }
        }
      `}</style>

      {/* Section Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Visual Experience
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900 mt-1">
            Architecture & Ambiance
          </h2>
        </div>
      </div>

      {/* Outer Parent Container with bg-neutral-200/60, border, and rounded-lg */}
      <div className="p-3 sm:p-4 rounded-xl bg-primary/30 border border-primary/80">
        {/* Bento Grid Container using grid-template-rows, grid-template-columns, and grid-template-areas */}
        <div className="new-bento-grid w-full">
          {/* Card 1: Top Left Image Card */}
          <div
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-neutral-200/60 border border-neutral-300/80 shadow-sm transition-all duration-300 hover:shadow-md min-h-[220px] md:min-h-0"
            style={{ gridArea: "card1" }}
          >
            <Image
              src={displayImages[0]}
              alt={`${title} Image 1`}
              fill
              sizes="100vw"
              priority
              className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Card 2: Top Middle Image Card */}
          <div
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-neutral-200/60 border border-neutral-300/80 shadow-sm transition-all duration-300 hover:shadow-md min-h-[220px] md:min-h-0"
            style={{ gridArea: "card2" }}
          >
            <Image
              src={displayImages[1]}
              alt={`${title} Image 2`}
              fill
              sizes="100vw"
              className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Card 3: Top Right Vertical Image Card */}
          <div
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-neutral-200/60 border border-neutral-300/80 shadow-sm transition-all duration-300 hover:shadow-md min-h-[260px] md:min-h-0"
            style={{ gridArea: "card3" }}
          >
            <Image
              src={displayImages[2]}
              alt={`${title} Image 3`}
              fill
              sizes="100vw"
              className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Card 4: Bottom Left Wide Image Banner Card */}
          <div
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-neutral-200/60 border border-neutral-300/80 shadow-sm transition-all duration-300 hover:shadow-md min-h-[180px] md:min-h-0"
            style={{ gridArea: "card4" }}
          >
            <Image
              src={displayImages[3]}
              alt={`${title} Image 4`}
              fill
              sizes="100vw"
              className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Card 5: Bottom Right Image Card */}
          <div
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-neutral-200/60 border border-neutral-300/80 shadow-sm transition-all duration-300 hover:shadow-md min-h-[200px] md:min-h-0"
            style={{ gridArea: "card5" }}
          >
            <Image
              src={displayImages[4]}
              alt={`${title} Image 5`}
              fill
              sizes="100vw"
              className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
