import React from "react";

/**
 * Reusable Connectivity Card Component
 * Renders a category card with an icon, title, and a dynamic list of locations/hubs using .map()
 */
const ConnectivityCard = ({ title, icon, items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-300">
      {/* Category Header */}
      <div className="flex items-center gap-3.5 mb-6">
        {icon && (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F8F5F0] border border-[#EAE3D9] text-primary flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <h3 className="text-base sm:text-lg font-serif font-bold tracking-widest text-neutral-900 uppercase">
          {title}
        </h3>
      </div>

      {/* Dynamic Location Items */}
      <div className="space-y-3.5">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#FAFAFA] border border-neutral-200/80 hover:bg-neutral-100/60 transition-colors gap-3"
          >
            <span className="text-xs sm:text-sm font-semibold text-neutral-800 tracking-tight">
              {item.label}
            </span>
            <span className="text-xs font-semibold text-[#B08658] bg-[#F8F3EC] border border-[#E8DFC0]/70 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectivityCard;
