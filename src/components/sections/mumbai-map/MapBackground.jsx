import React from "react";
import Image from "next/image";

export default function MapBackground({
  imageSrc = "/buildings/mumbai-map-placeholder.jpg",
  alt = "Mumbai Map",
}) {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-sm opacity-80 mix-blend-multiply">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover object-center filter grayscale contrast-125 opacity-40"
      />
    </div>
  );
}
