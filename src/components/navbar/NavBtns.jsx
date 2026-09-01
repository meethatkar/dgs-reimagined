"use client";
import React from "react";

const Navbtns = ({ text, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-4 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-base font-medium tracking-wide uppercase transition-all duration-200 cursor-pointer ${
        isActive
          ? "bg-primary/15 text-primary shadow-xs font-semibold"
          : "text-neutral-700 hover:text-black hover:bg-black/5"
      }`}
    >
      {text}
    </button>
  );
};

export default Navbtns;
