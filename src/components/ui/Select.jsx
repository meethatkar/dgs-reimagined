import React from "react";
import Label from "@/components/ui/Label";

/**
 * Standardized reusable Select component for forms and filter dropdowns
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
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <Label>{label}</Label>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 text-sm font-medium text-neutral-800 focus:outline-none focus:border-primary transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${selectClassName}`}
          {...props}
        >
          {defaultOptionLabel && (
            <option value={defaultOptionValue}>{defaultOptionLabel}</option>
          )}
          {options
            .filter((opt) => {
              const optValue = typeof opt === "object" ? opt.value : opt;
              return optValue !== defaultOptionValue;
            })
            .map((opt) => {
              const optValue = typeof opt === "object" ? opt.value : opt;
              const optLabel = typeof opt === "object" ? opt.label : opt;
              return (
                <option key={optValue} value={optValue}>
                  {optLabel}
                </option>
              );
            })}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-xs">
          ▼
        </div>
      </div>
    </div>
  );
};

export default Select;
