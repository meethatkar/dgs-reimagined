import MainLandingPage from "@/components/sections/landing-hero/MainLandingPage";
import FoundersDesk from "@/components/sections/ForundersDesk";
import BuyingProcess from "@/components/pages/retailers/BuyingProcess";
import Reviews from "@/components/pages/retailers/Reviews";
import ContactSection from "@/components/sections/contact/ContactSection";
import React from "react";
import { retailerHeroData, retailerFounderData } from "@/data/businessData";

export default function RetailerPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <MainLandingPage data={retailerHeroData} />
      <FoundersDesk data={retailerFounderData} />
      <BuyingProcess />
      <Reviews />
      <div id="contact" className="w-full">
        <ContactSection />
      </div>
    </main>
  );
}
