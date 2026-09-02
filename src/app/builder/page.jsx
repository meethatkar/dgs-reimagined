import MainLandingPage from "@/components/sections/landing-hero/MainLandingPage";
import FoundersDesk from "@/components/sections/ForundersDesk";
import BuyingProcess from "@/components/pages/builders/BuyingProcess";
import Reviews from "@/components/pages/builders/Reviews";
import ContactSection from "@/components/sections/contact/ContactSection";
import React from "react";
import { builderHeroData, builderFounderData } from "@/data/businessData";

export default function BuilderPage() {
  return (
    <main className="w-full min-h-screen bg-white overflow-x-hidden">
      <MainLandingPage data={builderHeroData} />
      <FoundersDesk data={builderFounderData} />
      <BuyingProcess />
      <Reviews />
      <div id="contact" className="w-full">
        <ContactSection />
      </div>
    </main>
  );
}
