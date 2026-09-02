import React from "react";

const FormTextArea = ({ name, placeholder, rows = 4, required = true, className = "" }) => {
  return (
    <textarea
      name={name}
      rows={rows}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary focus:bg-white transition-colors resize-none ${className}`}
    />
  );
};

export default FormTextArea;
