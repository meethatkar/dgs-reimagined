import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

/**
 * Project CTA Banner Component
 * Displays a bottom call-to-action banner for scheduling site visits or requesting brochures
 */
const ProjectCtaBanner = ({ projectTitle }) => {
  return (
    <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
      <div>
        <span className="text-xs uppercase font-semibold tracking-widest text-primary block mb-2">
          Interested in {projectTitle}?
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif font-medium">
          Schedule a Site Visit or Request Brochure
        </h3>
      </div>
      <Link href="/#contact" className="shrink-0">
        <Button variant="primary" className="px-8 py-3.5">
          Contact Sales Team
        </Button>
      </Link>
    </div>
  );
};

export default ProjectCtaBanner;
