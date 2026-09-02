"use client";

import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * CircularScrollCarousel
 * ───────────────────────────────────────────────────────────────────────────
 * A scroll-driven 3D carousel component using GSAP ScrollTrigger.
 */

const CircularScrollCarousel = ({
  images,
  perspective = "1300px",
  itemWidth = "clamp(140px, 16vw, 300px)",
  itemHeight = "clamp(190px, 25vh, 420px)",
  radius,
  rotations = 1,
  direction = 1,
  end = "+=220%",
  pin = true,
  dimEdges = true,
  minOpacity = 0.35,
  className = "",
  itemClassName = "",
  triggerRef,
  onActiveChange,
  debug = false,
}) => {
  const sceneRef = useRef(null);
  const carouselRef = useRef(null);
  const itemRefs = useRef([]);
  const lastActiveRef = useRef(-1);

  const angleStep = 360 / images.length;

  const autoRadius = useMemo(() => {
    if (radius) return radius;
    const match = /([\d.]+)vw/.exec(itemWidth);
    const widthVw = match ? parseFloat(match[1]) : 16;
    const r = widthVw / 2 / Math.tan(Math.PI / images.length);
    return `${r.toFixed(2)}vw`;
  }, [radius, itemWidth, images.length]);

  useEffect(() => {
    const targetTrigger = triggerRef?.current || sceneRef.current;
    if (!targetTrigger || !carouselRef.current || images.length === 0)
      return undefined;

    const ctx = gsap.context(() => {
      const totalRotation = 360 * rotations * direction;

      gsap.set(carouselRef.current, { rotateY: 0, force3D: true });

      function applyDim(progress) {
        const current = totalRotation * progress;
        let bestIndex = 0;
        let bestFacing = -Infinity;

        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const itemAngle = (((i * angleStep + current) % 360) + 360) % 360;
          const rad = (itemAngle * Math.PI) / 180;
          const facing = Math.cos(rad);
          if (dimEdges) {
            const clamped = Math.max(facing, 0);
            gsap.set(el, {
              opacity: minOpacity + clamped * (1 - minOpacity),
            });
          }
          if (facing > bestFacing) {
            bestFacing = facing;
            bestIndex = i;
          }
        });

        if (onActiveChange && bestIndex !== lastActiveRef.current) {
          lastActiveRef.current = bestIndex;
          onActiveChange(bestIndex);
        }
      }

      gsap.to(carouselRef.current, {
        rotateY: totalRotation,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: targetTrigger,
          start: "top 5%",
          end,
          scrub: 1,
          pin,
          pinSpacing: true,
          anticipatePin: 1,
          markers: debug,
          refreshPriority: 3, // Force early calculation to push subsequent sections down correctly
          onUpdate: (self) => applyDim(self.progress),
        },
      });

      applyDim(0);

      // Force layout recalculation to sync with preceding page elements
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => clearTimeout(timer);
    }, sceneRef);

    return () => ctx.revert();
  }, [
    triggerRef,
    images.length,
    end,
    pin,
    rotations,
    direction,
    dimEdges,
    minOpacity,
    debug,
    onActiveChange,
    angleStep,
  ]);

  return (
    <div
      ref={sceneRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ perspective }}
    >
      <div
        ref={carouselRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {images.map((img, i) => (
          <div
            key={img.id ?? i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={`absolute overflow-hidden rounded-md shadow-2xl ${itemClassName}`}
            style={{
              width: itemWidth,
              height: itemHeight,
              transform: `rotateY(${i * angleStep}deg) translateZ(${autoRadius})`,
              backfaceVisibility: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt || ""}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularScrollCarousel;
