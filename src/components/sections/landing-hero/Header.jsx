"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbtns from "@/components/navbar/NavBtns";

const Header = ({
  subHeader,
  estYear,
  categories,
  currentCategory,
  onCategoryChange,
}) => {
  const router = useRouter();

  const handleCategoryClick = (cat) => {
    if (onCategoryChange) {
      onCategoryChange(cat);
    }
    if (cat.toLowerCase() === "builders") {
      router.push("/builder");
    } else if (cat.toLowerCase() === "retailers") {
      router.push("/retailer");
    }
  };

  return (
    <div className="relative flex justify-between items-start mb-6 md:mb-10">
      <div className="flex-1">
        {/* Subheader */}
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-6 hero-text-item font-semibold">
          {subHeader}
        </p>

        {/* Categories Selector */}
        <div className="flex gap-2 sm:gap-3 mt-6 md:mt-10 border-b border-neutral-200 pb-3 hero-text-item">
          {categories.map((category) => {
            const isActive =
              currentCategory?.toLowerCase() === category.toLowerCase();
            return (
              <Navbtns
                key={category}
                text={category}
                isActive={isActive}
                onClick={() => handleCategoryClick(category)}
              />
            );
          })}
        </div>
      </div>

      {/* Vertical EST Text - Shifted down and aligned directly flush against the image border */}
      <span className="hidden lg:block absolute top-5 -right-12 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-400 rotate-90 origin-right select-none font-medium z-20 pointer-events-none">
        {estYear}
      </span>
    </div>
  );
};

export default Header;
