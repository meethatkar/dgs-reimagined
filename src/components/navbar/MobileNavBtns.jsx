"use client";
import React from "react";

const MobileNavBtn = ({ text, onClick, isActive }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-3 text-left w-full py-2.5 transition-all duration-200 cursor-pointer ${
        isActive
          ? "text-primary font-bold translate-x-2"
          : "text-neutral-500 hover:text-neutral-800 font-medium"
      }`}
    >
      {/* Bullet Dot */}
      <span
        className={`w-2 h-2 rounded-full transition-all duration-200 ${
          isActive
            ? "bg-primary scale-125"
            : "bg-neutral-300 group-hover:bg-neutral-400"
        }`}
      />
      {/* Label */}
      <span className="text-xl sm:text-2xl tracking-widest uppercase">
        {text}
      </span>
    </button>
  );
};

export default MobileNavBtn;
