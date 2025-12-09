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
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Linkedin,
  LogOut,
  Menu,
  Twitter,
  UserRoundPen,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/Auth.context";
import { logoutService } from "@/services/logoutService";
import {
  Header,
  ServiceSection,
} from "@/models/templates/spawell/spawell-home-model";
import {
  toSnakeCase,
  underscoreToSpace,
} from "@/components/utils/StringFunctions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SpawellHeader = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
  servicesData,
  eventsIsActive,
  plansIsActive,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: Header;
  servicesData: ServiceSection;
  eventsIsActive: boolean;
  plansIsActive: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const auth = useContext(AuthContext);
  const source = data?.content;
  const servicesContent = servicesData?.content;

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
      className="sticky font-plus-jakarta top-0 z-50 backdrop-blur bg-[var(--neu)]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      {/* Top strip */}
      <div className="py-2 mx-auto px-4 sm:px-6 md:px-6 lg:px-20 bg-[var(--pri)] hidden md:flex md:flex-row items-center justify-between">
        <div>
          <p className="text-[var(--sec)] text-[14px] font-normal">
            {source?.subHeading}{" "}
            <span className="font-bold hover:underline">
              <Link href="/">{source?.heading}</Link>
            </span>
          </p>
        </div>
        <div className="grid grid-cols-2 text-[var(--sec)]">
          <div className="flex flex-row items-center justify-center gap-6">
            <Link href={"/"}>Get a Quotes</Link>
            <span>|</span>
            <Link href={"/"}>Need help ?</Link>
          </div>
          <div className="flex flex-row items-center justify-end gap-6">
            <Link href={"/"}>
              <Facebook className="size-5 hover:size-6" />
            </Link>
            <Link href={"/"}>
              <Twitter className="size-5 hover:size-6" />
            </Link>
            <Link href={"/"}>
              <Linkedin className="size-5 hover:size-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={source?.media?.[0] || "/assets/spawell-logo.png"}
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
              className="font-inter hover:font-semibold text-[var(--pri)]"
            >
              Home
            </Link>
            <Link
              href="/#about-us"
              className="font-inter hover:font-semibold text-[var(--pri)]"
            >
              About us
            </Link>

            {/* Services with dropdown on hover (desktop) */}
            <div className="relative group cursor-pointer">
              <button
                type="button"
                className="font-inter hover:font-semibold text-[var(--pri)] inline-flex items-center gap-1"
              >
                Services
                <ChevronDown className="h-4 w-4 mt-[1px]" />
              </button>

              <div className="absolute left-0 mt-3 w-72 bg-white text-[var(--pri)] rounded-lg shadow-lg py-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                {servicesContent?.services?.map((service, idx) => (
                  <Link
                    key={idx}
                    href={`/service?name=${service?.serviceName}`}
                    className="block px-4 py-2.5 hover:bg-[var(--pri)] hover:text-[var(--sec)] transition-colors"
                  >
                    <div className="text-sm font-semibold tracking-wide capitalize">
                      {underscoreToSpace(service.serviceName)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {eventsIsActive && (
              <Link
                href="/#events"
                className="font-inter hover:font-semibold text-[var(--pri)]"
              >
                Events
              </Link>
            )}

            {plansIsActive && (
              <Link
                href="/#plans"
                className="font-inter hover:font-semibold text-[var(--pri)]"
              >
                Plans
              </Link>
            )}

            <Link
              href="/#contact"
              className="font-inter hover:font-semibold text-[var(--pri)]"
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
                        className="w-full font-medium text-[16px] text-[var(--pri)]/70 hover:bg-[var(--pri)]/10 py-2 px-4 rounded-md  cursor-pointer flex justify-start items-center gap-2"
                      >
                        <UserRoundPen strokeWidth={1.5} />
                        Edit Profile
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
                <Button className="cursor-pointer hover:bg-transparent hover:text-[var(--pri)] border border-[var(--pri)] rounded-[10px] text-sm bg-[var(--pri)] px-6 w-fit inline-flex items-center gap-2 text-[var(--sec)]">
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
                {/* <div className="text-center min-w-fit text-white">
                              Hi, {auth.user?.firstName || auth.user?.emailId}
                            </div> */}
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
                        className="w-full font-medium text-[16px] text-[var(--pri)]/70 hover:bg-[var(--pri)]/10 py-2 px-4 rounded-md  cursor-pointer flex justify-start items-center gap-2"
                      >
                        <UserRoundPen strokeWidth={1.5} />
                        Edit Profile
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
                    "--sec": secondaryColor,
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
                        src={source?.media?.[0] || "/assets/spawell-logo.png"}
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
                      style={{ color: primaryColor }}
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#about-us"
                      className="px-4 py-3 font-inter hover:font-semibold"
                      style={{ color: primaryColor }}
                    >
                      About us
                    </Link>
                  </SheetClose>

                  {/* Services expandable submenu (mobile) */}
                  <div className="px-4 py-2 font-inter">
                    <button
                      type="button"
                      onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                      className="w-full flex items-center justify-between py-1 text-left hover:font-semibold"
                      style={{ color: primaryColor }}
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
                              href={`/service?name=${service?.serviceName}`}
                              className="block py-1.5 text-sm text-[#6B7280] hover:text-black capitalize"
                            >
                              {underscoreToSpace(service.serviceName)}
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
                      style={{ color: primaryColor }}
                    >
                      Events
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#plans"
                      className="px-4 py-3 font-inter hover:font-semibold"
                      style={{ color: primaryColor }}
                    >
                      Plans
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className="px-4 py-3 font-inter hover:font-semibold"
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
                        <Button className="rounded-[12px] text-sm px-5 w-full inline-flex items-center gap-2 bg-[var(--pri)] text-[var(--sec)]">
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

export default SpawellHeader;
