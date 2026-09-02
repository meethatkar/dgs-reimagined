import MainLandingPage from "@/components/sections/landing-hero/MainLandingPage";
import BuyingProcess from "@/components/pages/retailers/BuyingProcess";
import Reviews from "@/components/pages/retailers/Reviews";
import ContactSection from "@/components/sections/contact/ContactSection";
import React from "react";

const retailerData = {
  currentCategory: "Retailers",
  subHeader: "State-of-the-Art Commercial Hubs",
  estYear: "Est. 2024",
  title: "Prime Spots for Growth.",
  description:
    "Strategic retail destinations and commercial arcades designed to maximize footfall, brand prestige, and seamless business expansion across Mumbai.",
  imageSrc: "/buildings/rich-living-andheri.avif",
  primaryCta: "Connect With Us",
  secondaryCta: "View Outlets",
  primaryHref: "#contact",
  secondaryHref: "/project",
};

export default function RetailerPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <MainLandingPage data={retailerData} />
      <BuyingProcess />
      <Reviews />
      <div id="contact" className="w-full">
        <ContactSection />
      </div>
    </main>
  );
}
