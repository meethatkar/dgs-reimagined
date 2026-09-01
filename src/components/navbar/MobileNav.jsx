"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "../ui/Button";
import MobileNavBtn from "./MobileNavBtns";
import Cross from "../../../public/icons/Cross";

const MobileNav = ({
  isOpen,
  onClose,
  navItems = [],
  activeSection,
  handleLinkClick,
}) => {
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const menuRef = useRef(null);

  // Mount menu DOM element when opened
  useEffect(() => {
    if (isOpen) {
      setIsMenuMounted(true);
    }
  }, [isOpen]);

  // GSAP animation for slide-in from right and slide-out to right
  useEffect(() => {
    if (isMenuMounted && menuRef.current) {
      if (isOpen) {
        // Set off-screen right initially and animate in
        gsap.set(menuRef.current, { x: "100%" });
        gsap.to(menuRef.current, {
          x: "0%",
          duration: 0.45,
          ease: "power3.out",
        });
      } else {
        // Slide out to right
        gsap.to(menuRef.current, {
          x: "100%",
          duration: 0.35,
          ease: "power3.in",
          onComplete: () => setIsMenuMounted(false),
        });
      }
    }
  }, [isOpen, isMenuMounted]);

  if (!isMenuMounted) return null;

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-50 w-screen h-screen bg-white/95 backdrop-blur-2xl px-6 sm:px-10 pt-6 pb-10 flex flex-col justify-between md:hidden"
    >
      {/* Header row inside drawer: Logo + Close button */}
      <div className="flex items-center justify-end pb-6 border-b border-neutral-200/70">
        <Button
          variant="icon"
          size="none"
          ariaLabel="Close Menu"
          onClick={onClose}
        >
          <Cross className="w-8 h-8" />
        </Button>
      </div>

      {/* Nav Items List (with MobileNavBtn) */}
      <div className="flex-1 flex flex-col justify-center gap-3 my-8 overflow-y-auto no-scrollbar scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => (
          <div key={item.label}>
            <MobileNavBtn
              text={item.label}
              isActive={activeSection === item.label}
              onClick={() => handleLinkClick(item)}
            />
          </div>
        ))}
      </div>

      {/* CTA Section (with gap before button) */}
      <div className="pt-6 border-t border-neutral-200/70 mt-auto">
        <Button
          variant="primary"
          size="full"
          onClick={() =>
            handleLinkClick({ label: "Contact", target: "#contact" })
          }
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default MobileNav;
