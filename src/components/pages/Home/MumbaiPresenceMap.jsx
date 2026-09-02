"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/utils/gsap.utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Stations along the Western Railway Corridor with DGS projects data
const STATIONS_DATA = [
  {
    id: "virar",
    name: "Virar / Vasai",
    code: "VR",
    progress: 0.08,
    x: 90,
    y: 260,
    projectsCount: 4,
    featuredProject: {
      title: "Sheetal Heights",
      location: "Vasai East",
      type: "1 & 2 BHK",
      price: "₹ 38 Lacs Onwards",
      status: "Completed Project",
      image: "/buildings/sheetal-upto.webp",
      slug: "sheetal-uptown",
    },
  },
  {
    id: "dahisar",
    name: "Dahisar",
    code: "DIC",
    progress: 0.23,
    x: 240,
    y: 190,
    projectsCount: 3,
    featuredProject: {
      title: "Sheetal Elegance",
      location: "Dahisar East",
      type: "1 & 2 BHK",
      price: "₹ 55 Lacs Onwards",
      status: "Ongoing Project",
      image: "/buildings/sheetal-sankh.webp",
      slug: "sheetal-shashank",
    },
  },
  {
    id: "borivali",
    name: "Borivali",
    code: "BVI",
    progress: 0.38,
    x: 390,
    y: 280,
    projectsCount: 5,
    featuredProject: {
      title: "SHEETAL SHASHANK",
      location: "Borivali West",
      type: "1 & 2 BHK Premier",
      price: "₹ 1.05 Cr Onwards",
      status: "Ongoing Project",
      image: "/buildings/sheetal-sankh.webp",
      slug: "sheetal-shashank",
    },
  },
  {
    id: "kandivali",
    name: "Kandivali",
    code: "KILE",
    progress: 0.52,
    x: 540,
    y: 180,
    projectsCount: 4,
    featuredProject: {
      title: "SHEETAL UPTOWN",
      location: "Kandivali East",
      type: "1 & 2 BHK Luxury",
      price: "₹ 60 Lacs Onwards",
      status: "Completed Project",
      image: "/buildings/sheetal-upto.webp",
      slug: "sheetal-uptown",
    },
  },
  {
    id: "malad",
    name: "Malad",
    code: "MDD",
    progress: 0.66,
    x: 690,
    y: 290,
    projectsCount: 6,
    featuredProject: {
      title: "SHEETAL SHREE RAM KUNJ",
      location: "Malad East",
      type: "1, 2 & 3 BHK",
      price: "₹ 89 Lacs Onwards",
      status: "Upcoming Project",
      image: "/buildings/sheetal-shreen-ram-kunj.webp",
      slug: "sheetal-shree-ram-kunj",
    },
  },
  {
    id: "goregaon",
    name: "Goregaon",
    code: "GMN",
    progress: 0.79,
    x: 840,
    y: 190,
    projectsCount: 5,
    featuredProject: {
      title: "SHEETAL INFINITY",
      location: "Goregaon East",
      type: "2 & 3 BHK & Industrial",
      price: "₹ 1.5 Cr Onwards",
      status: "Ongoing Project",
      image: "/buildings/sheetail-infinity.jpg",
      slug: "sheetal-infinity",
    },
  },
  {
    id: "andheri",
    name: "Andheri",
    code: "ADH",
    progress: 0.91,
    x: 990,
    y: 270,
    projectsCount: 4,
    featuredProject: {
      title: "DGS RICH LIVING",
      location: "Andheri West",
      type: "2 & 3 BHK Signature",
      price: "₹ 2.89 Cr Onwards",
      status: "Ongoing Project",
      image: "/buildings/rich-living-andheri.avif",
      slug: "dgs-rich-living",
    },
  },
  {
    id: "churchgate",
    name: "Churchgate",
    code: "CCG",
    progress: 1.0,
    x: 1120,
    y: 210,
    projectsCount: 30,
    isTerminus: true,
    featuredProject: {
      title: "DGS Group Corporate HQ",
      location: "South Mumbai",
      type: "Commercial Landmark",
      price: "Head Office Corridor",
      status: "Operational",
      image: "/buildings/rich-living-andheri.avif",
      slug: "dgs-rich-living",
    },
  },
];

// Railway path SVG path string connecting the stations smoothly
const RAILWAY_PATH_D = `M 90,260 
  C 150,210 190,180 240,190 
  C 290,200 340,300 390,280 
  C 440,260 490,160 540,180 
  C 590,200 640,310 690,290 
  C 740,270 790,170 840,190 
  C 890,210 940,290 990,270 
  C 1040,250 1080,200 1120,210`;

export default function MumbaiPresenceMap() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);

  const activeStation = useMemo(
    () => STATIONS_DATA[activeStationIndex],
    [activeStationIndex]
  );

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    // Prepare SVG line strokeDasharray for draw-in animation
    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const prog = self.progress;

            // Determine active station based on scroll progress thresholds
            let currentIdx = 0;
            for (let i = 0; i < STATIONS_DATA.length; i++) {
              if (prog >= STATIONS_DATA[i].progress - 0.05) {
                currentIdx = i;
              }
            }
            setActiveStationIndex(currentIdx);
          },
        },
      });

      // Animate railway path drawing from 0 to 100%
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
      className="relative w-full min-h-[100dvh] bg-[#0b0d12] text-white flex flex-col justify-between p-4 md:p-8 overflow-hidden select-none"
    >
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-neutral-950 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 pt-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">
              Western Corridor Footprint
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-cinzel">
            OUR PRESENCE ACROSS <span className="text-primary">MUMBAI</span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-base max-w-xl mt-1">
            Transforming Mumbai&apos;s Western Line with 30+ Landmark Residential & Commercial Developments from Virar to South Mumbai.
          </p>
        </div>

        {/* Total stats counters badge */}
        <div className="flex items-center gap-6 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-3 px-5 backdrop-blur-md">
          <div>
            <div className="text-2xl md:text-3xl font-black text-primary">30+</div>
            <div className="text-[10px] md:text-xs text-neutral-400 uppercase font-medium">Projects Built</div>
          </div>
          <div className="h-8 w-px bg-neutral-800" />
          <div>
            <div className="text-2xl md:text-3xl font-black text-white">7+</div>
            <div className="text-[10px] md:text-xs text-neutral-400 uppercase font-medium">Key Hubs</div>
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Stage */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto flex flex-col items-center justify-center py-4">
        
        {/* SVG Container */}
        <div className="relative w-full aspect-[12/4.5] max-h-[50vh] flex items-center justify-center">
          <svg
            viewBox="0 0 1200 450"
            className="w-full h-full drop-shadow-[0_0_35px_rgba(197,155,39,0.15)] overflow-visible"
          >
            <defs>
              {/* Gold Railway Line Gradient */}
              <linearGradient id="goldRailwayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C59B27" />
                <stop offset="50%" stopColor="#F5D77F" />
                <stop offset="100%" stopColor="#E5C158" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Route Guidelines */}
            <path
              d={RAILWAY_PATH_D}
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="4"
              strokeDasharray="6 6"
            />

            {/* Animated Glowing Gold Railway Line */}
            <path
              ref={pathRef}
              d={RAILWAY_PATH_D}
              fill="none"
              stroke="url(#goldRailwayGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#goldGlow)"
            />

            {/* Stations & Project Nodes */}
            {STATIONS_DATA.map((st, idx) => {
              const isActive = idx === activeStationIndex;
              const isPassed = idx <= activeStationIndex;

              return (
                <g
                  key={st.id}
                  onClick={() => setActiveStationIndex(idx)}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Aura for active station */}
                  {isActive && (
                    <circle
                      cx={st.x}
                      cy={st.y}
                      r="22"
                      fill="none"
                      stroke="#C59B27"
                      strokeWidth="1.5"
                      opacity="0.6"
                      className="animate-ping"
                    />
                  )}

                  {/* Station Node Ring */}
                  <circle
                    cx={st.x}
                    cy={st.y}
                    r={isActive ? "14" : "9"}
                    fill={isPassed ? "#C59B27" : "#1a1d24"}
                    stroke={isPassed ? "#FFF" : "rgba(255,255,255,0.3)"}
                    strokeWidth="3"
                    className="transition-all duration-300 group-hover:scale-125"
                  />

                  {/* Project Count Badge on Station */}
                  <circle
                    cx={st.x}
                    cy={st.y}
                    r={isActive ? "5" : "3"}
                    fill="#0b0d12"
                  />

                  {/* Station Label */}
                  <text
                    x={st.x}
                    y={st.y + (st.y > 240 ? -28 : 36)}
                    textAnchor="middle"
                    fill={isActive ? "#F5D77F" : isPassed ? "#FFFFFF" : "#888888"}
                    fontSize={isActive ? "14" : "12"}
                    fontWeight={isActive ? "800" : "600"}
                    className="transition-all duration-300 pointer-events-none uppercase tracking-wider font-poppins"
                  >
                    {st.name}
                  </text>

                  {/* DGS Project Indicator Badge */}
                  <g
                    transform={`translate(${st.x - 18}, ${st.y + (st.y > 240 ? -52 : 46)})`}
                    className={`transition-opacity duration-300 ${isPassed ? "opacity-100" : "opacity-40"}`}
                  >
                    <rect
                      width="36"
                      height="16"
                      rx="8"
                      fill={isActive ? "#C59B27" : "rgba(30,32,40,0.9)"}
                      stroke={isActive ? "#FFF" : "rgba(255,255,255,0.2)"}
                      strokeWidth="1"
                    />
                    <text
                      x="18"
                      y="11"
                      textAnchor="middle"
                      fill={isActive ? "#000" : "#FFF"}
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {st.projectsCount} Pj
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Scroll Progress Bar Track */}
        <div className="w-full max-w-xl bg-neutral-900 h-1.5 rounded-full overflow-hidden mt-2 border border-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-primary to-amber-300 transition-all duration-150"
            style={{
              width: `${((activeStationIndex + 1) / STATIONS_DATA.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Active Station Featured Project Spotlight Card */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pb-4">
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 md:p-6 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl transition-all duration-500">
          
          {/* Left Info Column */}
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
            {/* Image Preview Thumbnail */}
            <div className="relative w-20 h-20 md:w-28 md:h-24 rounded-xl overflow-hidden bg-neutral-800 shrink-0 border border-neutral-700">
              <Image
                src={activeStation.featuredProject.image}
                alt={activeStation.featuredProject.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Station details & status */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-primary/20 text-primary text-[10px] md:text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {activeStation.name} Station
                </span>
                <span className="text-neutral-400 text-xs font-semibold">
                  • {activeStation.projectsCount} DGS Developments
                </span>
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-white tracking-wide">
                {activeStation.featuredProject.title}
              </h3>
              <p className="text-neutral-400 text-xs md:text-sm mt-0.5">
                {activeStation.featuredProject.location} | {activeStation.featuredProject.type}
              </p>
            </div>
          </div>

          {/* Right Action Column */}
          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-neutral-800 pt-3 md:pt-0">
            <div>
              <div className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest font-semibold">Starting Price</div>
              <div className="text-base md:text-xl font-extrabold text-primary">
                {activeStation.featuredProject.price}
              </div>
            </div>

            <Link
              href={`/project/${activeStation.featuredProject.slug}`}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-amber-500 text-neutral-950 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 shadow-lg hover:shadow-primary/30"
            >
              Explore Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
