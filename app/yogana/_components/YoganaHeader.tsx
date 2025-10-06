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
import { AuthContext } from "@/contexts/Auth.context";
import {
  ContactDetails,
  Header,
  SocialMediaLink,
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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useState } from "react";

// Convert hex to RGB
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

// Convert RGB to HSL
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

// Convert HSL to RGB
function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
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

// Convert RGB to hex
function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

// Main function to get softer version
export function getSofterColor(
  hex: string,
  lightnessPercent: number = 95
): string {
  const { r, g, b } = hexToRgb(hex);
  let { h, s, l } = rgbToHsl(r, g, b);

  l = Math.min(lightnessPercent, 100); // ensure max 100%
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
}: IYoganaHeader) => {
  const normalize = (s?: string) => (s ?? "").trim();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const linkClass = (href: string) =>
    `font-inter ${pathname === href ? "font-semibold" : "hover:font-semibold"}`;
  const auth = useContext(AuthContext);

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
      // style={{
      //   backgroundColor: getSofterColor(primaryColor),
      // }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={
                data?.media?.[0] ||
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
            <Link
              href="/#services"
              className={"font-inter hover:font-semibold"}
            >
              Services
            </Link>
            <Link href="/#events" className={"font-inter hover:font-semibold"}>
              Events
            </Link>
            <Link href="/#plans" className={"font-inter hover:font-semibold"}>
              Plans
            </Link>
            <Link href="/#contact" className={linkClass("/contact")}>
              Contact
            </Link>
          </nav>

          {/* Mobile Menu (Sheet) */}
          <div className="flex flex-row gap-4 items-center">
            <>
              {auth.user ? (
                <>
                  <div className="text-center min-w-fit text-lg font-semibold">
                    Hi, {auth.user?.firstName}
                  </div>
                </>
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
                        src={data?.media?.[0] || "/logo/yogana_Light_Logo.png"}
                        alt="logo"
                        width={120}
                        height={100}
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
                      href="/#about-us"
                      className={`px-4 text-white py-3 font-inter hover:font-semibold`}
                    >
                      About us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#services"
                      className={`px-4 text-white py-3 font-inter hover:font-semibold`}
                    >
                      Services
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#events"
                      className={`px-4 text-white py-3 font-inter hover:font-semibold`}
                    >
                      Events
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#plans"
                      className={`px-4 text-white py-3 font-inter hover:font-semibold`}
                    >
                      Plans
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className={`px-4 text-white py-3 font-inter hover:font-semibold`}
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>
                <div className="flex flex-col justify-between gap-4 px-6 mt-6 h-full relative">
                  <div className="flex flex-col gap-4">
                    {" "}
                    <div className="flex flex-col gap-4">
                      {/* Phone */}
                      <div className="flex items-center gap-4">
                        <Phone className="text-white w-6 h-6 shrink-0" strokeWidth={1.5} />
                        <a
                          href={`tel:${contactData?.call?.value ?? ""}`}
                          className="text-md text-white hover:underline"
                        >
                          {contactData?.call?.value}
                        </a>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-4">
                        <Mail className="text-white w-6 h-6 shrink-0" strokeWidth={1.5} />
                        <a
                          href={`mailto:${contactData?.email?.value ?? ""}`}
                          className="text-md text-white underline hover:no-underline"
                        >
                          {contactData?.email?.value}
                        </a>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-4">
                        <MapPin className="text-white w-6 h-6 mt-1 shrink-0" strokeWidth={1.5} />
                        <p className="text-md text-white leading-relaxed break-words">
                          {contactData?.address?.value}
                        </p>
                      </div>
                    </div>
                    {auth?.user && (
                      <AlertDialog>
                        <AlertDialogTrigger className="cursor-pointer border-none focus-visible:border-none bg-red-600  font-inter  w-full text-white rounded-[12px] text-sm py-2">
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
                            href={url}
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
