import Image from "next/image";
import React from "react";

const sizeVariants = {
  sm: "h-6 sm:h-12 w-auto",
  lg: "h-9 md:h-16 lg:h-18 w-auto",
  xl: "h-14 md:h-24 w-auto",
};

const Logo = ({ variant = "lg", className = "", alt = "Logo", onClick }) => {
  const sizeClass = sizeVariants[variant] || sizeVariants.lg;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center shrink-0 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <Image
        src="/Logo.png"
        height={72}
        width={90}
        alt={alt}
        sizes="(max-width: 768px) 45px, 90px"
        className={`object-contain ${sizeClass}`}
        style={{ width: "auto", height: "auto" }}
        priority
      />
    </div>
  );
};

export default Logo;
