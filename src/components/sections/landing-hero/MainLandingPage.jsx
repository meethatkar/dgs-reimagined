"use client";

import React from "react";
import Header from "./Header";
import HeroText from "./HeroText";
import CtaButtons from "./CtaButtons";
import ImageReveal from "./ImageReveal";
import TextReveal from "@/components/reuseable-animated-component/TextReveal";

const MainLandingPage = ({ data }) => {
  if (!data) return null;

  const categories = ["Builders", "Retailers"];

  return (
    <main className="w-full lg:h-[calc(100vh-95px)] flex flex-col lg:flex-row bg-white overflow-hidden text-neutral-900">
      {/* LEFT SECTION (Content) */}
      <div className="w-full lg:w-[45%] p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between h-auto lg:h-full z-10">
        <Header
          subHeader={data.subHeader}
          estYear={data.estYear}
          categories={categories}
          currentCategory={data.currentCategory}
          onCategoryChange={data.onCategoryChange}
        />

        <TextReveal animateOnMount delay={0.15} type="words" from="start">
          <div className="flex flex-col flex-grow justify-center py-6">
            <HeroText title={data.title} description={data.description} />
            <CtaButtons
              primaryCta={data.primaryCta}
              secondaryCta={data.secondaryCta}
              primaryHref={data.primaryHref || "#contact"}
              secondaryHref={data.secondaryHref || "/project"}
            />
          </div>
        </TextReveal>
      </div>

      {/* RIGHT SECTION (Image) */}
      <div className="w-full lg:w-[55%] h-[50vh] lg:h-full order-last lg:order-none relative">
        <ImageReveal
          src={data.imageSrc}
          alt={`${data.currentCategory} showcase`}
        />
      </div>
    </main>
  );
};

export default React.memo(MainLandingPage);
