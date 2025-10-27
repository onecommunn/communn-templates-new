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
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/Auth.context";
import { logoutService } from "@/services/logoutService";

const RestraintHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <header className="font-sora top-0 z-50 backdrop-blur bg-[#3D493A]">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={"/assets/restraint-logo.png"}
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
              className={"font-sora hover:font-semibold text-white text-sm"}
            >
              Home
            </Link>
            <Link
              href="/#about-us"
              className={"font-sora hover:font-semibold text-white text-sm"}
            >
              About us
            </Link>
            <Link
              href="/#services"
              className={"font-sora hover:font-semibold text-white text-sm"}
            >
              Services
            </Link>
            <Link
              href="/#events"
              className={"font-sora hover:font-semibold text-white text-sm"}
            >
              Events
            </Link>
            <Link
              href="/#plans"
              className={"font-sora hover:font-semibold text-white text-sm"}
            >
              Plans
            </Link>
            <Link
              href="/#contact"
              className={"font-sora hover:font-semibold text-white text-sm"}
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
                  <AlertDialogTrigger className="cursor-pointer hover:bg-[#ba1c26] px-6 font-semibold font-sora py-2 bg-white text-[#0A2640] rounded-[10px] text-sm w-fit">
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
                        className="bg-[#ba1c26] text-[var(--sec)] px-6 py-2 rounded-md hover:bg-[#ba1c26] cursor-pointer"
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
                        src={"/assets/restraint-logo.png"}
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
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#about-us"
                      className={`px-4 py-3 font-inter hover:font-semibold`}
                    >
                      About us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#services"
                      className={`px-4 py-3 font-inter hover:font-semibold`}
                    >
                      Services
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#events"
                      className={`px-4 py-3 font-inter hover:font-semibold`}
                    >
                      Events
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#plans"
                      className={`px-4 py-3 font-inter hover:font-semibold`}
                    >
                      Plans
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className={`px-4 py-3 font-inter hover:font-semibold`}
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
