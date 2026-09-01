"use client";
import React, { useState, useEffect } from "react";
import Logo from "../Logo";
import Navbtns from "./NavBtns";
import Button from "../ui/Button";
import MobileNav from "./MobileNav";
import Cross from "../../../public/icons/Cross";
import Menu from "../../../public/icons/Menu";

const navItems = [
  { label: "Projects", target: "#projects" },
  { label: "Reviews", target: "#reviews" },
  { label: "About", target: "#about" },
  { label: "Blogs", target: "#blogs" },
  { label: "Awards", target: "#awards" },
];

const Navbar = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (item) => {
    setMobileMenuOpen(false);

    // Smooth scroll using Lenis or fallback to native scrollIntoView
    if (onNavigate) {
      onNavigate(item.target);
    } else if (lenis) {
      lenis.scrollTo(item.target, {
        duration: 1.2,
        offset: -40,
      });
    } else {
      const element = document.querySelector(item.target);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-40 bg-white/40 backdrop-blur-lg">
        <nav className="max-w-[1900px] mx-auto flex items-center justify-between px-5 sm:px-8 md:px-10 py-3 md:py-4">
          {/* LOGO */}
          <Logo
            variant="lg"
            onClick={() => handleLinkClick({ label: null, target: "#hero" })}
          />

          {/* DESKTOP & TABLET: Nav Links */}
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
            <Button
              variant="primary"
              size="md"
              onClick={() =>
                handleLinkClick({ label: "Contact", target: "#contact" })
              }
            >
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
