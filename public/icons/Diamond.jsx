import React from "react";

const Diamond = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M6 3h12l4 7-10 11L2 10l4-7z" />
      <path d="M2 10h20" />
      <path d="M12 21l-6-11 3-7" />
      <path d="M12 21l6-11-3-7" />
    </svg>
  );
};

export default Diamond;
