import React, { forwardRef } from "react";

const StatItem = forwardRef(({ endValue, suffix, label }, ref) => {
  return (
    <div className="relative flex flex-col items-center justify-between w-full md:w-1/4 group z-10">
      {/* The Content Container (TOP) */}
      <div className="flex flex-col items-center mb-6 md:mb-10">
        <div className="flex items-baseline text-neutral-900 font-semibold text-5xl md:text-6xl tracking-tighter">
          {/* The ref is attached specifically to the number that will change */}
          <span ref={ref}>0</span>
          <span>{suffix}</span>
        </div>

        <p className="mt-3 text-xs sm:text-sm font-bold tracking-[0.15em] text-primary uppercase text-center">
          {label}
        </p>
      </div>

      {/* The Pinpoint Dot (BOTTOM) */}
      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border-[3px] border-primary shadow-md z-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
      </div>
    </div>
  );
});

StatItem.displayName = "StatItem";
export default StatItem;
