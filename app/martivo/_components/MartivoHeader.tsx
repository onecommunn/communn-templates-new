"use client";
import { AuthContext } from "@/contexts/Auth.context";
import Link from "next/link";
import React, { useContext, useState } from "react";
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
import { logoutService } from "@/services/logoutService";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Header,
  ServiceSection,
} from "@/models/templates/martivo/martivo-home-model";
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

const MartivoHeader = ({
  primaryColor,
  secondaryColor,
  data,
  eventsIsActive,
  plansIsActive,
  servicesData,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: Header;
  servicesData: ServiceSection;
  plansIsActive: boolean;
  eventsIsActive: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const auth = useContext(AuthContext);

  const content = data?.content;
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
      console.error("Logout failed");
    }
  };

  return (
    <header
      className="sticky font-lato top-0 z-50 backdrop-blur bg-[var(--pri)]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={content?.media?.[0] || "/assets/martivoLogo.png"}
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
              className="font-lato hover:font-semibold text-white text-sm"
            >
              HOME
            </Link>

            <Link
              href="/#about-us"
              className="font-lato hover:font-semibold text-white text-sm"
            >
              ABOUT
            </Link>

            {/* SERVICES DROPDOWN */}
            <div className="relative group cursor-pointer">
              <button
                type="button"
                className="font-lato hover:font-semibold text-white text-sm inline-flex items-center gap-1"
              >
                SERVICES
                <ChevronDown className="h-4 w-4 mt-[1px]" />
              </button>

              <div
                className="absolute left-0 mt-3 w-72 bg-white text-[#0A2640] rounded-lg shadow-lg py-2 
                              opacity-0 invisible translate-y-1 
                              group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
                              transition-all duration-200 ease-out z-50"
              >
                {servicesContent?.services?.map((service, idx) => (
                  <Link
                    key={idx}
                    href={`/service?name=${service?.serviceName}`}
                    className="block px-4 py-2.5 hover:bg-[#0A2640] hover:text-white transition-colors"
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
                className="font-lato hover:font-semibold text-white text-sm"
              >
                EVENTS
              </Link>
            )}
            {plansIsActive && (
              <Link
                href="/#plans"
                className="font-lato hover:font-semibold text-white text-sm"
              >
                PLANS
              </Link>
            )}

            <Link
              href="/#contact"
              className="font-lato hover:font-semibold text-white text-sm"
            >
              CONTACT
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-center min-w-fit text-white">
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
              <Link href="/login" aria-label="Login">
                <Button className="cursor-pointer bg-white hover:bg-transparent hover:text-white text-[#0A2640] border border-white rounded-[10px] text-sm px-6 inline-flex items-center gap-2">
                  Login <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>

          {/* MOBILE MENU */}
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
                        onClick={() => setMobilePopoverOpen(false)}
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
            )}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button className="cursor-pointer p-2">
                  <Menu className="h-6 w-6 text-[var(--sec)]" />
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
                {/* Header */}
                <SheetHeader className="px-4 pb-2">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <img
                    src={"/assets/martivoLogo-light.png"}
                    alt="Logo"
                    className="w-32 object-contain"
                  />
                </SheetHeader>

                {/* MOBILE NAV */}
                <nav className="flex flex-col space-y-1 py-2">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="px-4 py-3 font-lato text-[#0A2640]"
                    >
                      Home
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/#about-us"
                      className="px-4 py-3 font-lato text-[#0A2640]"
                    >
                      About
                    </Link>
                  </SheetClose>

                  {/* SERVICES EXPANDABLE SUBMENU */}
                  <div className="px-4 py-2 font-lato">
                    <button
                      onClick={() =>
                        setIsMobileServicesOpen(!isMobileServicesOpen)
                      }
                      className="w-full flex items-center justify-between text-[#0A2640]"
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isMobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isMobileServicesOpen && (
                      <div className="mt-1 ml-3 space-y-1">
                        {servicesContent?.services?.map((service, idx) => (
                          <SheetClose asChild key={idx}>
                            <Link
                              href={`/service?name=${service?.serviceName}`}
                              className="block py-1.5 text-sm text-[#525252] hover:text-black capitalize"
                            >
                              {underscoreToSpace(service.serviceName)}
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
                        className="px-4 py-3 font-lato text-[#0A2640]"
                      >
                        Events
                      </Link>
                    </SheetClose>
                  )}

                  {plansIsActive && (
                    <SheetClose asChild>
                      <Link
                        href="/#plans"
                        className="px-4 py-3 font-lato text-[#0A2640]"
                      >
                        Plans
                      </Link>
                    </SheetClose>
                  )}

                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className="px-4 py-3 font-lato text-[#0A2640]"
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>

                {/* CTA pinned bottom */}
                <div className="px-4 pt-2 pb-6">
                  <SheetClose asChild>
                    {!auth.isAuthenticated && (
                      <Link href="/login" className="w-full">
                        <Button className="rounded-[12px] text-sm px-5 w-full inline-flex items-center gap-2 bg-[var(--sec)] text-[var(--pri)]">
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

export default MartivoHeader;
