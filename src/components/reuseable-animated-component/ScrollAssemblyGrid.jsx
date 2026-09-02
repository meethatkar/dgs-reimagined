"use client";

import React, { useEffect, useRef, useId } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/reuseable-animated-component/TextReveal";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const ScrollAssembleGrid = ({
  items = [],
  heading = "WHY US",
  backgroundImage,
  backgroundVideo,
  overlayColor = "#121212",
  overlayOpacity = 0.8,
  headingClassName = "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter drop-shadow-sm",
  cardClassName = "",
  className = "",
  start = "top 6%",
  end = "+=100%",
  scrub = 1,
  pin = true,
  pinOnMobile = true,
  mobileBreakpoint = 800,
  scrollerRef,
  onComplete,
  debug = false,
  cardType,
  renderItem,
}) => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const cardRefs = useRef([]);
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");

  // Split items into Top Row (0-3) and Bottom Row (4-7)
  const topRowItems = items.slice(0, 4);
  const bottomRowItems = items.slice(4, 8);

  useEffect(() => {
    if (!sectionRef.current) return undefined;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: `(min-width: ${mobileBreakpoint}px)`,
        isMobile: `(max-width: ${mobileBreakpoint - 1}px)`,
      },
      (context) => {
        const { isDesktop } = context.conditions;
        const usePin = pin && (isDesktop || pinOnMobile);
        const validCards = cardRefs.current.filter(Boolean);

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            id: `scroll-assemble-${uid}`,
            trigger: sectionRef.current,
            start,
            end,
            scrub: scrub === true ? 1 : scrub,
            pin: usePin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scroller: scrollerRef?.current || undefined,
            onLeave: onComplete,
            markers: debug,
          },
        });

        // 1. Initial State: Use window.innerHeight instead of "100vh"
        gsap.set(validCards, {
          y: typeof window !== "undefined" ? window.innerHeight : 1000,
          opacity: 0,
          force3D: true,
        });

        // 2. Overlay fade in
        if (overlayRef.current) {
          gsap.set(overlayRef.current, { opacity: 0 });
          tl.to(
            overlayRef.current,
            { opacity: overlayOpacity, duration: 0.4, ease: "none" },
            0,
          );
        }

        // 3. Staggered card slide-up into place
        tl.to(
          validCards,
          {
            y: 0,
            opacity: 1,
            rotationZ: 0.01, // GPU Anti-aliasing hack for sub-pixel jitter
            stagger: 0.15,
            duration: 1,
            ease: "power2.out",
          },
          0,
        );

        return () => {};
      },
    );

    return () => {
      mm.revert();
    };
  }, [items, start, end, scrub, pin, pinOnMobile, mobileBreakpoint, uid]);

  const renderCard = (item, globalIndex) => {
    if (renderItem) {
      return (
        <div
          key={item.id ?? globalIndex}
          ref={(el) => {
            cardRefs.current[globalIndex] = el;
          }}
          className={`flex flex-col w-[90%] mx-auto group will-change-transform ${cardClassName}`}
        >
          {renderItem(item, globalIndex)}
        </div>
      );
    }

    if (cardType === "award" || item.year) {
      return (
        <div
          key={item.id ?? globalIndex}
          ref={(el) => {
            cardRefs.current[globalIndex] = el;
          }}
          className={`flex flex-col w-[88%] md:w-[80%] mx-auto group will-change-transform ${cardClassName}`}
        >
          <div className="bg-neutral-200/80 rounded-2xl p-2.5 md:p-4 shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-neutral-100/80 flex flex-col items-center text-center w-full h-full transition-all duration-300 hover:shadow-xl">
            {/* Image Container */}
            <div className="w-full aspect-[4/3] bg-[#f4f4f4] rounded-xl overflow-hidden relative flex items-center justify-center p-2">
              <Image
                height={200}
                width={200}
                src={item.image}
                alt={item.title || item.label || ""}
                sizes="(max-width: 768px) 45vw, 20vw"
                quality={70}
                className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content below image */}
            <div className="mt-2 md:mt-3 flex flex-col items-center text-center px-1">
              <span className="text-primary font-bold text-xs md:text-sm tracking-wide">
                {item.year}
              </span>
              <h3 className="text-neutral-800 font-semibold text-xs sm:text-sm md:text-base leading-snug mt-0.5 max-w-[95%]">
                {item.title || item.label}
              </h3>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        key={item.id ?? globalIndex}
        ref={(el) => {
          cardRefs.current[globalIndex] = el;
        }}
        className={`flex flex-col w-[90%] mx-auto group will-change-transform ${cardClassName}`}
      >
        {/* Uniform Aspect-Ratio Image Container */}
        <div className="w-full aspect-[4/3] overflow-hidden rounded-sm bg-neutral-900 relative shadow-lg">
          <Image
            height={200}
            width={200}
            src={item.image}
            alt={item.title || item.label || ""}
            sizes="(max-width: 768px) 45vw, 20vw"
            quality={70}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Numbering & Naming BELOW the image container */}
        <div className="mt-2.5 flex items-center gap-3 text-xs md:text-sm font-bold tracking-wider uppercase">
          <span className="text-neutral-400 font-mono">
            {item.id || item.index || `00${globalIndex + 1}`}
          </span>
          <span className="text-black/90 font-extrabold truncate">
            {item.title || item.label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[100dvh] w-full overflow-hidden p-4 md:px-8 md:py-6 flex flex-col items-center justify-center gap-2 md:gap-3 ${className}`}
    >
      {/* Background Media */}
      {backgroundVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : backgroundImage ? (
        <Image
          height={200}
          width={200}
          className="absolute inset-0 h-full w-full object-cover"
          src={backgroundImage}
          alt=""
          sizes="100vw"
          quality={70}
          aria-hidden="true"
        />
      ) : null}

      {/* Backdrop Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0"
        style={{ backgroundColor: overlayColor }}
        aria-hidden="true"
      />

      {/* Top Row Cards */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-x-[1.05rem] md:gap-x-[1.575rem] gap-y-3 md:gap-y-4 w-full">
        {topRowItems.map((item, i) => renderCard(item, i))}
      </div>

      {/* Heading (Positioned in flex flow between top and bottom card rows) */}
      {heading && (
        <div className="relative z-20 w-full flex items-center justify-center py-1 md:py-1.5 px-4 pointer-events-none">
          {typeof heading === "string" ? (
            <TextReveal
              className={`text-center uppercase font-black text-primary tracking-tight ${headingClassName}`}
              start="top 85%"
              end="top 30%"
              once={false}
            >
              {heading}
            </TextReveal>
          ) : (
            heading
          )}
        </div>
      )}

      {/* Bottom Row Cards */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-x-[1.05rem] md:gap-x-[1.575rem] gap-y-3 md:gap-y-4 w-full">
        {bottomRowItems.map((item, i) => renderCard(item, i + 4))}
      </div>
    </section>
  );
};

export default ScrollAssembleGrid;
