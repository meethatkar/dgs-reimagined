"use client";

import React from "react";
import Link from "next/link";

const CtaButtons = ({
  primaryCta,
  secondaryCta,
  primaryHref = "#contact",
  secondaryHref = "/project",
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-auto hero-text-item pt-4">
      {primaryHref.startsWith("#") ? (
        <a
          href={primaryHref}
          className="bg-black text-white px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors flex-1 sm:flex-initial text-center rounded-sm"
        >
          {primaryCta}
        </a>
      ) : (
        <Link
          href={primaryHref}
          className="bg-black text-white px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors flex-1 sm:flex-initial text-center rounded-sm"
        >
          {primaryCta}
        </Link>
      )}

      {secondaryHref.startsWith("#") ? (
        <a
          href={secondaryHref}
          className="bg-white text-black border border-neutral-300 px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:border-black transition-colors flex-1 sm:flex-initial text-center rounded-sm"
        >
          {secondaryCta}
        </a>
      ) : (
        <Link
          href={secondaryHref}
          className="bg-white text-black border border-neutral-300 px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:border-black transition-colors flex-1 sm:flex-initial text-center rounded-sm"
        >
          {secondaryCta}
        </Link>
      )}
    </div>
  );
};

export default CtaButtons;
