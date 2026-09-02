import React from "react";

const sizeVariants = {
  sm: "h-6 sm:h-10 w-auto",
  lg: "h-10 md:h-14 lg:h-16 w-auto",
  xl: "h-14 md:h-20 w-auto",
};

const Logo = ({ variant = "lg", className = "", alt = "DGS Groups Logo", onClick }) => {
  const sizeClass = sizeVariants[variant] || sizeVariants.lg;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center shrink-0 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <img
        src="/Logo.svg"
        alt={alt}
        className={`object-contain ${sizeClass}`}
      />
    </div>
  );
};

export default Logo;
