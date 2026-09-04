"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const TextReveal = ({
  children,
  className,
  start = "top 85%",
  end = "top 50%",
  scrub = true,
  once = true,
  type = "words, chars",
  animateOnMount = false,
  delay = 0.2,
  duration = 0.8,
  from = "random",
  staggerEach = 0.02,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Split the text into characters and words
      const split = new SplitText(containerRef.current, {
        type,
      });

      const targetElements = split.chars?.length
        ? split.chars
        : split.words?.length
          ? split.words
          : split.lines;

      // 2. Animate immediately on mount OR on scroll
      if (animateOnMount) {
        gsap.from(targetElements, {
          y: 30,
          autoAlpha: 0,
          duration,
          delay,
          ease: "power3.out",
          stagger: {
            each: staggerEach,
            from,
          },
        });
      } else {
        gsap.from(targetElements, {
          y: 40,
          autoAlpha: 0,
          duration,
          ease: "power3.out",
          stagger: {
            each: staggerEach,
            from,
          },
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            once,
            scrub,
          },
        });
      }
    }, containerRef.current);

    // 3. Crucial for Next.js: Revert the split and animation on unmount
    return () => ctx.revert();
  }, [start, end, scrub, type, animateOnMount, delay, duration, from, staggerEach]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default TextReveal;
