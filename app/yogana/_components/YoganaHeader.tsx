"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface IYoganaHeader {
  logoUrl: string;
  logoWidth: number;
  logoHight: number;
}

const YoganaHeader = ({ logoHight, logoUrl, logoWidth }: IYoganaHeader) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const linkClass = (href: string) =>
    `font-inter ${pathname === href ? "font-semibold" : "hover:font-semibold"}`;
  return (
    <header className="sticky font-plus-jakarta top-0 z-50 backdrop-blur bg-[#f4ede0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={
                logoUrl ||
                "https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2Faf41e301c5b247df80bb6243baf910cd"
              }
              alt="logo"
              width={logoWidth || 180}
              height={logoHight}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-16 font-plus-jakarta">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="#about-us" className={linkClass("/about-us")}>
              About us
            </Link>
            <Link href="#events" className={linkClass("/events")}>
              Events
            </Link>
            <Link href="#plans" className={linkClass("/plans")}>
              Plans
            </Link>
            <Link href="#contact" className={linkClass("/contact")}>
              Contact
            </Link>
          </nav>

          {/* Mobile Menu (Sheet) */}
          <div>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button aria-label="Open menu">
                  <img src={'/assets/menu-icon-svg.svg'} className="w-8 h-8"/>
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[85vw] sm:max-w-sm px-0 bg-black text-white  font-plus-jakarta">
                {/* Custom header inside sheet */}
                <SheetHeader className="px-4 pb-2 text-white">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <Link
                      href="/"
                      aria-label="Go home"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2"
                    >
                      <img
                        src={
                          '/logo/yogana_Light_Logo.png'
                        }
                        alt="logo"
                        width={120}
                        height={logoHight}
                      />
                    </Link>
                  </div>
                </SheetHeader>

                {/* Nav list */}
                <nav className="flex flex-col space-y-1 py-2 md:hidden">
                  <SheetClose asChild>
                    <Link href="/" className={`px-4 text-white py-3 ${linkClass("/")}`}>
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#about-us"
                      className={`px-4 text-white py-3 ${linkClass("/about-us")}`}
                    >
                      About us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#events"
                      className={`px-4 text-white py-3 ${linkClass("/events")}`}
                    >
                      Events
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#plans"
                      className={`px-4 text-white py-3 ${linkClass("/plans")}`}
                    >
                      Plans
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#contact"
                      className={`px-4 text-white py-3 ${linkClass("/contact")}`}
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>
                
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default YoganaHeader;
