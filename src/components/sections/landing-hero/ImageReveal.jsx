"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "@/utils/gsap.utils";
import Image from "next/image";

const ImageReveal = ({ src, alt }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    // Define context for clean animation cleanup and avoiding double-renders
    const ctx = gsap.context(() => {
      // Initial state: clipPath hidden top-to-bottom, image scaled and hidden
      gsap.set(containerRef.current, { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(imageRef.current, { scale: 1.1, opacity: 0 });

      // Timeline for smooth top-to-bottom reveal
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
      });

      tl.to(containerRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        delay: 0.2,
      }).to(
        imageRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
        },
        "-=1.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [src]);

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ position: "relative" }}
    >
      <div
        ref={containerRef}
        className="w-full h-full relative overflow-hidden"
        style={{ position: "relative", transformOrigin: "top center" }}
      >
        <Image
          ref={imageRef}
          src={src}
          alt={alt || "Showcase Image"}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default React.memo(ImageReveal);
