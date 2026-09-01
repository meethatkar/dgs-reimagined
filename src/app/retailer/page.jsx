import BuyingProcess from "@/components/pages/retailers/BuyingProcess";
import React from "react";

export default function RetailerPage() {
  return (
    <main className="w-full min-h-screen bg-[#121212] text-white">
      <div className="py-20 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-primary">
          DGS Retailers
        </h1>
        <p className="text-neutral-400 mt-4 max-w-xl">
          State-of-the-art commercial spaces and industrial hubs across Mumbai.
        </p>
      </div>
      <BuyingProcess />
    </main>
  );
}
