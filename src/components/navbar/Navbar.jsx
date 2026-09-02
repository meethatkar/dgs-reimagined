"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../Logo";
import Navbtns from "./NavBtns";
import Button from "../ui/Button";
import MobileNav from "./MobileNav";
import Cross from "../../../public/icons/Cross";
import Menu from "../../../public/icons/Menu";

// 1. Navigation items for Main Landing Page (/)
const mainHomeNavItems = [
  { label: "Motive", target: "#motive" },
  { label: "Legacy", target: "#legacy" },
  { label: "Awards", target: "#awards" },
  { label: "About Us", target: "#about" },
  { label: "Reviews", target: "#reviews" },
];

// 2. Navigation items for DGS Builders Page (/builder or /builders)
const builderNavItems = [
  { label: "Overview", target: "#overview" },
  { label: "Residential", target: "#projects" },
  { label: "Amenities", target: "#amenities" },
  { label: "Connectivity", target: "#connectivity" },
];

// 3. Navigation items for DGS Retailers Page (/retailer or /retailers)
const retailerNavItems = [
  { label: "Overview", target: "#overview" },
  { label: "Commercial", target: "#commercial" },
  { label: "Industrial", target: "#industrial" },
  { label: "Leasing", target: "#leasing" },
];

// 4. Fallback Navigation items for sub-pages
const defaultNavItems = [
  { label: "Home", target: "/" },
  { label: "Builders", target: "/builder" },
  { label: "Retailers", target: "/retailer" },
  { label: "Awards", target: "/#awards" },
];

const Navbar = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Conditionally select navigation items based on current URL path
  const getNavItems = () => {
    if (pathname === "/") {
      return mainHomeNavItems;
    }
    if (pathname?.startsWith("/builder")) {
      return builderNavItems;
    }
    if (pathname?.startsWith("/retailer")) {
      return retailerNavItems;
    }
    return defaultNavItems;
  };

  const navItems = getNavItems();

  const handleLinkClick = (item) => {
    setMobileMenuOpen(false);
    if (!item?.target) return;

    if (item.target.startsWith("#")) {
      const element = document.querySelector(item.target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/" + item.target);
      }
    } else {
      router.push(item.target);
    }
  };

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#contact");
    }
  };

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-40 bg-white/40 backdrop-blur-lg">
        <nav className="max-w-[1900px] mx-auto flex items-center justify-between px-5 sm:px-8 md:px-10 py-3 md:py-4">
          {/* LOGO — Redirects to Home Page */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="shrink-0 flex items-center"
          >
            <Logo variant="lg" />
          </Link>

          {/* DESKTOP & TABLET: Nav Links (Conditionally rendered by route) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {navItems.map((item) => (
              <Navbtns
                key={item.label}
                text={item.label}
                isActive={false}
                onClick={() => handleLinkClick(item)}
              />
            ))}
          </div>

          {/* DESKTOP & TABLET: Contact Button */}
          <div className="hidden md:block">
            <Button variant="primary" size="md" onClick={handleContactClick}>
              Contact Us
            </Button>
          </div>

          {/* MOBILE: Hamburger Button */}
          <Button
            variant="ghost"
            size="none"
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-neutral-800"
          >
            {mobileMenuOpen ? (
              <Cross className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </Button>
        </nav>
      </header>

      {/* MOBILE NAV COMPONENT */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        handleLinkClick={handleLinkClick}
      />
    </>
  );
};

export default Navbar;
