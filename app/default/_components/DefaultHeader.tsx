"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { LogOut, Menu, UserRoundPen, Wallet } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthContext } from "@/contexts/Auth.context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

type DefaultHeaderProps = {
  name: string;
  logo: string;
};

const DefaultHeader = ({ logo, name }: DefaultHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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
    <header className="sticky font-montserrat top-0 z-50 backdrop-blur bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 md:px-20">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-[30px] shrink-0 md:h-[40px] w-[30px] md:w-[40px] rounded-full overflow-hidden">
              <Image
                src={
                  logo ??
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group 238944.svg"
                }
                alt="Logo"
                width={48}
                height={48}
                unoptimized
                priority
              />
            </div>
            <span className="text-[#1E4D91] font-bold md:text-lg text-sm">
              {name}
            </span>
          </Link>

          {/* Desktop Login */}
          <div className="hidden md:flex items-center">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-center min-w-fit text-black font-medium">
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
                  <PopoverContent className="w-72 mt-1 rounded-md p-2 mr-4">
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
                        <AlertDialogTrigger className="flex items-center gap-2 cursor-pointer text-[var(--pri)]/70 hover:text-[#df2431] px-4 font-semibold py-2 bg-white rounded-[10px] text-sm w-full">
                          <LogOut strokeWidth={1.5} />
                          Logout
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-montserrat">
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
              <Link
                href="/login"
                className="bg-[#1A1A1A] text-white px-8 py-2 rounded-full font-semibold hover:bg-black hover:scale-105 transition-transform"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Login (outside sheet) */}
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-2">
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
                  <PopoverContent className="w-72 mt-1 rounded-md p-2 mr-4">
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
                        <AlertDialogTrigger className="flex items-center gap-2 cursor-pointer text-[var(--pri)]/70 hover:text-[#df2431] px-4 font-semibold py-2 bg-white rounded-[10px] text-sm w-full">
                          <LogOut strokeWidth={1.5} />
                          Logout
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-montserrat">
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
              <Link
                href="/login"
                className="bg-[#1A1A1A] text-white px-8 py-2 rounded-full font-semibold hover:bg-black hover:scale-105 transition-transform"
              >
                Log in
              </Link>
            )}

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
                    <Link
                      href="/#home"
                      className="px-4 py-3 hover:font-semibold"
                    >
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
