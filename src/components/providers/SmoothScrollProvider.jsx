"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap.utils";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScrollProvider({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Initialize Lenis Instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    function setData() {
      setLenisInstance(lenis);
    }
    setData();

    // 2. Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Bind Lenis's RAF cycle directly to GSAP Ticker for locked 60/120fps sync
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    // 4. Disable GSAP lag smoothing to eliminate visual frame skips during smooth scroll momentum
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after Lenis initialization
    ScrollTrigger.refresh();

    // 5. Listen for page transitions to re-sync Lenis dimensions with new page content
    const handlePageTransitionComplete = () => {
      // Lenis needs to recalculate the new page's scroll height
      lenis.resize();
      // Ensure ScrollTrigger has the latest measurements after Lenis resize
      ScrollTrigger.refresh(true);
    };

    window.addEventListener(
      "page-transition-complete",
      handlePageTransitionComplete,
    );

    // Cleanup on unmount
    return () => {
      window.removeEventListener(
        "page-transition-complete",
        handlePageTransitionComplete,
      );
      gsap.ticker.remove(updateTicker);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
