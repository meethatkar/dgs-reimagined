import MainLandingPage from "@/components/sections/landing-hero/MainLandingPage";
import FoundersDesk from "@/components/sections/ForundersDesk";
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

const retailerFounderData = {
  imageUrl: "/ishwardev.webp",
  name: "Mr. Brahmdev Shukla",
  designation: "Managing Director",
  eyebrow: "From the Leadership",
  mainQuote:
    "Empowering businesses with commercial infrastructure designed for high footfall and long-term value.",
  supportText:
    "Our retail and commercial spaces are crafted to provide modern enterprises with prime locations, architectural grandeur, and seamless customer experiences across Mumbai.",
};

export default function RetailerPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <MainLandingPage data={retailerData} />
      <FoundersDesk data={retailerFounderData} />
      <BuyingProcess />
      <Reviews />
      <div id="contact" className="w-full">
        <ContactSection />
      </div>
    </main>
  );
}
