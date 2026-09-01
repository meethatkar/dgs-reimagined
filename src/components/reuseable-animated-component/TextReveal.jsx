"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const TextReveal = ({ children, className }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Split the text into characters and words
      const split = new SplitText(containerRef.current, {
        type: "words, chars",
      });

      // 2. Animate the characters on scroll
      gsap.from(split.chars, {
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
          start: "top 85%", // Triggers when the top of the text hits 85% down the screen
          end: "top 50%",
          once: true, // We only want it to reveal once for a clean UX
          scrub: true,
        },
      });
    }, containerRef);

    // 3. Crucial for Next.js: Revert the split and animation on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default TextReveal;
