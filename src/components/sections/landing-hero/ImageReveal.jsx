"use client";

import React from "react";
import Image from "next/image";

const ImageReveal = ({ src, alt }) => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Image
        src={src}
        alt={alt || "Showcase Image"}
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        priority
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default React.memo(ImageReveal);
