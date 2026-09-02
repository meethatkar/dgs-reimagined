import React from "react";

export default function MapStationNode({ station, isActive, isPassed }) {
  const hasProject = station.projectsCount > 0;

  return (
    <g className="transition-all duration-500">
      {/* Station Dot */}
      <circle
        cx={station.x}
        cy={station.y}
        r="6"
        fill="#FFFFFF"
        stroke={isPassed ? "#C5A059" : "#D4CEBF"}
        strokeWidth="3"
      />

      {/* Station Name */}
      <text
        x={station.x}
        y={station.y + 24}
        textAnchor="middle"
        fill={isActive ? "#1C1C1C" : "#8A857A"}
        fontSize="12"
        fontWeight={isActive ? "700" : "500"}
        className="uppercase tracking-wider font-sans select-none"
      >
        {station.name}
      </text>

      {/* GPS Pin for Live Projects (Appears only when passed/active) */}
      {hasProject && (
        <g
          transform={`translate(${station.x}, ${station.y - 28})`}
          className={`transition-all duration-500 origin-bottom ${
            isPassed ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          {/* Custom GPS Pin SVG Path */}
          <path
            d="M0,0 C-8,-10 -14,-17 -14,-24 C-14,-32 -8,-38 0,-38 C8,-38 14,-32 14,-24 C14,-17 8,-10 0,0 Z"
            fill="#1C1C1C"
          />
          {/* Inner gold dot of the GPS pin */}
          <circle cx="0" cy="-25" r="4" fill="#C5A059" />
          {/* Floating Info Tag next to GPS Pin */}
          <g transform="translate(18, -34)">
            <rect
              width="65"
              height="20"
              rx="4"
              fill="#FFFFFF"
              stroke="#E8DFCE"
              strokeWidth="1"
            />
            <text
              x="32.5"
              y="14"
              textAnchor="middle"
              fill="#1C1C1C"
              fontSize="9"
              fontWeight="700"
              className="uppercase font-sans"
            >
              {station.projectsCount} Projects
            </text>
          </g>
        </g>
      )}
    </g>
  );
}
