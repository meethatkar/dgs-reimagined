import React, { forwardRef } from "react";
import Image from "next/image";
import Star from "../../../../public/icons/Star";
import Home from "../../../../public/icons/Home";

const ReviewCard = forwardRef(({ data, style }, ref) => {
  return (
    <div
      ref={ref}
      style={style}
      // Anchored to center; width increased ~10% (from max-w-[360/500] to max-w-[400/550])
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[360px] md:max-w-[550px] bg-white rounded-[2rem] p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-neutral-100 will-change-transform z-10"
    >
      {/* TOP ROW */}
      <div className="flex items-center gap-3 mb-5">
        <Star className="w-6 h-6 text-primary fill-current" />
        <div className="flex flex-col">
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
            The
          </span>
          <span className="text-xs sm:text-sm text-neutral-800 uppercase tracking-widest font-bold leading-none">
            {data.projectName}
          </span>
        </div>
      </div>

      {/* MIDDLE ROW */}
      <div className="flex justify-between items-end mb-2">
        <div className="flex flex-col">
          <span className="text-sm text-neutral-500 mb-1">Home Owner:</span>
          <span className="text-2xl sm:text-3xl font-serif text-neutral-900">
            {data.ownerName}
          </span>
        </div>
        <Home className="w-8 h-8 text-primary" />
      </div>

      {/* Unit Type */}
      <div className="text-right mb-3">
        <span className="text-sm font-medium text-neutral-600">
          {data.unitType}
        </span>
      </div>

      {/* IMAGE — wider aspect ratio (16/13 ≈ 1.23:1) to reduce height */}
      <div className="relative w-full aspect-[16/13] rounded-2xl overflow-hidden mb-5 bg-neutral-100">
        <Image
          src={data.image}
          alt={data.ownerName}
          fill
          sizes="(max-width: 768px) 90vw, 550px"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 text-white/90 text-lg font-serif z-10 drop-shadow-md">
          {data.ownerName}
        </span>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 text-3xl sm:text-5xl font-serif font-bold uppercase tracking-widest z-10 text-center w-full select-none">
          {data.ownerName}
        </span>
      </div>

      {/* QUOTE */}
      <p className="text-center text-neutral-700 text-sm md:text-base font-medium px-2 italic">
        &quot;{data.quote}&quot;
      </p>
    </div>
  );
});

ReviewCard.displayName = "ReviewCard";
export default ReviewCard;
