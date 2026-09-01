"use client";

import React from "react";
import ScrollAssembleGrid from "@/components/reuseable-animated-component/ScrollAssemblyGrid";
import { awardsData } from "@/data/awardsData";

const Awards = () => {
  return (
    <ScrollAssembleGrid
      heading={"Awards & Milestones"}
      items={awardsData}
      cardType="award"
      end="+=100%"
      overlayColor="#fcfcfc"
      overlayOpacity={0.9}
      columns={4}
      gap="1.02rem"
      pinOnMobile={true}
    />
  );
};

export default Awards;
