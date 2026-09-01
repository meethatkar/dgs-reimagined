import React from "react";
import Arrow from "../../../../../public/icons/Arrow";
import Button from "../../../ui/Button";

const HeroTextCard = ({ subtitle, title, description }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-sm shadow-2xl border border-white/40 flex flex-col justify-between h-full">
      <div>
        {/* Subtitle */}
        <p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-4">
          {subtitle}
        </p>

        {/* Title */}
        <h3 className="font-cinzel text-4xl text-neutral-800 leading-[1.1] mb-6">
          {title}
        </h3>

        {/* Separator Line */}
        <div className="w-10 h-[2px] bg-primary/60 mb-8"></div>

        {/* Description */}
        <p className="font-poppins text-neutral-600 text-sm leading-relaxed mb-10">
          {description}
        </p>
      </div>

      {/* Button */}
      <Button variant="ghost">
        EXPLORE PROJECT
        <Arrow className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default HeroTextCard;
