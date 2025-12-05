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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  toSnakeCase,
  underscoreToSpace,
} from "@/components/utils/StringFunctions";
import { AuthContext } from "@/contexts/Auth.context";
import {
  ContactDetails,
  Header,
  SocialMediaLink,
  ServiceSection,
} from "@/models/templates/yogana/yogana-home-model";
import { logoutService } from "@/services/logoutService";
import {
  Dribbble,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";

// ---- color utils (unchanged) ----
function hexToRgb(hex: string) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function getSofterColor(
  hex: string,
  lightnessPercent: number = 95
): string {
  const { r, g, b } = hexToRgb(hex);
  let { h, s, l } = rgbToHsl(r, g, b);
  l = Math.min(lightnessPercent, 100);
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

interface IYoganaHeader {
  data: Header;
  contactData: ContactDetails;
  socialMediaList: SocialMediaLink[];
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  servicesData: ServiceSection;
  plansIsActive: boolean;
  eventsIsActive: boolean;
}

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  dribbble: Dribbble,
};

const YoganaHeader = ({
  data,
  contactData,
  socialMediaList,
  primaryColor,
  secondaryColor,
  neutralColor,
  servicesData,
  eventsIsActive,
  plansIsActive,
}: IYoganaHeader) => {
  const normalize = (s?: string) => (s ?? "").trim();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [desktopPopoverOpen, setDesktopPopoverOpen] = useState(false);
  const [mobilePopoverOpen, setMobilePopoverOpen] = useState(false);
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
      className="sticky font-plus-jakarta top-0 z-50 backdrop-blur bg-[#f4ede0]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={
                data?.content?.media?.[0] ||
                "https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2Faf41e301c5b247df80bb6243baf910cd"
              }
              alt="logo"
              className="w-25 h-15 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-16 font-plus-jakarta">
            <Link href="/" className={"font-inter hover:font-semibold"}>
              Home
            </Link>
            <Link
              href="/#about-us"
              className={"font-inter hover:font-semibold"}
            >
              About us
            </Link>

            {/* Services with dropdown on hover (DESKTOP) */}
            <div className="relative group cursor-pointer">
              <button
                type="button"
                className="font-inter hover:font-semibold inline-flex items-center gap-1"
              >
                Services
                <ChevronDown className="h-4 w-4 mt-[1px]" />
              </button>

              <div className="absolute left-0 mt-3 w-72 bg-white text-[#111827] rounded-lg shadow-lg py-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                {servicesContent?.services?.map((service, idx) => (
                  <Link
                    key={idx}
                    href={`/service?name=${service?.serviceName}`}
                    className="block px-4 py-2.5 hover:bg-[var(--pri)] hover:text-white transition-colors"
                  >
                    <div className="text-sm font-semibold tracking-wide capitalize">
                      {underscoreToSpace(service?.serviceName)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {eventsIsActive && (
              <Link
                href="/#events"
                className={"font-inter hover:font-semibold"}
              >
                Events
              </Link>
            )}
            {plansIsActive && (
              <Link href="/#plans" className={"font-inter hover:font-semibold"}>
                Plans
              </Link>
            )}

            <Link href="/#contact" className={"font-inter hover:font-semibold"}>
              Contact
            </Link>
          </nav>

          {/* Mobile Menu (Sheet) */}
          <div className="flex flex-row gap-4 items-center">
            <>
              {auth.user ? (
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-fit text-[var(--sec)] font-medium">
                    Hi, {auth.user?.firstName || auth.user?.emailId}
                  </div>
                  <Popover
                    open={desktopPopoverOpen}
                    onOpenChange={setDesktopPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Avatar className="cursor-pointer size-9">
                        <AvatarImage
                          src={auth?.user?.avatar}
                          alt={auth?.user?.firstName}
                        />
                        <AvatarFallback>
                          {auth?.user?.firstName?.[0] ??
                            auth?.user?.emailId?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-72 mt-1 rounded-md p-2 mr-4"
                      style={
                        {
                          "--pri": primaryColor,
                          "--sec": secondaryColor,
                        } as React.CSSProperties
                      }
                    >
                      <div className="grid gap-2">
                        <div className="grid grid-cols-4 gap-2 bg-[#f9f9f9] p-2 rounded-md">
                          <div className="col-span-1 flex items-center justify-center">
                            <Avatar className="cursor-pointer size-12">
                              <AvatarImage
                                src={auth?.user?.avatar}
                                alt={auth?.user?.firstName}
                              />
                              <AvatarFallback>
                                {auth?.user?.firstName?.[0] ??
                                  auth?.user?.emailId?.[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="col-span-3">
                            <h4 className="font-semibold">
                              {auth?.user?.firstName}
                            </h4>
                            <p className="text-gray-500 text-[12px] font-semibold">
                              {auth?.user?.emailId}
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`/profile?id=${auth?.user?.id}`}
                          onClick={() => setDesktopPopoverOpen(false)}
                          style={{
                            cursor: "pointer",
                          }}
                          className="w-full font-semibold text-[16px] py-2 rounded-md bg-[var(--pri)]/30 hover:bg-[var(--pri)] hover:text-white cursor-pointer flex justify-center items-center"
                        >
                          Edit Profile
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger className="cursor-pointer hover:bg-[#df2431] text-[#df2431] px-6 font-semibold font-sora py-2 hover:text-white bg-white rounded-[10px] text-sm w-full">
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
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <Link href={"/login"}>
                  <Button
                    className="rounded-[12px] py-1.5 px-6 h-fit! w-fit! cursor-pointer"
                    style={{ background: primaryColor }}
                  >
                    Login
                  </Button>
                </Link>
              )}
            </>

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
                className="w-[85vw] sm:max-w-sm px-0 bg-black text-white font-plus-jakarta h-full"
                style={
                  {
                    "--pri": primaryColor,
                    "--sec": secondaryColor,
                    "--neu": neutralColor,
                  } as React.CSSProperties
                }
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
                        src={
                          data?.content?.media?.[0] ||
                          "/logo/yogana_Light_Logo.png"
                        }
                        alt="logo"
                        width={120}
                        height={100}
                      />
                    </Link>
                  </div>
                </SheetHeader>

                {/* Nav list (MOBILE) */}
                <nav className="flex flex-col space-y-1 py-2 md:hidden">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="px-4 text-white py-3 font-inter hover:font-semibold"
                    >
                      Home
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/#about-us"
                      className="px-4 text-white py-3 font-inter hover:font-semibold"
                    >
                      About us
                    </Link>
                  </SheetClose>

                  {/* ✅ Services expandable submenu (MOBILE) */}
                  <div className="px-4 py-2 font-inter">
                    <button
                      type="button"
                      onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                      className="w-full flex items-center justify-between text-white py-1"
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
                        {servicesContent?.services?.map((service, idx) => (
                          <SheetClose asChild key={idx}>
                            <Link
                              href={`/service/${toSnakeCase(
                                service?.serviceName
                              )}`}
                              className="block py-1.5 text-sm text-gray-300 hover:text-white"
                            >
                              {service.serviceName}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>

                  {eventsIsActive && (
                    <SheetClose asChild>
                      <Link
                        href="/#events"
                        className="px-4 text-white py-3 font-inter hover:font-semibold"
                      >
                        Events
                      </Link>
                    </SheetClose>
                  )}
                  {plansIsActive && (
                    <SheetClose asChild>
                      <Link
                        href="/#plans"
                        className="px-4 text-white py-3 font-inter hover:font-semibold"
                      >
                        Plans
                      </Link>
                    </SheetClose>
                  )}

                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className="px-4 text-white py-3 font-inter hover:font-semibold"
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>

                {/* Bottom contact + social (unchanged) */}
                <div className="flex flex-col justify-between gap-4 px-6 mt-6 h-full relative">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      {/* Phone */}
                      <div className="flex items-center gap-4">
                        <Phone
                          className="text-white w-6 h-6 shrink-0"
                          strokeWidth={1.5}
                        />
                        <a
                          href={`tel:${
                            contactData?.content?.call?.value ?? ""
                          }`}
                          className="text-md text-white hover:underline"
                        >
                          {contactData?.content?.call?.value}
                        </a>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-4">
                        <Mail
                          className="text-white w-6 h-6 shrink-0"
                          strokeWidth={1.5}
                        />
                        <a
                          href={`mailto:${
                            contactData?.content?.email?.value ?? ""
                          }`}
                          className="text-md text-white underline hover:no-underline"
                        >
                          {contactData?.content?.email?.value}
                        </a>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-4">
                        <MapPin
                          className="text-white w-6 h-6 mt-1 shrink-0"
                          strokeWidth={1.5}
                        />
                        <p className="text-md text-white leading-relaxed break-words">
                          {contactData?.content?.address?.value}
                        </p>
                      </div>
                    </div>

                    {auth?.user && (
                      <AlertDialog>
                        <AlertDialogTrigger className="cursor-pointer border-none focus-visible:border-none bg-red-600 font-inter w-full text-white rounded-[12px] text-sm py-2">
                          Logout
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-inter">
                              Are you sure you want to logout?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleLogout}
                              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 cursor-pointer"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-10 mb-10">
                    {socialMediaList?.map(
                      (each: SocialMediaLink, idx: number) => {
                        const key = normalize(each.platform).toLowerCase();
                        const Icon = PLATFORM_ICON[key] ?? Globe;
                        const url = normalize(each.url) || "/";
                        return (
                          <Link
                            href={url || "/"}
                            key={`${key}-${idx}`}
                            aria-label={each.platform}
                            className="group text-white flex flex-col items-center gap-2 hover:text-[#C2A74E]"
                          >
                            <Icon
                              size={20}
                              className="w-5 h-5 hover:opacity-80 transition-transform"
                            />
                            <p>{each.platform}</p>
                          </Link>
                        );
                      }
                    )}
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
