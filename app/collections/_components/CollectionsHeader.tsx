"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import {
  Dribbble,
  Facebook,
  Globe,
  Linkedin,
  LogOut,
  Menu,
  Twitter,
  UserRoundPen,
  Wallet,
  Youtube,
} from "lucide-react";
import { FaInstagram, FaYoutube, FaThreads, FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt, FaPinterest } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { AuthContext } from "@/contexts/Auth.context";
import { logoutService } from "@/services/logoutService";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PopoverContent } from "@radix-ui/react-popover";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  FooterSection,
  Header,
  SocialMediaLink,
} from "@/models/templates/collections/collections-home-model";
import { formatUrl } from "@/utils/StringFunctions";

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: FaInstagram,
  facebook: Facebook,
  linkedin: Linkedin,
  dribbble: Dribbble,
  twitter: FaXTwitter,
  youtube: Youtube,
  pinterest: FaPinterest,
  threads: FaThreads,
};

const CollectionsHeader: React.FC<{
  primaryColor: string;
  data: Header;
  footerData: FooterSection;
}> = ({ primaryColor, data, footerData }) => {
  const content = data?.content;
  const footerContent = footerData?.content;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const auth = useContext(AuthContext);

  const [desktopPopoverOpen, setDesktopPopoverOpen] = useState(false);
  const [mobilePopoverOpen, setMobilePopoverOpen] = useState(false);

  const normalize = (s?: string) => (s ?? "").trim();

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
      className="sticky border-b top-0 z-50 bg-white"
      style={
        {
          "--pri": primaryColor,
        } as React.CSSProperties
      }
    >
      {/* Top Strip - Gold Textured Bar */}
      <div
        className="relative overflow-hidden font-lora text-white py-2 px-6 lg:px-20 flex items-center justify-center md:justify-between"
        style={{ backgroundColor: primaryColor }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("/assets/collections-header-bg-image.png")`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            backgroundPosition: "center",
            opacity: 0.5,
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
          }}
          aria-hidden="true"
        />

        {/* Tint overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundColor: primaryColor,
            opacity: 0.8,
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
          }}
          aria-hidden="true"
        />
        {/* Social Icons */}
        <div className="flex items-center gap-4 z-10">
          {footerContent?.socialMedia
            ?.filter(
              (each: SocialMediaLink) => each.url && each.url.trim().length > 0
            )
            .map((each: SocialMediaLink) => {
              const key = normalize(each.platform).toLowerCase();
              const Icon = PLATFORM_ICON[key] ?? Globe;
              const url = formatUrl(each.url);

              return (
                <Link href={url} key={key}>
                  <Icon className="w-6 h-6 md:w-4 md:h-4 hover:scale-110 transition-transform" />
                </Link>
              );
            })}
        </div>

        {/* Contact Info */}
        <div className="md:flex items-center hidden gap-6 text-sm font-light z-10">
          <div className="flex items-center gap-2 text-base font-lora">
            <FaPhoneAlt size={14} />
            <span>{footerContent?.contact?.phoneNumber}</span>
          </div>
          <span className="opacity-50">|</span>
          <div className="flex items-center gap-2">
            <IoMail size={16} />
            <span className="hidden sm:inline text-base">
              {footerContent?.contact?.email}
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}


      <div className="container font-figtree mx-auto px-4 sm:px-6 md:px-6 lg:px-6">
        {/* Centered header row */}
        <div className="relative flex items-center justify-center h-16">
          {/* LEFT: Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-12 font-figtree absolute left-0">
            <Link href="/" className="text-gray-700 hover:text-[var(--pri)] transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[var(--pri)] transition-colors">
              About Us
            </Link>
            <Link href="/collections" className="text-gray-700 hover:text-[var(--pri)] transition-colors">
              Collections
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[var(--pri)] transition-colors">
              Contact
            </Link>
          </nav>

          {/* CENTER: Logo */}
          <Link href="/" className="flex items-center justify-center">
            <img
              className=""
              src={
                content?.media?.[0] ??
                "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group1.svg"
              }
              alt="logo"
            />
          </Link>

          {/* RIGHT: Desktop CTA / Auth */}
          <div className="hidden md:flex items-center absolute right-0">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-center min-w-fit text-[var(--pri)] font-semibold">
                  Hi, {auth.user?.firstName || auth.user?.emailId}
                </div>


              </div>
            ) : (
              <Link href="/" aria-label="Login">
                <Button className="cursor-pointer hover:bg-transparent hover:text-[var(--pri)] border border-[var(--pri)] rounded-[5px] text-sm bg-[var(--pri)] px-6 w-fit inline-flex items-center gap-2">
                  <span>
                    <UserRoundPen strokeWidth={1.5} />
                  </span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile: keep menu + avatar on right, logo stays centered */}
          <div className="md:hidden flex items-center gap-2 absolute right-0">
            {auth.isAuthenticated && (
              <Popover open={mobilePopoverOpen} onOpenChange={setMobilePopoverOpen}>
                {/* keep your mobile popover exactly as is */}
              </Popover>
            )}

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <span>
                <UserRoundPen strokeWidth={1.5} />
              </span>
            </Sheet>
          </div>
        </div>
      </div>


    </header>
  );
};

export default CollectionsHeader;
