"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ReviewCard from "./ReviewCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Viewport-safe drift targets (% of vw/vh).
const CARD_CONFIGS = [
  { x: -30, y: -10 }, // 1. Top-Left
  { x: 30, y: -10 }, // 2. Top-Right
  { x: -30, y: 5 }, // 3. Mid-Left
  { x: 30, y: 5 }, // 4. Mid-Right
  { x: -25, y: 8 }, // 5. Bottom-Left
  { x: 25, y: 8 }, // 6. Bottom-Right
];

const ReviewScrollEffect = ({ reviews = [] }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      if (!containerRef.current || reviews.length === 0) return;

      const validCards = cardsRef.current.filter(Boolean);
      const isMobile = window.innerWidth < 768;

      // Adjust spread factors for mobile so drift stays balanced and well within screen bounds
      const spreadX = isMobile ? 0.22 : 1;
      const spreadY = 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? "top top" : "top 9%",
          end: `+=${reviews.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          refreshPriority: 1, // Calculate after ProjectSection and BuyingJourney
          markers: false, // Turn off debugging markers
        },
      });

      validCards.forEach((card, index) => {
        const config = CARD_CONFIGS[index % CARD_CONFIGS.length];

        // Convert percentage-based config to actual pixel offsets
        const targetX = (window.innerWidth * config.x * spreadX) / 100;
        const targetY = (window.innerHeight * config.y * spreadY) / 100;

        // Initial State: Explicitly set xPercent & yPercent to -50% in GSAP so centering is 100% accurate
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          scale: 0,
          autoAlpha: 0,
          x: 0,
          y: 0,
          transformOrigin: "center center",
          force3D: true,
          pointerEvents: "none",
        });

        const cardTl = gsap.timeline();

        cardTl
          // Combined motion: simultaneously scale out from 0 to 1 AND drift from center (0,0) to (targetX, targetY)
          .to(card, {
            scale: 1,
            autoAlpha: 1,
            x: targetX,
            y: targetY,
            pointerEvents: "auto",
            duration: 1.2,
            ease: "power2.out",
          })
          // Continue slight drift & scale while fading out
          .to(
            card,
            {
              scale: 1.1,
              autoAlpha: 0,
              x: targetX * 1.2,
              y: targetY * 1.2,
              pointerEvents: "none",
              duration: 0.8,
              ease: "power1.in",
            },
            "-=0.2",
          );

        // Stagger sequence smoothly
        tl.add(cardTl, index * 1.0);
      });
    },
    { scope: containerRef, dependencies: [reviews] },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen md:h-[calc(100dvh-72px)] bg-[#F9F8F5] overflow-hidden flex items-center justify-center"
    >
      {/* Background Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-4xl sm:text-6xl md:text-[6rem] font-black uppercase tracking-tighter text-neutral-900/90 leading-none select-none">
          Stories of <span className="text-primary">Trust</span>
        </h2>
      </div>

      {/* Cards — all anchored to center; GSAP handles X/Y offset & centering */}
      {reviews.map((review, i) => (
        <ReviewCard
          key={review.id || i}
          data={review}
          ref={(el) => (cardsRef.current[i] = el)}
        />
      ))}
    </section>
  );
};

export default ReviewScrollEffect;
