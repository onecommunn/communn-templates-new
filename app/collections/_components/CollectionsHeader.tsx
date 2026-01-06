"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  LogOut,
  Menu,
  Twitter,
  User,
  UserRoundPen,
  Wallet,
} from "lucide-react";
import { FaInstagram, FaYoutube, FaThreads } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
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

const CollectionsHeader: React.FC<{ primaryColor: string }> = ({
  primaryColor,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const auth = useContext(AuthContext);

  const [desktopPopoverOpen, setDesktopPopoverOpen] = useState(false);
  const [mobilePopoverOpen, setMobilePopoverOpen] = useState(false);

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
        className="relative font-lora text-white py-2 px-6 lg:px-20 flex flex-row items-center justify-center md:justify-between z-30 overflow-hidden"
        style={{
          backgroundColor: "var(--pri)",
          backgroundImage: `url("/assets/collections-header-bg-image.png")`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundBlendMode: "multiply",
        }}
      >
        {/* Social Icons */}
        <div className="flex items-center gap-4 z-10">
          <Link href="#">
            <FaThreads className="w-6 h-6 md:w-4 md:h-4 hover:scale-110 transition-transform" />
          </Link>
          <Link href="#">
            <FaInstagram className="w-6 h-6 md:w-4 md:h-4 hover:scale-110 transition-transform" />
          </Link>
          <Link href="#">
            <Facebook className="w-6 h-6 md:w-4 md:h-4 hover:scale-110 transition-transform" />
          </Link>
          <Link href="#">
            <FaYoutube className="w-6 h-6 md:w-4 md:h-4 hover:scale-110 transition-transform" />
          </Link>
          <Link href="#">
            <Twitter className="w-4 h-4 hover:scale-110 transition-transform" />
          </Link>
        </div>

        {/* Contact Info */}
        <div className="md:flex items-center hidden gap-6 text-sm font-light z-10">
          <div className="flex items-center gap-2 text-base font-lora">
            <FaPhoneAlt size={14} />
            <span>+91 72592 53666</span>
          </div>
          <span className="opacity-50">|</span>
          <div className="flex items-center gap-2">
            <IoMail size={16} />
            <span className="hidden sm:inline text-base">
              vinuthaprajwalco@gmail.com
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container font-figtree mx-auto px-4 sm:px-6 md:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={
                "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group1.svg"
              }
              alt="logo"
              className="w-fit h-15 object-cover"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12 font-figtree">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#C09932] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#C09932] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/collections"
              className="text-gray-700 hover:text-[#C09932] transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#C09932] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA / Auth */}
          <div className="hidden md:flex md:items-center">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-center min-w-fit text-[var(--pri)] font-semibold">
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
                        {auth?.user?.firstName?.[0] ?? auth?.user?.emailId?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-72 mt-1 rounded-md p-2 mr-4 shadow-lg border bg-white z-50"
                    style={
                      {
                        "--pri": primaryColor,
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
                        className="w-full font-medium text-[16px] text-[var(--pri)]/70 hover:bg-[var(--pri)]/10 py-2 px-4 rounded-md  cursor-pointer flex justify-start items-center gap-2"
                      >
                        <UserRoundPen strokeWidth={1.5} />
                        Account
                      </Link>
                      <Link
                        href={`/payments`}
                        onClick={() => setDesktopPopoverOpen(false)}
                        style={{
                          cursor: "pointer",
                        }}
                        className="w-full font-medium text-[16px] text-[var(--pri)]/70 hover:bg-[var(--pri)]/10 py-2 px-4 rounded-md  cursor-pointer flex justify-start items-center gap-2"
                      >
                        <Wallet strokeWidth={1.5} />
                        Payments
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger className="flex items-center gap-2 cursor-pointer text-[var(--pri)]/70 hover:text-[#df2431] px-4 font-semibold font-sora py-2 bg-white rounded-[10px] text-sm w-full">
                          <LogOut strokeWidth={1.5} />
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
              <Link href="/login" aria-label="Login">
                <Button className="cursor-pointer hover:bg-transparent hover:text-[var(--pri)] border border-[var(--pri)] rounded-[5px] text-sm bg-[var(--pri)] px-6 w-fit inline-flex items-center gap-2">
                  Login
                  <span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            {auth.isAuthenticated && (
              <div className="flex items-center gap-4">
                <Popover
                  open={mobilePopoverOpen}
                  onOpenChange={setMobilePopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer size-9">
                      <AvatarImage
                        src={auth?.user?.avatar}
                        alt={auth?.user?.firstName}
                      />
                      <AvatarFallback>
                        {auth?.user?.firstName?.[0] ?? auth?.user?.emailId?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-72 mt-1 rounded-md p-2 mr-1 shadow-lg"
                    style={
                      {
                        "--pri": primaryColor,
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
                        className="w-full font-medium text-[16px] text-[var(--pri)]/70 hover:bg-[var(--pri)]/10 py-2 px-4 rounded-md  cursor-pointer flex justify-start items-center gap-2"
                      >
                        <UserRoundPen strokeWidth={1.5} />
                        Account
                      </Link>
                      <Link
                        href={`/payments`}
                        onClick={() => setDesktopPopoverOpen(false)}
                        style={{
                          cursor: "pointer",
                        }}
                        className="w-full font-medium text-[16px] text-[var(--pri)]/70 hover:bg-[var(--pri)]/10 py-2 px-4 rounded-md  cursor-pointer flex justify-start items-center gap-2"
                      >
                        <Wallet strokeWidth={1.5} />
                        Payments
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger className="flex items-center gap-2 cursor-pointer text-[var(--pri)]/70 hover:text-[#df2431] px-4 font-semibold font-sora py-2 bg-white rounded-[10px] text-sm w-full">
                          <LogOut strokeWidth={1.5} />
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
            )}
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
              <SheetContent
                side="right"
                className="w-[85vw] sm:max-w-sm px-0"
                style={
                  {
                    "--pri": primaryColor,
                  } as React.CSSProperties
                }
              >
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
                        src={
                          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Container.svg"
                        }
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
                      className="px-4 py-3 font-figtree hover:font-semibold"
                      style={{ color: primaryColor }}
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#about-us"
                      className="px-4 py-3 font-figtree hover:font-semibold"
                      style={{ color: primaryColor }}
                    >
                      About us
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/#collections"
                      className="px-4 py-3 font-figtree hover:font-semibold"
                      style={{ color: primaryColor }}
                    >
                      Collections
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className="px-4 py-3 font-figtree hover:font-semibold"
                      style={{ color: primaryColor }}
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>

                {/* CTA pinned at bottom */}
                <div className="px-4 pt-2 pb-6">
                  <SheetClose asChild>
                    {!auth.isAuthenticated && (
                      <Link href="/login" className="w-full">
                        <Button className="rounded-[5px] text-white font-figtree text-sm px-5 w-full inline-flex items-center gap-2 bg-[var(--pri)]">
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

export default CollectionsHeader;
