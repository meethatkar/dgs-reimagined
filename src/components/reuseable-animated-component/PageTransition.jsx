"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
 * ScrollTrigger Integration:
 *   - Kills ALL ScrollTriggers before content swap to prevent stale measurements
 *   - Dispatches `page-transition-complete` after reveal so components can
 *     safely initialize ScrollTrigger with correct DOM measurements
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

  /**
   * After the new page is revealed: wait for images to load, then do a
   * single, authoritative ScrollTrigger.refresh() and notify Lenis.
   */
  const schedulePostTransitionRefresh = useCallback(() => {
    // Use requestAnimationFrame to ensure React has committed the new DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Wait for all images in the new page to finish loading
        const images = document.querySelectorAll("img");
        const imagePromises = Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          });
        });

        // Also add a safety timeout so we don't wait forever for broken images
        const timeout = new Promise((resolve) => setTimeout(resolve, 2000));

        Promise.race([Promise.all(imagePromises), timeout]).then(() => {
          // Force layout recalculation
          window.dispatchEvent(new Event("resize"));
          // Authoritative global refresh
          ScrollTrigger.refresh(true);
          // Notify Lenis and any other listeners
          window.dispatchEvent(new CustomEvent("page-transition-complete"));
        });
      });
    });
  }, []);

  useEffect(() => {
    // Skip on initial mount — no transition needed
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    // Kill any in-flight transition immediately
    if (tlRef.current) {
      tlRef.current.kill();
      if (contentRef.current) {
        gsap.set(contentRef.current, { clearProps: "all" });
      }
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

          // ── POST-TRANSITION: Schedule the authoritative refresh ──
          schedulePostTransitionRefresh();
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
      tl.set(content, { clearProps: "all" });
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
