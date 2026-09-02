/**
 * Reusable Amenity Card Component
 * Renders an amenity category card with an icon badge, title, and bullet list of items using .map()
 */
const AmenityCard = ({ title, icon, items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Icon Badge */}
        {icon && (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F8F5F0] border border-[#EAE3D9] text-primary flex items-center justify-center mb-6 shrink-0">
            {icon}
          </div>
        )}

        {/* Card Title */}
        <h3 className="text-base sm:text-lg font-serif font-bold tracking-widest text-neutral-900 uppercase mb-5">
          {title}
        </h3>

        {/* Bullet List */}
        <ul className="space-y-3.5">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AmenityCard;
