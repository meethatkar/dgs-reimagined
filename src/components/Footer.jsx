import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] text-white pt-20 md:pt-28 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* TOP SECTION: Massive Branding & CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-neutral-800 pb-12 mb-12 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">
              DGS <span className="text-[#C59B6D]">Group</span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
              Crafting Mumbai's skyline with three decades of trust. Redefining
              affordable luxury across premium residential habitats and
              state-of-the-art commercial hubs.
            </p>
          </div>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#C59B6D] text-black text-sm font-bold uppercase tracking-widest overflow-hidden rounded-sm transition-all hover:bg-white"
          >
            Start Your Journey
          </Link>
        </div>

        {/* MIDDLE SECTION: Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Corporate */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#C59B6D] text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Corporate
            </h4>
            <Link
              href="/"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              Home Gateway
            </Link>
            <Link
              href="/about"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              30-Year Legacy
            </Link>
            <Link
              href="/leadership"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              Founders' Vision
            </Link>
            <Link
              href="/awards"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              Awards & Media
            </Link>
          </div>

          {/* Column 2: DGS Builders (Residential) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-2">
              DGS Builders
            </h4>
            <Link
              href="/builders"
              className="text-neutral-400 hover:text-[#C59B6D] transition-colors text-sm"
            >
              Residential Overview
            </Link>
            <Link
              href="/projects?type=residential&status=ongoing"
              className="text-neutral-400 hover:text-[#C59B6D] transition-colors text-sm"
            >
              Ongoing Projects
            </Link>
            <Link
              href="/projects?type=residential&status=completed"
              className="text-neutral-400 hover:text-[#C59B6D] transition-colors text-sm"
            >
              Completed Projects
            </Link>
            <Link
              href="/builders#amenities"
              className="text-neutral-400 hover:text-[#C59B6D] transition-colors text-sm"
            >
              Lifestyle Amenities
            </Link>
          </div>

          {/* Column 3: DGS Retailers (Commercial) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-2">
              DGS Retailers
            </h4>
            <Link
              href="/retailers"
              className="text-neutral-400 hover:text-[#C59B6D] transition-colors text-sm"
            >
              Commercial Overview
            </Link>
            <Link
              href="/projects?type=commercial"
              className="text-neutral-400 hover:text-[#C59B6D] transition-colors text-sm"
            >
              Retail Spaces
            </Link>
            <Link
              href="/projects?type=industrial"
              className="text-neutral-400 hover:text-[#C59B6D] transition-colors text-sm"
            >
              Industrial Hubs
            </Link>
            <Link
              href="/retailers#leasing"
              className="text-neutral-400 hover:text-[#C59B6D] transition-colors text-sm"
            >
              Leasing Enquiries
            </Link>
          </div>

          {/* Column 4: Contact HQ */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#C59B6D] text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Mumbai HQ
            </h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              DGS Corporate House,
              <br />
              Western Express Highway,
              <br />
              Borivali East, Mumbai 400066
            </p>
            <a
              href="mailto:info@dgsgroup.com"
              className="text-white hover:text-[#C59B6D] transition-colors text-sm mt-2"
            >
              info@dgsgroup.com
            </a>
            <a
              href="tel:+912212345678"
              className="text-white hover:text-[#C59B6D] transition-colors text-sm"
            >
              +91 22 1234 5678
            </a>
          </div>
        </div>

        {/* BOTTOM SECTION: Legal & Disclaimer */}
        <div className="flex flex-col gap-6 pt-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-[10px] md:text-xs leading-relaxed text-justify">
            <strong className="text-neutral-400">RERA Disclaimer:</strong> The
            projects showcased are registered under MahaRERA. The images, plans,
            layouts, elevations, and specifications presented are conceptual and
            strictly for representational purposes. The promoters/developers
            reserve the right to alter or modify any details without prior
            notice. This website does not constitute a legal offer or contract.
            For official MahaRERA details, please visit
            maharera.mahaonline.gov.in.
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-600 text-xs">
              &copy; {currentYear} DGS Group. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-neutral-600 hover:text-white transition-colors text-xs"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-neutral-600 hover:text-white transition-colors text-xs"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
