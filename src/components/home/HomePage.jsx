"use client";

import React, { useEffect } from "react";
import { useLoading } from "@/context/Loading.context";
import DualPortalGateway from "@/components/pages/Home/hero/DualPortalGateway";
import Preloader from "@/components/reuseable-animated-component/Loader";
import { gsap, ScrollTrigger } from "@/utils/gsap.utils";
import MotiveSection from "@/components/pages/Home/MotiveSection";
import CountUpStats from "@/components/pages/Home/countup/CountUpStats";
import Awards from "../pages/Home/Awards";
import Reviews from "../pages/Home/Reviews";
import TextZoom from "../pages/Home/TextZoom";
import AboutUs from "../pages/Home/AboutUs";
import MumbaiPresenceMap from "../pages/Home/MumbaiPresenceMap";
import ContactSection from "../sections/contact/ContactSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    if (!isLoading) {
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
      <Preloader
        words={[
          "30 Years of Trust.",
          "Affordable Luxury.",
          "Redefining Mumbai's Skyline.",
        ]}
        backgroundColor="#1c1c1c"
        circleColor="#F9F8F5"
        onComplete={() => {
          setIsLoading(false);
        }}
      />

      <div
        className={`relative w-full transition-opacity duration-150 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div id="hero" className="w-full">
          <DualPortalGateway />
        </div>
        <div id="motive" className="w-full">
          <MotiveSection />
        </div>
        <div id="legacy" className="w-full">
          <CountUpStats />
        </div>
        <div id="presence" className="w-full">
          <MumbaiPresenceMap />
        </div>
        <div id="awards" className="w-full">
          <Awards />
        </div>
        <div id="about" className="w-full">
          <AboutUs />
        </div>
        <div id="zoom" className="w-full">
          <TextZoom />
        </div>
        <div id="reviews" className="w-full">
          <Reviews />
        </div>
        <div id="contact" className="w-full">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
