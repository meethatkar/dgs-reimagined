import React from "react";
import BuyingJourney from "@/components/sections/business/BuyingJourney";
import { buyingJourneyData } from "@/data/businessData";

const BuyingProcess = () => {
  return <BuyingJourney data={buyingJourneyData.retailers} />;
};

export default BuyingProcess;
