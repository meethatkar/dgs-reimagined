import React from "react";
import ConnectivityCard from "./ConnectivityCard";
import Transit from "../../../public/icons/Transit";
import SocialInfrastructure from "../../../public/icons/SocialInfrastructure";

// Default category icons map using reusable icon components
const defaultCategoryIcons = {
  transit: <Transit className="w-5 h-5" />,
  social: <SocialInfrastructure className="w-5 h-5" />,
};

const categoryTitles = {
  transit: "Transit Hubs & Highways",
  social: "Social Infrastructure",
};

/**
 * Reusable Connectivity / Neighborhood Section Component
 * Dynamically maps over connectivity categories to render reusable ConnectivityCard components
 */
const ConnectivitySection = ({ connectivity, className = "" }) => {
  if (!connectivity) return null;

  // Standardize input object or array into a mapped category list
  const categories = Array.isArray(connectivity)
    ? connectivity
    : Object.entries(connectivity).map(([key, items]) => ({
        id: key,
        title: categoryTitles[key] || key.toUpperCase(),
        icon: defaultCategoryIcons[key],
        items: items || [],
      }));

  if (categories.length === 0) return null;

  return (
    <section className={`mb-20 ${className}`}>
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary block mb-2">
          Prime Location
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900">
          Neighborhood & Connectivity
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <ConnectivityCard
            key={category.id || category.title}
            title={category.title}
            icon={category.icon}
            items={category.items}
          />
        ))}
      </div>
    </section>
  );
};

export default ConnectivitySection;
