"use client";
import React from "react";
import MultiStepTextScroll from "@/components/reuseable-animated-component/MultiStepTextScroll";
import { aboutUsData } from "@/data/featuresData";

const AboutUs = () => {
  return <MultiStepTextScroll data={aboutUsData} bgColor="#F9F8F5" />;
};

export default AboutUs;
