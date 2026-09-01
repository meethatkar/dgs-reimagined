"use client";

import React, { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * PageTransition — reusable "stairs" overlay transition (Next.js App Router)
 * ───────────────────────────────────────────────────────────────────────────
 * Sequence:
 *   1. Old page is visible
 *   2. Bars stagger in from center  → screen fully covered
 *   3. Children swap to new page    (hidden behind bars)
 *   4. Bars stagger out from edges  → new page revealed
 *
 * Performance:
 *   - GPU-composited via will-change + force3D
 *   - gsap.context() for scoped, leak-free cleanup
 *   - Bars animate only `transform` + `height` (compositor-friendly)
 *
 * Reusability:
 *   Every visual/timing knob is a prop with a sensible default, so this
 *   drops into any Next.js App Router project as-is. Swap colors via
 *   `barClassName`/`barColor`, change bar count, timings, easing, stagger
 *   direction, or hook into the transition lifecycle via
 *   `onTransitionStart` / `onTransitionEnd` — no need to edit this file.
 */
const PageTransition = ({
  children,
  barCount = 8,
  barColor,
  barClassName = "bg-primary",
  coverDuration = 0.5,
  revealDuration = 0.5,
  coverEase = "power2.inOut",
  revealEase = "power2.inOut",
  coverStaggerFrom = "center",
  revealStaggerFrom = "edges",
  staggerAmount = 0.3,
  midpointHold = 0.05,
  contentFadeDuration = 0.55,
  contentFadeEase = "power2.out",
  contentInitialScale = 1.03,
  lockScroll = true,
  scrollToTopOnSwap = true,
  zIndex = 9999,
  className = "",
  onTransitionStart,
  onTransitionEnd,
}) => {
  const pathname = usePathname();
  const loaderRef = useRef(null);
  const barsRef = useRef([]);
  const contentRef = useRef(null);

  // displayedChildren holds what is *actually rendered* at any point
  const [displayedChildren, setDisplayedChildren] = useState(children);

  const prevPathname = useRef(pathname);
  const tlRef = useRef(null);

  useEffect(() => {
    // Skip on initial mount — no transition needed
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    // Kill any in-flight transition immediately
    if (tlRef.current) {
      tlRef.current.kill();
    }

    const loader = loaderRef.current;
    const bars = barsRef.current;
    const content = contentRef.current;

    if (!loader || !bars.length || !content) return;

    const ctx = gsap.context(() => {
      // ── Reset ──────────────────────────────────────────────────────────
      gsap.set(loader, { display: "flex", pointerEvents: "auto" });
      gsap.set(bars, { height: "0%", y: "0%", force3D: true });

      const tl = gsap.timeline({
        onStart() {
          if (lockScroll) document.body.style.overflow = "hidden";
          onTransitionStart?.();
        },
        onComplete() {
          if (lockScroll) document.body.style.overflow = "";
          onTransitionEnd?.();
        },
      });
      tlRef.current = tl;

      // ── Phase 1: Bars slide IN (cover current page) ───────────────────────
      tl.to(bars, {
        height: "100vh",
        ease: coverEase,
        stagger: { from: coverStaggerFrom, amount: staggerAmount },
        duration: coverDuration,
      });

      // ── Midpoint: swap page content while screen is fully covered ─────────
      tl.call(() => {
        // `children` here is already the new page — useEffect closes over
        // the value from the render that triggered this effect.
        setDisplayedChildren(children);
        if (scrollToTopOnSwap) window.scrollTo(0, 0);
      });

      // Brief hold so the swap actually renders before revealing
      if (midpointHold > 0) tl.to({}, { duration: midpointHold });

      // ── Phase 2: Bars slide OUT (reveal new page) ──────────────────────────
      tl.to(bars, {
        y: "100%",
        ease: revealEase,
        stagger: { from: revealStaggerFrom, amount: staggerAmount },
        duration: revealDuration,
      });

      // Fade + subtle scale-up for the incoming page
      tl.fromTo(
        content,
        { opacity: 0, scale: contentInitialScale },
        {
          opacity: 1,
          scale: 1,
          duration: contentFadeDuration,
          ease: contentFadeEase,
        },
        "<+0.1",
      );

      // ── Cleanup ─────────────────────────────────────────────────────────
      tl.set(loader, { display: "none", pointerEvents: "none" });
      tl.set(bars, { y: "0%", height: "0%" });
    });

    return () => {
      ctx.revert();
      if (lockScroll) document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* ── Stairs Overlay ─────────────────────────────────────────────────── */}
      <div
        ref={loaderRef}
        id="stairs-loader"
        style={{ display: "none", zIndex }}
        className="fixed inset-0 h-screen w-full flex overflow-hidden pointer-events-none"
      >
        {[...Array(barCount)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (barsRef.current[i] = el)}
            className={`flex-1 ${barClassName}`}
            style={{
              willChange: "transform, height",
              height: 0,
              ...(barColor ? { backgroundColor: barColor } : {}),
            }}
          />
        ))}
      </div>

      {/* ── Page Content ─────────────────────────────────────────────────── */}
      <div ref={contentRef} className="w-full">
        {displayedChildren}
      </div>
    </div>
  );
};

export default PageTransition;
