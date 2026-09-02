import React from "react";
import MarqueeHeader from "./MarqueeHeader";
import InfiniteTrack from "./InfiniteTrack";

const UniqueMarquee = ({
  headingText = "Unlock your dream house\nwith DGS.",
  marqueeItems = ["Innovate", "Customize", "Collaborate", "Build"],
  visualElement,
}) => {
  return (
    <section className="w-full bg-white py-12 md:py-20 flex flex-col overflow-hidden">
      <MarqueeHeader headingText={headingText} visualElement={visualElement} />

      <InfiniteTrack items={marqueeItems} />
    </section>
  );
};

export default UniqueMarquee;
