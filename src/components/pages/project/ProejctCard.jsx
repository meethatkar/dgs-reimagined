"use client";
import React, { useRef, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCardContent from "./ProjectCardContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProejctCard = memo(function ProejctCard({ project }) {
  const cardRef = useRef(null);
  const timelineRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const normalContentRef = useRef(null);
  const topHeaderRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const viewDetailsRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return;

    // Create a GSAP Context for scoping and automatic cleanup
    const ctx = gsap.context(() => {
      // 1. Initial Scale setup & ScrollTrigger animation applied ONLY to the image
      gsap.set(imageRef.current, { scale: 1.25 });

      gsap.to(imageRef.current, {
        scale: 1,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          end: "top 40%",
          scrub: 1,
          once: true,
        },
      });

      // 2. Hover Animation Timeline (Only constructed for desktop breakpoint)
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "none", duration: 0.4 },
        });

        tl
          // 1. Shrink image container height to 50% & add rounded corners
          .to(
            imageWrapperRef.current,
            {
              height: "50%",
              borderRadius: "24px",
              duration: 0.3,
            },
            0,
          )
          // 2. Fade out normal dark overlay content
          .to(
            normalContentRef.current,
            {
              opacity: 0,
              duration: 0.4,
            },
            0,
          )
          // 3. Fade in top header bar (opacity 0 -> 1)
          .fromTo(
            topHeaderRef.current,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.35 },
            0.15,
          )
          // 4. Subtitle text comes from right 20% with opacity 0 -> 1
          .fromTo(
            subtitleRef.current,
            { x: "20%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 0.4 },
            0.2,
          )
          // 5. Title comes from up (y: "-100%" -> "0%") in overflow-hidden box
          .fromTo(
            titleRef.current,
            { y: "-100%" },
            { y: "0%", display: "block", duration: 0.5, ease: "power3.out" },
            0.25,
          )
          // 6. View Details button box comes from opacity 0 -> 1
          .fromTo(
            viewDetailsRef.current,
            { opacity: 0, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 0.35 },
            0.3,
          );

        timelineRef.current = tl;
      }
    }, cardRef.current);

    return () => ctx.revert(); // Revert all GSAP animations & kill timeline on unmount
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    timelineRef.current?.play();
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    timelineRef.current?.reverse();
  }, []);

  if (!project) return null;

  return (
    <Link href={`/project/${project.slug}`} className="block w-full">
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[4/4.5] sm:aspect-[4/4.2] w-full rounded-[28px] sm:rounded-[32px] overflow-hidden group cursor-pointer shadow-xl shadow-black/20 border border-neutral-300/40 bg-[#F9F8F5] text-black transition-colors duration-300 p-5 sm:p-6 flex flex-col justify-between"
      >
        {/* DELEGATED OVERLAY MARKUP */}
        <ProjectCardContent
          project={project}
          topHeaderRef={topHeaderRef}
          subtitleRef={subtitleRef}
          titleRef={titleRef}
          viewDetailsRef={viewDetailsRef}
          normalContentRef={normalContentRef}
        />

        {/* BACKGROUND IMAGE WRAPPER */}
        <div
          ref={imageWrapperRef}
          className="absolute bottom-0 left-0 right-0 w-full h-full overflow-hidden z-0"
        >
          <Image
            ref={imageRef}
            fill
            src={project.image}
            alt={project.title}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 pointer-events-none" />
        </div>
      </div>
    </Link>
  );
});

export default ProejctCard;
