import React from "react";
import Arrow from "../../../../../public/icons/Arrow";
import Button from "../../../ui/Button";

const HeroTextCard = ({ subtitle, title, description }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 lg:p-6 xl:p-8 max-w-[260px] sm:max-w-sm lg:max-w-[280px] xl:max-w-sm shadow-2xl border border-white/40 flex flex-col justify-between h-full">
      <div>
        {/* Subtitle */}
        <p className="text-primary font-bold text-[10px] sm:text-xs lg:text-[11px] xl:text-xs tracking-[0.2em] uppercase mb-2 sm:mb-4 lg:mb-3 xl:mb-4">
          {subtitle}
        </p>

        {/* Title */}
        <h3 className="font-cinzel text-2xl sm:text-4xl lg:text-3xl xl:text-4xl text-neutral-800 leading-[1.1] mb-3 sm:mb-6 lg:mb-4 xl:mb-6">
          {title}
        </h3>

        {/* Separator Line */}
        <div className="w-8 sm:w-10 h-[2px] bg-primary/60 mb-4 sm:mb-8 lg:mb-6 xl:mb-8"></div>

        {/* Description */}
        <p className="font-poppins text-neutral-600 text-[11px] sm:text-sm lg:text-xs xl:text-sm leading-relaxed mb-6 sm:mb-10 lg:mb-6 xl:mb-10">
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
