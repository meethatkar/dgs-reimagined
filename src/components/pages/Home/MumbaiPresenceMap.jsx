"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATIONS_DATA, RAILWAY_PATH_D } from "@/components/sections/mumbai-map/mapData";
import MapHeader from "@/components/sections/mumbai-map/MapHeader";
import MapBackground from "@/components/sections/mumbai-map/MapBackground";
import MapStationNode from "@/components/sections/mumbai-map/MapStationNode";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InteractiveTransitMap({ title, subtitle }) {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 7%",
          end: "+=2500", // Gives plenty of scroll room to enjoy the animation
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const prog = self.progress;
            // Update active station strictly for UI highlighting
            const currentIdx = STATIONS_DATA.findLastIndex(
              (st) => prog >= st.progress - 0.05,
            );
            setActiveIndex(currentIdx >= 0 ? currentIdx : 0);
          },
        },
      });

      // The core path draw animation
      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#FAFAF8] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Clean Light-Mode Header */}
      <MapHeader title={title} subtitle={subtitle} />

      {/* Map Stage - locked to an aspect ratio so SVG and Image ALWAYS align perfectly */}
      <div className="relative w-full max-w-6xl aspect-[12/4.5] mt-16 px-4">
        {/* 1. Static Map Image Background */}
        <MapBackground />

        {/* 2. SVG Overlay for Path and GPS Pins */}
        <svg
          viewBox="0 0 1200 450"
          className="absolute inset-0 w-full h-full z-10 overflow-visible"
        >
          <defs>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Faint Background Track */}
          <path
            d={RAILWAY_PATH_D}
            fill="none"
            stroke="#E8E4DA"
            strokeWidth="4"
            strokeDasharray="6 6"
          />

          {/* Animated Gold Track */}
          <path
            ref={pathRef}
            d={RAILWAY_PATH_D}
            fill="none"
            stroke="#C5A059"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#goldGlow)"
          />

          {/* Stations & Custom GPS Pins */}
          {STATIONS_DATA.map((st, idx) => (
            <MapStationNode
              key={st.id}
              station={st}
              isActive={idx === activeIndex}
              isPassed={idx <= activeIndex}
            />
          ))}
        </svg>
      </div>
    </section>
  );
}
