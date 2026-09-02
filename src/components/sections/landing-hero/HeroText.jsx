"use client";

import React from "react";

const HeroText = ({ title, description }) => {
  return (
    <div className="mb-10 hero-text-group">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight text-neutral-900 mb-6 leading-[1.08] hero-text-item">
        {title}
      </h1>

      <p className="text-neutral-600 max-w-lg leading-relaxed text-base sm:text-lg hero-text-item font-sans">
        {description}
      </p>
    </div>
  );
};

export default HeroText;
