import React from "react";

/**
 * Standardized reusable Label component for forms and filter headings
 */
const Label = ({ children, className = "", htmlFor, ...props }) => {
  if (!children) return null;

  return (
    <label
      htmlFor={htmlFor}
      className={`text-xs font-bold uppercase tracking-wider text-neutral-500 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
