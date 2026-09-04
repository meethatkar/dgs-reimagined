"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap.utils";

export function useDataParallax(containerRef) {
  useEffect(() => {
    if (!containerRef?.current) return;

    const ctx = gsap.context(() => {
      const parallaxElements = containerRef.current.querySelectorAll(
        "[data-scroll-speed]",
      );

      parallaxElements.forEach((el) => {
        const rawSpeed = el.getAttribute("data-scroll-speed");
        const speed = parseFloat(rawSpeed) || 0.2;
        const scaleAttr = el.getAttribute("data-scroll-scale");
        const scaleAmount = scaleAttr ? parseFloat(scaleAttr) : 1;

        if (scaleAmount > 1) {
          gsap.fromTo(
            el,
            {
              scale: scaleAmount,
              yPercent: speed * -40,
            },
            {
              scale: 1,
              yPercent: speed * 40,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement || el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            },
          );
        } else {
          gsap.to(el, {
            yPercent: speed * -60,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        }
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, [containerRef]);
}

/**
 * ParallaxScrollEffect Component
 *
 * Reusable wrapper component for Lenis + GSAP ScrollTrigger parallax effects.
 * Accepts any image, div, or component children and applies a smooth parallax scroll effect.
 *
 * @param {React.ReactNode} children - Content or Image to animate
 * @param {number} speed - Parallax speed multiplier (e.g. 0.1 to 0.5, default: 0.25)
 * @param {boolean|number} scale - Enables parallax image zoom (true or scale amount e.g. 1.15)
 * @param {string} start - ScrollTrigger start position (default: "top bottom")
 * @param {string} end - ScrollTrigger end position (default: "bottom top")
 * @param {number|boolean} scrub - Scrub smoothness (default: 0.5)
 * @param {boolean} overflowHidden - Clips overflowing parallax movement (default: true)
 * @param {string} className - Additional CSS classes for container wrapper
 * @param {string} innerClassName - Additional CSS classes for inner target div
 */
export default function ParallaxScrollEffect({
  children,
  speed = 0.25,
  scale = false,
  scaleAmount = 1.15,
  start = "top bottom",
  end = "bottom top",
  scrub = 0.5,
  overflowHidden = true,
  className = "",
  innerClassName = "",
  as: Component = "div",
  ...props
}) {
  const containerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !targetRef.current) return;

    const ctx = gsap.context(() => {
      const target = targetRef.current;
      const effectiveScale =
        typeof scale === "number" ? scale : scale === true ? scaleAmount : 1;

      if (effectiveScale > 1) {
        gsap.fromTo(
          target,
          {
            scale: effectiveScale,
            yPercent: speed * -40,
          },
          {
            scale: 1.02,
            yPercent: speed * 40,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: start,
              end: end,
              scrub: scrub,
              invalidateOnRefresh: true,
            },
          },
        );
      } else {
        gsap.to(target, {
          yPercent: speed * -60,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: start,
            end: end,
            scrub: scrub,
            invalidateOnRefresh: true,
          },
        });
      }
    }, containerRef.current);

    return () => ctx.revert();
  }, [speed, scale, scaleAmount, start, end, scrub]);

  return (
    <Component
      ref={containerRef}
      data-scroll
      data-scroll-speed={speed}
      style={{ position: "relative" }}
      className={`${overflowHidden ? "overflow-hidden" : ""} ${className}`}
      {...props}
    >
      <div
        ref={targetRef}
        style={{ position: "relative" }}
        className={`w-full h-full will-change-transform ${innerClassName}`}
      >
        {children}
      </div>
    </Component>
  );
}
