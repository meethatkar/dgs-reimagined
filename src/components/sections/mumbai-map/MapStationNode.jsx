"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useProjectsContext } from "@/context/ProjectsFilterContext";

export default function MapStationNode({
  station,
  isActive,
  isPassed,
  isVertical = false,
}) {
  const router = useRouter();
  const { projectsData, setSelectedLocation } = useProjectsContext();
  const hasProject = station.projectsCount > 0;
  const isAndheri = station.id === "andheri";

  const handleProjectClick = () => {
    // Find exact location name from data to match the Select dropdown
    const match = projectsData.find((p) => 
      p.location?.toLowerCase().includes(station.name.toLowerCase())
    );
    
    if (match) {
      setSelectedLocation(match.location);
      router.push(`/projects?location=${encodeURIComponent(match.location)}`);
    } else {
      setSelectedLocation(station.id);
      router.push(`/projects?location=${station.id.toLowerCase()}`);
    }
  };

  return (
    <g className="transition-all duration-500">
      {/* Station Circle Dot */}
      <circle
        cx={station.x}
        cy={station.y}
        r={isAndheri ? (isVertical ? "8" : "6.5") : isVertical ? "7" : "5.5"}
        fill="#FFFFFF"
        stroke={isPassed ? "#C5A059" : "#D2CBBC"}
        strokeWidth={isAndheri ? "3.5" : "3"}
      />

      {/* Station Name Label */}
      <text
        x={isVertical ? station.x + 24 : station.x}
        y={
          isVertical
            ? station.y + (isAndheri ? 6 : 5)
            : station.y + (isAndheri ? 28 : 24)
        }
        textAnchor={isVertical ? "start" : "middle"}
        fill={isAndheri ? "#111111" : isPassed ? "#2C2C2C" : "#7D786D"}
        fontSize={
          isAndheri ? (isVertical ? "18" : "14") : isVertical ? "14" : "11"
        }
        fontWeight={isAndheri ? "800" : isPassed ? "700" : "600"}
        letterSpacing={isAndheri ? "0.08em" : "0.05em"}
        className="uppercase font-sans select-none"
      >
        {station.name}
      </text>

      {/* GPS Pin & Floating Badge for Live Projects */}
      {hasProject && (
        <g
          onClick={handleProjectClick}
          transform={
            isVertical
              ? `translate(${station.x - 20}, ${station.y + 8})`
              : `translate(${station.x}, ${station.y - 16})`
          }
          className={`transition-all duration-500 origin-center cursor-pointer ${
            isPassed
              ? "opacity-100 scale-100"
              : "opacity-0 scale-50 pointer-events-none"
          }`}
        >
          {/* Custom Teardrop GPS Pin */}
          <g transform={isVertical ? "scale(1.25)" : "scale(1)"}>
            <path
              d="M0,0 C-5,-7 -9,-12 -9,-16 C-9,-22 -5,-25 0,-25 C5,-25 9,-22 9,-16 C9,-12 5,-7 0,0 Z"
              fill="#1C1C1C"
            />
            {/* Gold Center Dot inside Pin */}
            <circle cx="0" cy="-16" r="2.5" fill="#C5A059" />
          </g>

          {/* Floating Project Count Badge Tag */}
          <g
            transform={
              isVertical ? "translate(-98, -32)" : "translate(-35, -48)"
            }
          >
            <rect
              width={isVertical ? "92" : "70"}
              height={isVertical ? "25" : "20"}
              rx={isVertical ? "5" : "4"}
              fill="#FFFFFF"
              stroke="#E2DCD0"
              strokeWidth={isVertical ? "1.5" : "1.2"}
              className="drop-shadow-sm"
            />
            <text
              x={isVertical ? "46" : "35"}
              y={isVertical ? "17" : "13.5"}
              textAnchor="middle"
              fill="#111111"
              fontSize={isVertical ? "13.5" : "9"}
              fontWeight="800"
              className="uppercase font-sans tracking-wide"
            >
              {station.projectsCount} Projects
            </text>
          </g>
        </g>
      )}
    </g>
  );
}
