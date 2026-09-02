import React from "react";

const ContactInfoItem = ({ title, value, icon }) => {
  return (
    <div className="flex items-start gap-4 p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-serif text-neutral-900 mb-2">{title}</h4>
        <p className="text-neutral-600 font-medium leading-relaxed whitespace-pre-line">
          {value}
        </p>
      </div>
    </div>
  );
};

export default ContactInfoItem;
