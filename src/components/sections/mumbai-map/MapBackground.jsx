import React from "react";

export default function MapBackground({
  imageSrc = "/mumbai-map.png",
  isVertical = false,
  scale = 1.65,
  translateX = 512,
  translateY = 246,
}) {
  if (isVertical) {
    return (
      <g transform="translate(250, 480) scale(1.48)">
        <image
          href={imageSrc}
          x="-200"
          y="-300"
          width="400"
          height="600"
          opacity="0.55"
        />
      </g>
    );
  }

  return (
    <g transform={`translate(${translateX}, ${translateY}) scale(${scale}) rotate(-90)`}>
      <image
        href={imageSrc}
        x="-200"
        y="-300"
        width="400"
        height="600"
        opacity="0.55"
      />
    </g>
  );
}
