"use client";
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
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toSnakeCase } from "@/components/utils/StringFunctions";
import { AuthContext } from "@/contexts/Auth.context";
import {
  ContactSection,
  Header,
  ServiceSection,
  SocialMediaLink,
} from "@/models/templates/fitkit/fitkit-home-model";
import { logoutService } from "@/services/logoutService";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
} from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";

const FitKitHeader = ({
  data,
  contactData,
  socialMediaData,
  secondaryColor,
  primaryColor,
  servicesData,
}: {
  data: Header;
  contactData: ContactSection;
  socialMediaData: SocialMediaLink[];
  secondaryColor: string;
  primaryColor: string;
  servicesData: ServiceSection;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false); // 👈 NEW
  const auth = useContext(AuthContext);
  const content = data?.content;

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
      className="sticky font-archivo top-0 z-50 bg-[var(--pri)] text-[#AFB1C3]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* upper header */}
      <div className="py-2 mx-auto px-4 sm:px-6 md:px-6 lg:px-20 hidden md:flex md:flex-row items-center justify-between border-b border-b-[#383D46]">
        <div className="flex flex-row items-center justify-center gap-6 text-sm">
          <Link href={"/"} className="flex items-center gap-2">
            <span>
              <Phone size={18} color="#fff" />
            </span>
            {contactData?.content?.contact?.phoneNumber}
          </Link>
          <span>|</span>
          <Link href={"/"} className="flex items-center gap-2">
            <span>
              <Mail size={18} color="#fff" />
            </span>
            {contactData?.content?.contact?.email}
          </Link>
          <span>|</span>
          <Link href={"/"} className="flex items-center gap-2">
            <span>
              <MapPin size={18} color="#fff" />
            </span>
            {contactData?.content?.contact?.address}
          </Link>
        </div>
        <div>
          <div className="flex flex-row items-center justify-center gap-6 text-sm">
            {socialMediaData?.map((item, index) => (
              <React.Fragment key={index}>
                <Link href={item?.url || "/"}>{item?.platform}</Link>
                {index !== socialMediaData?.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-20 bg-[var(--pri)] text-[#AFB1C3]">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={content?.media?.[0] || "/assets/fitkit-logo.svg"}
              alt="logo"
              className="w-32 h-15 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            aria-label="Primary"
          >
            <Link
              href="/"
              className="font-archivo text-[16px] font-medium text-white hover:font-semibold uppercase cursor-pointer"
            >
              Home
            </Link>

            <Link
              href="/#about-us"
              className="font-archivo text-[16px] font-medium text-white hover:font-semibold uppercase cursor-pointer"
            >
              About us
            </Link>

            {/* Services with dropdown on hover (desktop) */}
            <div className="relative group cursor-pointer">
              <button
                className="font-archivo cursor-pointer text-[16px] font-medium text-white hover:font-semibold uppercase inline-flex items-center gap-1"
                type="button"
              >
                Services
                <ChevronDown className="h-4 w-4 mt-[1px] transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown panel */}
              <div className="absolute left-0 mt-3 w-72 bg-[#fff] text-[#000] rounded-lg shadow-lg py-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                {servicesContent?.features?.map((service, idx) => (
                  <Link
                    key={idx}
                    href={`/service/${toSnakeCase(service?.title)}`}
                    className="block px-4 py-2.5 hover:bg-[#0E0E0E] hover:text-white transition-colors"
                  >
                    <div className="text-sm font-semibold uppercase tracking-wide">
                      {service.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/#events"
              className="font-archivo text-[16px] font-medium text-white hover:font-semibold uppercase cursor-pointer"
            >
              Events
            </Link>
            <Link
              href="/#plans"
              className="font-archivo text-[16px] font-medium text-white hover:font-semibold uppercase cursor-pointer"
            >
              Plans
            </Link>
            <Link
              href="/#contact"
              className="font-archivo text-[16px] font-medium text-white hover:font-semibold uppercase cursor-pointer"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA / Auth */}
          <div className="hidden md:flex md:items-center">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-center font-medium min-w-fit">
                  Hi, {auth.user?.firstName || auth.user?.email}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger className="cursor-pointer hover:bg-[#ba1c26] px-6 font-archivo py-2 rounded-[10px] text-sm w-fit border border-[var(--sec)] text-[#AFB1C3]">
                    Logout
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-archivo">
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-[#ba1c26] px-6 py-2 rounded-md hover:bg-[#ba1c26] cursor-pointer"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <Link href="/login" aria-label="Login">
                <Button className="cursor-pointer hover:bg-transparent hover:font-bold bg-transparent border rounded-[10px] text-sm  px-6 w-fit inline-flex items-center gap-2">
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
                  className="cursor-pointer p-2"
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
                        src={"/assets/fitkit-light-logo.svg"}
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
                      className="px-4 py-3 font-archivo hover:font-semibold"
                    >
                      Home
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/#about-us"
                      className="px-4 py-3 font-archivo hover:font-semibold"
                    >
                      About us
                    </Link>
                  </SheetClose>

                  {/* Services with expandable submenu (mobile) */}
                  <div className="px-4 py-2 font-archivo">
                    <button
                      type="button"
                      onClick={() => setIsMobileServicesOpen((prev) => !prev)}
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
                              className="block py-1.5 text-sm text-[#9CA3AF] hover:text-white"
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
                      className="px-4 py-3 font-archivo hover:font-semibold"
                    >
                      Events
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#plans"
                      className="px-4 py-3 font-archivo hover:font-semibold"
                    >
                      Plans
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className="px-4 py-3 font-archivo hover:font-semibold"
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

export default FitKitHeader;
