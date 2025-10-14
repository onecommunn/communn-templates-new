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
import { Header } from "@/models/templates/spawell/spawell-home-model";
import { logoutService } from "@/services/logoutService";
import { ArrowRight, Facebook, Linkedin, Menu, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useState } from "react";

const SpawellHeader = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: Header;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const auth = useContext(AuthContext);
  const { communityId } = auth;
  const source = data?.content;

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
      <div className="py-2  mx-auto px-4 sm:px-6 md:px-6 lg:px-20 bg-[var(--pri)] hidden md:flex md:flex-row items-center justify-between">
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
              className={"font-inter hover:font-semibold text-[var(--pri)]"}
            >
              Home
            </Link>
            <Link
              href="/#about-us"
              className={"font-inter hover:font-semibold text-[var(--pri)]"}
            >
              About us
            </Link>
            <Link
              href="/#services"
              className={"font-inter hover:font-semibold text-[var(--pri)]"}
            >
              Services
            </Link>
            <Link
              href="/#events"
              className={"font-inter hover:font-semibold text-[var(--pri)]"}
            >
              Events
            </Link>
            <Link
              href="/#plans"
              className={"font-inter hover:font-semibold text-[var(--pri)]"}
            >
              Plans
            </Link>
            <Link
              href="/#contact"
              className={"font-inter hover:font-semibold text-[var(--pri)]"}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA / Auth */}
          <div className="hidden md:flex md:items-center">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-center font-medium min-w-fit text-[var(--pri)]">
                  Hi, {auth.user?.firstName || auth.user?.email}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger className="cursor-pointer hover:bg-[#ba1c26] px-6 font-inter py-2 bg-[var(--pri)] text-[var(--sec)] rounded-[10px] text-sm w-fit">
                    Logout
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-inter">
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-[#ba1c26] text-[var(--sec)] px-6 py-2 rounded-md hover:bg-[#ba1c26] cursor-pointer"
                        style={{color:secondaryColor}}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <Link href="/login" aria-label="Login">
                <Button className="cursor-pointer hover:bg-transparent hover:text-[var(--pri)] border border-[var(--pri)] rounded-[10px] text-sm bg-[var(--pri)] px-6 w-fit inline-flex items-center gap-2">
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
                        src={"/assets/spawell-logo.png"}
                        alt="Logo"
                        className="w-25 h-15 object-contain"
                      />
                    </Link>
                  </div>
                </SheetHeader>

                {/* Nav list */}
                <nav
                  className="flex flex-col space-y-1 py-2"
                  aria-label="Mobile"
                >
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className={`px-4 py-3 font-inter hover:font-semibold`}
                      style={{ color: primaryColor }}
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#about-us"
                      className={`px-4 py-3 font-inter hover:font-semibold`}
                      style={{ color: primaryColor }}
                    >
                      About us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#services"
                      className={`px-4 py-3 font-inter hover:font-semibold`}
                      style={{ color: primaryColor }}
                    >
                      Services
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#events"
                      className={`px-4 py-3 font-inter hover:font-semibold`}
                      style={{ color: primaryColor }}
                    >
                      Events
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#plans"
                      className={`px-4 py-3 font-inter hover:font-semibold`}
                      style={{ color: primaryColor }}
                    >
                      Plans
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className={`px-4 py-3 font-inter hover:font-semibold`}
                      style={{ color: primaryColor }}
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

export default SpawellHeader;
