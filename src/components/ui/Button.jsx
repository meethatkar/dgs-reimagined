import React from "react";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover px-6 py-3 rounded-md", // Default solid variant
  ghost: "bg-transparent text-primary hover:text-primary-hover", // Ghost variant (no background)
};

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles = "group flex items-center gap-3 font-bold text-xs tracking-widest uppercase transition-colors w-fit";
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
