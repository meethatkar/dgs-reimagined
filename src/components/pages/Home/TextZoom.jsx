"use client";
import React from "react";
import TextZoomScroll from "@/components/reuseable-animated-component/TextZoomScroll";

const TextZoom = () => {
  const dgsBatches = [
    {
      subText: "Our Core Philosophy",
      mainText: "WE CRAFT LEGACIES.",
    },
    {
      subText: "The DGS Standard",
      mainText: "AFFORDABLE LUXURY.",
    },
    {
      subText: "30 Years of Excellence",
      mainText: "SHAPING MUMBAI.",
    },
    {
      subText: "Building Trust, Delivering Dreams",
      mainText: "WE ARE DGS.",
    },
  ];

  return (
    <TextZoomScroll
      batches={dgsBatches}
      bgColor="#F9F8F5"
      textColor="#121212"
      subTextColor="var(--color-primary, #C59B6D)"
    />
  );
};

export default TextZoom;
