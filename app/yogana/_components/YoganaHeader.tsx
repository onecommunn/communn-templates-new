"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
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
  console.log(pathname);
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
            <Link href="/" className={"font-inter hover:font-semibold"}>
              Home
            </Link>
            <Link href="#about-us" className={"font-inter hover:font-semibold"}>
              About us
            </Link>
            <Link href="#services" className={"font-inter hover:font-semibold"}>
              Services
            </Link>
            <Link href="#events" className={"font-inter hover:font-semibold"}>
              Events
            </Link>
            <Link href="#plans" className={"font-inter hover:font-semibold"}>
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
                <div
                  className="cursor-pointer"
                  aria-controls={"yogana-mobile-menu"}
                >
                  <img src={"/assets/menu-icon-svg.svg"} className="w-8 h-8" />
                </div>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[85vw] sm:max-w-sm px-0 bg-black text-white  font-plus-jakarta h-full"
              >
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
                        src={"/logo/yogana_Light_Logo.png"}
                        alt="logo"
                        width={120}
                        height={logoHight}
                      />
                    </Link>
                  </div>
                </SheetHeader>

                {/* Nav list */}
                <nav className="flex flex-col  space-y-1 py-2 md:hidden">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className={`px-4 text-white py-3 font-inter hover:font-semibold`}
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#about-us"
                      className={`px-4 text-white py-3 font-inter hover:font-semibold`}
                    >
                      About us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#services"
                      className={`px-4 text-white py-3 font-inter hover:font-semibold`}
                    >
                      Services
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#events"
                      className={`px-4 text-white py-3 font-inter hover:font-semibold`}
                    >
                      Events
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#plans"
                      className={`px-4 text-white py-3 font-inter hover:font-semibold`}
                    >
                      Plans
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#contact"
                      className={`px-4 text-white py-3 font-inter hover:font-semibold`}
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>
                <div className="flex flex-col justify-between gap-4 px-6 mt-6 h-full relative">
                  <div className="flex flex-col gap-4">
                    {" "}
                    <div className="flex items-center gap-4">
                      <Phone className="text-white" />
                      <p className="text-lg text-white">Free +92 (020)-9850</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="text-white" />
                      <p className="text-lg text-white">needhelp@company.com</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-white"
                        fill="currentColor"
                      >
                        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                      </svg>
                      <p className="text-lg text-white">
                        66 broklyn golden street. New York
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-10 mb-10">
                    <Link
                      href="#"
                      aria-label="Facebook"
                      className="group text-white flex flex-col items-center gap-2 hover:text-[#C2A74E]"
                    >
                      <Facebook size={20} className="transition-transform" />
                      <p>Facebook</p>
                    </Link>
                    <Link
                      href="#"
                      aria-label="Instagram"
                      className="text-white flex flex-col items-center gap-2 hover:text-[#C2A74E]"
                    >
                      <Instagram size={20} className="transition-transform " />
                      <p>Instagram</p>
                    </Link>
                    <Link
                      href="#"
                      aria-label="Linkedin"
                      className="group text-white flex flex-col items-center gap-2 hover:text-[#C2A74E]"
                    >
                      <Linkedin size={20} className="transition-transform" />
                      <p>Linkedin</p>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default YoganaHeader;
