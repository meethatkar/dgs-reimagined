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
// Kept conservative so the card + its width never overflows the viewport edges.
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

      // Reduce horizontal scatter on mobile so cards stay within viewport
      const spreadX = isMobile ? 0.35 : 1;
      const spreadY = isMobile ? 0.6 : 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 9%",
          end: `+=${reviews.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          markers: false,
        },
      });

      validCards.forEach((card, index) => {
        const config = CARD_CONFIGS[index % CARD_CONFIGS.length];

        // Convert percentage-based config to actual pixel offsets
        const targetX = (window.innerWidth * config.x * spreadX) / 100;
        const targetY = (window.innerHeight * config.y * spreadY) / 100;

        // Initial State: dead center, tiny, invisible
        gsap.set(card, {
          scale: 0,
          autoAlpha: 0,
          x: 0,
          y: 0,
          force3D: true,
          pointerEvents: "none",
        });

        const cardTl = gsap.timeline();

        cardTl
          // Single fluid motion: pop from center → drift to end position → fade out
          .to(card, {
            scale: 1,
            autoAlpha: 1,
            x: targetX,
            y: targetY,
            pointerEvents: "auto",
            duration: 1,
            ease: "power2.out",
          })
          .to(
            card,
            {
              scale: 1.1,
              autoAlpha: 0,
              x: targetX,
              y: targetY,
              pointerEvents: "none",
              duration: 0.8,
              ease: "power1.in",
            },
            "-=0.1",
          );

        // Tight stagger so cards overlap smoothly — no dead scroll at the end
        tl.add(cardTl, index * 1.0);
      });
    },
    { scope: containerRef, dependencies: [reviews] },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[calc(100dvh-72px)] bg-[#F9F8F5] overflow-hidden flex items-center justify-center"
    >
      {/* Background Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-4xl sm:text-6xl md:text-[6rem] font-black uppercase tracking-tighter text-neutral-900/90 leading-none select-none">
          Stories of <span className="text-primary">Trust</span>
        </h2>
      </div>

      {/* Cards — all anchored to center; GSAP handles X/Y offset */}
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
