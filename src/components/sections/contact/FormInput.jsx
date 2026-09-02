import React from "react";

const FormInput = ({ type = "text", name, placeholder, required = true, className = "" }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary focus:bg-white transition-colors ${className}`}
    />
  );
};

export default FormInput;
