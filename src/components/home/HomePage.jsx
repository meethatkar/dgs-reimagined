"use client";

import React, { useEffect } from "react";
import { useLoading } from "@/context/Loading.context";
import DualPortalGateway from "@/components/pages/Home/hero/DualPortalGateway";
import Preloader from "@/components/reuseable-animated-component/Loader";
import Footer from "@/components/Footer";
import { gsap, ScrollTrigger } from "@/utils/gsap.utils";
import Navbar from "@/components/navbar/Navbar";
import MotiveSection from "@/components/pages/Home/MotiveSection";
import CountUpStats from "@/components/pages/Home/countup/CountUpStats";
import Awards from "../pages/Home/Awards";
import Reviews from "../pages/Home/Reviews";
import TextZoom from "../pages/Home/TextZoom";
import AboutUs from "../pages/Home/AboutUs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    if (!isLoading) {
      // Touch/iOS devices need a bit longer for layout (pin spacers, vh) to
      // settle after the loader exits. [FOR SCROLLTRIGGER]
      const isTouchDevice =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches;
      const delay = isTouchDevice ? 500 : 150;
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
        ScrollTrigger.refresh();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <main
      id="main-wrapper"
      className="relative flex flex-col items-center w-full"
    >
      {/* Preloader is always mounted; it fades itself to opacity:0 and calls
          onComplete once — it never gets reverted/reset. */}
      <Preloader
        words={[
          "30 Years of Trust.",
          "Affordable Luxury.",
          "Redefining Mumbai's Skyline.",
        ]}
        backgroundColor="#1c1c1c"
        circleColor="#F9F8F5"
        onComplete={() => {
          console.log("DONE");
          setIsLoading(false);
        }}
      />

      <div
        className={`relative w-full transition-opacity duration-150 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Navbar />
        <DualPortalGateway />

        <MotiveSection />
        <CountUpStats />
        <Awards />
        <AboutUs />
        <Reviews />
        <TextZoom />
        <Footer />
      </div>
    </main>
  );
}
