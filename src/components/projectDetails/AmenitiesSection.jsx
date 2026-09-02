import AmenityCard from "./AmenityCard";
import Fitness from "../../../public/icons/Fitness";
import Users from "../../../public/icons/Users";
import ShieldCheck from "../../../public/icons/ShieldCheck";

// Default category icons map
const defaultCategoryIcons = {
  wellness: <Fitness className="w-5 h-5" />,
  leisure: <Users className="w-5 h-5" />,
  convenience: <ShieldCheck className="w-5 h-5" />,
};

// Default category titles map
const categoryTitles = {
  wellness: "Wellness & Fitness",
  leisure: "Leisure & Community",
  convenience: "Security & Convenience",
};

/**
 * Reusable Amenities Section Component
 * Dynamically maps over amenities data to render reusable AmenityCard components
 */
const AmenitiesSection = ({ amenities, className = "" }) => {
  if (!amenities) return null;

  // Standardize input object or array into a mapped category list
  const categories = Array.isArray(amenities)
    ? amenities
    : Object.entries(amenities).map(([key, items]) => ({
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
          Lifestyle & Facilities
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900">
          World-Class Amenities
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <AmenityCard
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

export default AmenitiesSection;
