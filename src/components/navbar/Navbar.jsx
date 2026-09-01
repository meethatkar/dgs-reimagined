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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null); // By default, no nav button is active
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const lenis = useLenis();

  // ScrollSpy & Glassmorphism Header Effect
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = [
      { label: "Projects", target: "#projects" },
      { label: "Reviews", target: "#reviews" },
      { label: "About", target: "#about" },
      { label: "Blogs", target: "#blogs" },
      { label: "Awards", target: "#awards" },
      { label: "Contact", target: "#contact" },
    ];

    const handleScroll = () => {
      // Toggle glassmorphism background when scrolled past hero header
      setIsScrolled(window.scrollY > 20);

      // Detect active section based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let currentActive = null;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i].target);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && window.scrollY < top + height - 40) {
            currentActive = sections[i].label;
            break;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (item) => {
    setActiveSection(item.label);
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
      <header className="fixed top-0 left-0 w-full z-40 sm:px-8 lg:px-12 sm:pt-6 pointer-events-none">
        <nav
          className={`pointer-events-auto max-w-[1800px] mx-auto flex items-center justify-between px-5 sm:px-8 md:px-10 py-3 md:py-4 sm:rounded-2xl transition-all duration-300 ${
            isScrolled ? "backdrop-blur-md bg-black/30 shadow-lg" : ""
          }`}
        >
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
                isActive={activeSection === item.label}
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
            ariaLabel="Toggle Menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg"
          >
            {mobileMenuOpen ? (
              <Cross className="w-7 h-7 text-white" />
            ) : (
              <Menu className="w-7 h-7 text-white" />
            )}
          </Button>
        </nav>
      </header>

      {/* MOBILE NAV COMPONENT WITH GSAP ANIMATIONS */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
        handleLinkClick={handleLinkClick}
      />
    </>
  );
};

export default Navbar;
