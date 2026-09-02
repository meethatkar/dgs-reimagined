import React from "react";

export default function MapHeader({
  subtitle = "Western Corridor Footprint",
  title = "Connecting Prime Addresses",
}) {
  return (
    <div className="absolute top-10 left-0 w-full text-center z-20 px-6">
      <p className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-2">
        {subtitle}
      </p>
      <h2 className="text-3xl md:text-5xl font-serif text-[#1C1C1C] tracking-wide">
        {title}
      </h2>
    </div>
  );
}
