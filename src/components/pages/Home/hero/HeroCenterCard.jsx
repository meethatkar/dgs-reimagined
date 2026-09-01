import React from "react";
import Arrow from "../../../../../public/icons/Arrow";
import Building from "../../../../../public/icons/Building";
import Diamond from "../../../../../public/icons/Diamond";
import Button from "../../../ui/Button";

const HeroCenterCard = ({ subtitle, title, description, className = "" }) => {
  return (
    <div className={`flex flex-col items-center text-center ${className || "bg-white/50 backdrop-blur-md rounded-2xl p-10 max-w-lg shadow-2xl border border-white/40"}`}>
      {/* Top Building Icon */}
      <Building className="w-12 h-12 text-primary/80 mb-4" />

      {/* Subtitle */}
      <p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-4">
        {subtitle}
      </p>

      {/* Title */}
      <h3 className="font-cinzel text-5xl md:text-6xl text-neutral-800 leading-[1.1] mb-6">
        {title}
      </h3>

      {/* Separator with Diamond */}
      <div className="flex items-center gap-4 w-full justify-center mb-6">
        <div className="w-12 h-[1px] bg-primary/40"></div>
        <Diamond className="w-5 h-5 text-primary" />
        <div className="w-12 h-[1px] bg-primary/40"></div>
      </div>

      {/* Description */}
      <p className="font-poppins text-neutral-600 text-sm md:text-base leading-relaxed mb-10 max-w-[280px] md:max-w-sm">
        {description}
      </p>

      {/* Button */}
      <Button variant="primary" className="rounded-none px-8 py-4">
        EXPLORE OUR PROJECTS
        <Arrow className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default HeroCenterCard;
