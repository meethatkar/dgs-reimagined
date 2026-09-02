"use client";
import React, { useState, useRef, useEffect } from "react";
import Label from "@/components/ui/Label";
import ChevronDown from "../../../public/icons/ChevronDown";

/**
 * Standardized reusable Select component for forms and filter dropdowns
 * Uses a custom UI instead of native <select> for full styling control across browsers
 */
const Select = ({
  label,
  value,
  onChange,
  options = [],
  defaultOptionLabel,
  defaultOptionValue = "all",
  className = "",
  selectClassName = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Normalize options to a unified {label, value} format
  const normalizedOptions = [
    ...(defaultOptionLabel ? [{ label: defaultOptionLabel, value: defaultOptionValue }] : []),
    ...options
      .filter((opt) => {
        const optValue = typeof opt === "object" ? opt.value : opt;
        return optValue !== defaultOptionValue;
      })
      .map((opt) => ({
        label: typeof opt === "object" ? opt.label : opt,
        value: typeof opt === "object" ? opt.value : opt,
      })),
  ];

  const selectedOption =
    normalizedOptions.find((opt) => opt.value === value) || normalizedOptions[0];

  const handleSelect = (val) => {
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={containerRef}>
      {label && <Label>{label}</Label>}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between bg-neutral-50 border ${
            isOpen ? "border-primary shadow-sm shadow-primary/10" : "border-neutral-200"
          } rounded-2xl px-4 py-3 text-sm font-medium text-neutral-800 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${selectClassName}`}
        >
          <span className="truncate">{selectedOption?.label}</span>
          <ChevronDown
            className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-primary" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 top-[calc(100%+8px)] left-0 w-full bg-white border border-[#EADFC9] rounded-2xl shadow-xl shadow-black/5 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <ul className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
              {normalizedOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-neutral-700 hover:bg-[#FAFAF8] hover:text-primary"
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <ChevronDown className="w-4 h-4 text-primary" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
