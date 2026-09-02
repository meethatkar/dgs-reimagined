import React from "react";
import Image from "next/image";

const MarqueeHeader = ({ headingText, visualElement }) => {
  const formatText = (text) => {
    if (typeof text === "string" && text.includes("\n")) {
      return text.split("\n").map((line, idx) => (
        <React.Fragment key={idx}>
          {line}
          {idx < text.split("\n").length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return text;
  };

  return (
    <div className="flex items-center gap-4 sm:gap-6 px-6 sm:px-12 md:px-16 mb-8 md:mb-14 w-full">
      {/* Icon / Visual Container */}
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 flex-shrink-0 flex items-center justify-center">
        {visualElement || (
          <Image
            src="/GIFs/door-key-unlock.gif"
            alt="Door key unlock animation"
            fill
            unoptimized
            className="object-contain"
            sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 144px"
          />
        )}
      </div>

      {/* Main Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 leading-snug max-w-[280px] sm:max-w-[360px] md:max-w-[420px]">
        {formatText(headingText)}
      </h2>
    </div>
  );
};

export default MarqueeHeader;
