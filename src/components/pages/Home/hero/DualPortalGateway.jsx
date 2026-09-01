import React from "react";
import HeroTextCard from "./HeroTextCard";
import HeroCenterCard from "./HeroCenterCard";

const Portal = ({
  image,
  subtitle,
  title,
  description,
  alignment = "left",
}) => {
  const alignClass =
    alignment === "left"
      ? "md:justify-start md:pl-12"
      : "md:justify-end md:pr-12";
  return (
    <div
      className={`relative w-full h-[calc(100vh-80px)] md:h-full md:w-[38%] group cursor-pointer overflow-hidden ${alignment === "left" ? "md:rounded-r-[40px]" : "md:rounded-l-[40px]"}`}
    >
      {/* Background Image with Zoom Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>

      {/* Content Container */}
      <div
        className={`absolute bottom-8 md:bottom-10 z-10 w-full px-6 md:px-0 flex justify-start ${alignClass}`}
      >
        <div className="transform transition-transform duration-700 ease-out group-hover:-translate-y-4">
          <HeroTextCard
            subtitle={subtitle}
            title={title}
            description={description}
          />
        </div>
      </div>
    </div>
  );
};

const DualPortalGateway = () => {
  return (
    <section className="relative w-full flex flex-col md:flex-row justify-between overflow-hidden bg-white md:h-[calc(100vh-104px)]">
      {/* Left Portal */}
      <Portal
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80"
        subtitle="DGS GROUPS"
        title="Mr. Brahamdev Shukla"
        description="Redefining affordable housing through architectural excellence and community-centric living."
        alignment="left"
      />

      {/* Center Flex Column */}
      <div className="hidden md:flex flex-1 items-center justify-center px-4 z-10">
        <HeroCenterCard
          subtitle="CRAFTING LANDMARKS"
          title={
            <>
              Timeless
              <br />
              by Design
            </>
          }
          description="Redefining the skyline of Mumbai with iconic architecture, elevated living and unmatched experiences."
          className="bg-transparent p-0 max-w-sm"
        />
      </div>

      {/* Right Portal */}
      <Portal
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
        subtitle="DGS RETAILS"
        title="Mr. Surajdev Shukla"
        description="Crafting luxurious living spaces with prime locations and world-class amenities."
        alignment="right"
      />
    </section>
  );
};

export default DualPortalGateway;
