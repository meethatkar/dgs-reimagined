"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

const ReviewsTextContent = () => {
  return (
    <div className="w-full lg:w-5/12 flex flex-col items-start text-left">
      <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-3">
        Customers Speak
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 leading-tight mb-4">
        We value our <br />
        <span className="italic font-light text-neutral-500">
          customer's feedback.
        </span>
      </h2>
      <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-medium mb-8">
        Hear directly from the families who have found their dream homes with
        DGS Group. Our commitment to affordable luxury and timely possession
        has helped thousands of Mumbaikars turn their real estate dreams into
        reality.
      </p>

      {/* Trust Badge */}
      <div className="flex items-center gap-4 border-l-2 border-primary pl-4">
        <div className="flex -space-x-2">
          <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-300" />
          <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-400" />
          <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-500 flex items-center justify-center text-white text-xs font-bold">
            +7K
          </div>
        </div>
        <span className="text-sm font-bold text-neutral-800">
          Happy Families
        </span>
      </div>
    </div>
  );
};

const Reviews = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoContainerRef = useRef(null);

  // YouTube video ID from DGS Group
  const youtubeVideoId = "U90Dj-m2Ah0";

  // 1. Preload YouTube player resources in background after hero section / page is loaded
  useEffect(() => {
    const startPreload = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => setIsPreloaded(true));
      } else {
        setTimeout(() => setIsPreloaded(true), 1000);
      }
    };

    if (document.readyState === "complete") {
      startPreload();
    } else {
      window.addEventListener("load", startPreload, { once: true });
      const timer = setTimeout(startPreload, 2500);
      return () => {
        window.removeEventListener("load", startPreload);
        clearTimeout(timer);
      };
    }
  }, []);

  // 2. IntersectionObserver to switch to active autoplay view when video enters viewport
  useEffect(() => {
    if (!videoContainerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(videoContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="reviews"
      className="w-full py-20 lg:py-32 bg-neutral-50 border-t border-neutral-200/60"
    >
      {/* Head preconnect hints for YouTube domains once preloading starts */}
      {isPreloaded && (
        <React.Fragment>
          <link rel="preconnect" href="https://www.youtube-nocookie.com" />
          <link rel="preconnect" href="https://www.google.com" />
        </React.Fragment>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Side: Text & Context */}
          <ReviewsTextContent />

          {/* Right Side: The Video Player */}
          <div className="w-full lg:w-7/12">
            <div
              ref={videoContainerRef}
              className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 group"
            >
              {/* Thumbnail Image View */}
              <div
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-700 ${
                  isVideoPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <Image
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  src="/youtube_thumbnail.png"
                  alt="Customer Review Thumbnail"
                  className="object-cover"
                />
              </div>

              {/* Background Preloaded / Active iFrame View */}
              {(isPreloaded || isVideoPlaying) && (
                <iframe
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                    isVideoPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?${
                    isVideoPlaying ? "autoplay=1&mute=0" : "autoplay=0&mute=1"
                  }`}
                  title="DGS Group Customer Review"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
