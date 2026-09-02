import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Pin from "../../../public/icons/Pin";

/**
 * Project Header Info Sidebar Component
 * Displays project summary specs, title, location, type, price, description, and Enquiry CTA
 */
const ProjectHeaderInfo = ({ project }) => {
  if (!project) return null;

  return (
    <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
          {project.subtitle || "DGS Landmark Development"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 leading-tight mb-4">
          {project.title}
        </h1>

        {/* Spec Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-medium">
            <Pin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{project.location}</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-medium">
            {project.type}
          </div>
          {project.businessType && (
            <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
              {project.businessType}
            </div>
          )}
        </div>

        {/* Price Box */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 mb-6">
          <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium block mb-1">
            Starting Price
          </span>
          <span className="text-2xl sm:text-3xl font-serif font-semibold text-neutral-900">
            {project.price}
          </span>
        </div>

        <p className="text-sm text-neutral-600 leading-relaxed">
          Experience world-class architecture and luxury living crafted by DGS
          Group. Located in prime {project.location}, featuring modern{" "}
          {project.type} residences designed for contemporary families.
        </p>
      </div>

      {/* CTAs */}
      <div className="pt-4 border-t border-neutral-200 flex flex-col gap-3">
        <Link href="/#contact" className="w-full">
          <Button
            variant="primary"
            className="w-full justify-center py-3.5"
          >
            Enquire Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectHeaderInfo;
