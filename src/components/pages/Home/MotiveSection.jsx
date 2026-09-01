import TextReveal from "@/components/reuseable-animated-component/TextReveal";
import React from "react";

const MotiveSection = () => {
  return (
    <section className="w-full py-24 md:py-32 bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Title */}
        <div className="flex flex-col items-center mb-10">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-primary uppercase">
            Our Motive
          </span>
          <div className="w-12 h-[1px] bg-primary mt-3"></div>
        </div>

        {/* Reusable GSAP Text Reveal */}
        <TextReveal className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.2] tracking-tight text-neutral-900">
          Experience{" "}
          <span className="italic text-primary">affordable luxury</span>{" "}
          <br className="hidden md:block" />
          backed by three decades of trust.
        </TextReveal>
      </div>
    </section>
  );
};

export default MotiveSection;
