import BuyingProcess from "@/components/pages/builders/BuyingProcess";
import Reviews from "@/components/pages/builders/Reviews";
import ContactSection from "@/components/sections/contact/ContactSection";
import React from "react";

export default function BuilderPage() {
  return (
    <main className="w-full min-h-screen bg-[#121212] text-white">
      <div className="py-20 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-primary">
          DGS Builders
        </h1>
        <p className="text-neutral-400 mt-4 max-w-xl">
          Redefining affordable luxury across premium residential habitats.
        </p>
      </div>
      <BuyingProcess />
      <Reviews />
      <ContactSection />
    </main>
  );
}
