"use client";

import React from "react";
import Image from "next/image";
import Header from "./Header";
import HeroText from "./HeroText";
import CtaButtons from "./CtaButtons";

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

        <div className="flex flex-col flex-grow justify-center py-6">
          <HeroText title={data.title} description={data.description} />
          <CtaButtons
            primaryCta={data.primaryCta}
            secondaryCta={data.secondaryCta}
            primaryHref={data.primaryHref || "#contact"}
            secondaryHref={data.secondaryHref || "/project"}
          />
        </div>
      </div>

      {/* RIGHT SECTION (Image) */}
      <div className="w-full lg:w-[55%] h-[50vh] lg:h-full order-last lg:order-none relative overflow-hidden">
        <Image
          src={data.imageSrc}
          alt={`${data.currentCategory} showcase`}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
          className="object-cover w-full h-full"
        />
      </div>
    </main>
  );
};

export default React.memo(MainLandingPage);
