"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/Auth.context";
import { logoutService } from "@/services/logoutService";
import {
  Header,
  ServiceSection,
} from "@/models/templates/restraint/restraint-home-model";
import { toSnakeCase } from "@/components/utils/StringFunctions";

const RestraintHeader = ({
  primaryColor,
  secondaryColor,
  data,
  servicesData,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: Header;
  servicesData: ServiceSection;
}) => {
  const content = data?.content;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const auth = useContext(AuthContext);

  const servicesContent = servicesData?.content;

  const handleLogout = async () => {
    const success = await logoutService();
    if (success) {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      window.location.reload();
    } else {
      console.error("Logout failed, unable to navigate to login.");
    }
  };

  return (
    <header
      className="sticky font-sora top-0 z-50 backdrop-blur bg-[var(--pri)]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-20">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={content?.media?.[0] || "/assets/restraint-logo.png"}
              alt="logo"
              className="w-32 h-15 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-16"
            aria-label="Primary"
          >
            <Link
              href="/"
              className="font-sora hover:font-semibold text-white text-sm"
            >
              Home
            </Link>
            <Link
              href="/#about-us"
              className="font-sora hover:font-semibold text-white text-sm"
            >
              About us
            </Link>

            {/* Services with dropdown on hover (desktop) */}
            <div className="relative group cursor-pointer">
              <button
                type="button"
                className="font-sora hover:font-semibold text-white text-sm inline-flex items-center gap-1"
              >
                Services
                <ChevronDown className="h-4 w-4 mt-[1px]" />
              </button>

              <div className="absolute left-0 mt-3 w-72 bg-white text-[#0A2640] rounded-lg shadow-lg py-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                {servicesContent?.features?.map((service, idx) => (
                  <Link
                    key={idx}
                    href={`/service/${toSnakeCase(service?.title)}`}
                    className="block px-4 py-2.5 hover:bg-[var(--pri)] hover:text-white transition-colors"
                  >
                    <div className="text-sm font-semibold tracking-wide">
                      {service.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/#events"
              className="font-sora hover:font-semibold text-white text-sm"
            >
              Events
            </Link>
            <Link
              href="/#plans"
              className="font-sora hover:font-semibold text-white text-sm"
            >
              Plans
            </Link>
            <Link
              href="/#contact"
              className="font-sora hover:font-semibold text-white text-sm"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA / Auth */}
          <div className="hidden md:flex md:items-center">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-center min-w-fit text-white">
                  Hi, {auth.user?.firstName || auth.user?.email}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger className="cursor-pointer hover:bg-[#df2431] px-6 font-semibold font-sora py-2 hover:text-white bg-white text-[var(--pri)] rounded-[10px] text-sm w-fit">
                    Logout
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-sora">
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-[#df2431] hover:text-white text-white px-6 py-2 rounded-md hover:bg-[#ba1c26] cursor-pointer"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <Link href="/login" aria-label="Login">
                <Button className="cursor-pointer bg-white hover:bg-transparent hover:text-white text-[#0A2640] border border-white rounded-[10px] text-sm px-6 w-fit inline-flex items-center gap-2">
                  Login
                  <span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="cursor-pointer p-2 text-white"
                  aria-controls="creator-mobile-menu"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[85vw] sm:max-w-sm px-0">
                {/* Header inside sheet */}
                <SheetHeader className="px-4 pb-2">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <Link
                      href="/"
                      aria-label="Go home"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2"
                    >
                      <img
                        src={"/assets/restraint-logo.png"}
                        alt="Logo"
                        className="w-25 h-15 object-contain"
                      />
                    </Link>
                  </div>
                </SheetHeader>

                {/* Nav list (mobile) */}
                <nav
                  className="flex flex-col space-y-1 py-2"
                  aria-label="Mobile"
                >
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="px-4 py-3 font-inter hover:font-semibold"
                    >
                      Home
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/#about-us"
                      className="px-4 py-3 font-inter hover:font-semibold"
                    >
                      About us
                    </Link>
                  </SheetClose>

                  {/* Services with expandable submenu (mobile) */}
                  <div className="px-4 py-2 font-inter">
                    <button
                      type="button"
                      onClick={() =>
                        setIsMobileServicesOpen((prev) => !prev)
                      }
                      className="w-full flex items-center justify-between py-1 text-left hover:font-semibold"
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isMobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isMobileServicesOpen && (
                      <div className="mt-1 pl-3 space-y-1">
                        {servicesContent?.features?.map((service, idx) => (
                          <SheetClose asChild key={idx}>
                            <Link
                              href={`/service/${toSnakeCase(service?.title)}`}
                              className="block py-1.5 text-sm text-[#6B7280] hover:text-black"
                            >
                              {service.title}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>

                  <SheetClose asChild>
                    <Link
                      href="/#events"
                      className="px-4 py-3 font-inter hover:font-semibold"
                    >
                      Events
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#plans"
                      className="px-4 py-3 font-inter hover:font-semibold"
                    >
                      Plans
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className="px-4 py-3 font-inter hover:font-semibold"
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>

                {/* CTA pinned at bottom */}
                <div className="px-4 pt-2 pb-6">
                  <SheetClose asChild>
                    {auth.isAuthenticated ? (
                      <Button
                        onClick={handleLogout}
                        className="rounded-[10px] text-sm px-5 w-full bg-[#ba1c26] hover:[#ba1c26]"
                      >
                        Logout
                      </Button>
                    ) : (
                      <Link href="/login" className="w-full">
                        <Button className="rounded-[12px] text-sm px-5 w-full inline-flex items-center gap-2">
                          Login <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RestraintHeader;
