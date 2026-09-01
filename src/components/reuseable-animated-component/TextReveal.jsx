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

      // 2. Animate the characters on scroll
      gsap.from(targetElements, {
        y: 40, // Reduced slightly from 100 to keep it elegant and tight
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          each: 0.02,
          from: "random", // Your requested random edge effect
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start, // Triggers based on prop
          end,
          once, // We only want it to reveal once for a clean UX
          scrub,
          markers: true,
        },
      });
    }, containerRef);

    // 3. Crucial for Next.js: Revert the split and animation on unmount
    return () => ctx.revert();
  }, [start, end, scrub, type]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default TextReveal;
