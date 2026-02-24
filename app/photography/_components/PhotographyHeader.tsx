"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Header } from "@/models/templates/photography/photography-home-model";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Packages", path: "/packages" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Contact", path: "/contact" },
];

const PhotographyHeader = ({ data }: { data: Header }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const content = data?.content

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#000007]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-2.5 px-4 md:px-20">
        <Link href="/">
          <img
            src={
             content?.media?.[0]
            }
            alt="Vijay Photography"
            className="h-8 md:h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                  isActive
                    ? "text-[#E9A55C]"
                    : "text-[#EFECE7]/80 hover:text-[#E9A55C]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden text-[#EFECE7] p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#000007]/98 backdrop-blur-lg border-t border-white/10">
          <div className="container mx-auto py-6 px-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium uppercase tracking-widest py-2 transition-colors ${
                    isActive
                      ? "text-[#E9A55C]"
                      : "text-[#EFECE7]/80 hover:text-[#E9A55C]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default PhotographyHeader;
