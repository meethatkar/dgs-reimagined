import MainLandingPage from "@/components/sections/landing-hero/MainLandingPage";
import FoundersDesk from "@/components/sections/ForundersDesk";
import BuyingProcess from "@/components/pages/builders/BuyingProcess";
import Reviews from "@/components/pages/builders/Reviews";
import ContactSection from "@/components/sections/contact/ContactSection";
import React from "react";

const builderData = {
  currentCategory: "Builders",
  subHeader: "Built for your business",
  estYear: "Est. 2024",
  title: "Spaces Designed for Ambition.",
  description:
    "Architectural precision tailored to elevate luxury residential and bespoke commercial enterprises. We build foundations for legacy.",
  imageSrc: "/buildings/sheetail-infinity.jpg",
  primaryCta: "Explore Experience",
  secondaryCta: "View Our Work",
  primaryHref: "#contact",
  secondaryHref: "/project",
};

const builderFounderData = {
  imageUrl: "/brahmaSir.webp",
  name: "Mr. Brahmdev Shukla",
  designation: "Managing Director",
  eyebrow: "From the Founder's Desk",
  mainQuote:
    "We don't just construct buildings; we engineer lifestyles that stand the test of time.",
  supportText:
    "Our vision for the Western corridor is rooted in an uncompromising commitment to quality. Every brick laid is a promise kept to the families that choose to call our developments home.",
};

export default function BuilderPage() {
  return (
    <main className="w-full min-h-screen bg-white overflow-x-hidden">
      <MainLandingPage data={builderData} />
      <FoundersDesk data={builderFounderData} />
      <BuyingProcess />
      <Reviews />
      <div id="contact" className="w-full">
        <ContactSection />
      </div>
    </main>
  );
}
