import React from "react";

const Building = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1"
    >
      <rect x="10" y="2" width="4" height="19" />
      <rect x="6" y="7" width="4" height="14" />
      <rect x="14" y="7" width="4" height="14" />
      <path d="M2 21h20" strokeLinecap="round" />
    </svg>
  );
};

export default Building;
