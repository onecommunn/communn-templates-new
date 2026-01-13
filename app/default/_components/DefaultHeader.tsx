"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const DefaultHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky font-montserrat top-0 z-50 backdrop-blur bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-20">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-[30px] shrink-0 md:h-[40px] w-[30px] md:w-[40px]">
              <Image
                src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group 238944.svg"
                alt="Logo"
                width={48}
                height={48}
                unoptimized
                priority
              />
            </div>
            <span className="text-[#1E4D91] font-bold md:text-lg text-sm">
              One Communn Community
            </span>
          </Link>

          {/* Desktop Login */}
          <div className="hidden md:flex items-center">
            <Link
              href="/login"
              className="bg-[#1A1A1A] text-white px-8 py-2 rounded-full font-semibold hover:bg-black hover:scale-105 transition-transform"
            >
              Log in
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Login (outside sheet) */}
            <Link
              href="/login"
              className="bg-[#1A1A1A] text-white px-4 py-1.5 rounded-full text-xs font-semibold"
            >
              Log in
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="cursor-pointer p-2"
                  aria-controls="creator-mobile-menu"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[60vw] sm:max-w-sm px-0">
                <SheetHeader className="px-4 pb-2">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>

                {/* Nav list */}
                <nav className="flex flex-col space-y-1 py-2">
                  <SheetClose asChild>
                    <Link href="/#home" className="px-4 py-3 hover:font-semibold">
                      Home
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/#about-us"
                      className="px-4 py-3 hover:font-semibold"
                    >
                      About us
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/#events"
                      className="px-4 py-3 hover:font-semibold"
                    >
                      Events
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/#plans"
                      className="px-4 py-3 hover:font-semibold"
                    >
                      Plans
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className="px-4 py-3 hover:font-semibold"
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

export default DefaultHeader;
