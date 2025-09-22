"use client"

import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/Auth.context";
import { logoutService } from "@/services/logoutService";
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
import { usePathname } from "next/navigation";

const YuvaaHeader = ({
  logoUrl,
  logoWidth,
  logoHight,
  backgroundColor,
  textColor,
  buttonBackgroundColor,
  buttonTextColor,
  buttonText,
}: {
  logoUrl: string;
  logoWidth: number;
  logoHight: number;
  backgroundColor: string;
  textColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  buttonText: string;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const [mounted, setMounted] = useState(false);

  // Log context value changes
  useEffect(() => {
    // console.log('YuvaaHeader - AuthContext Update:', {
    //   user: authContext.user,
    //   isAuthenticated: authContext.isAuthenticated,
    //   loading: authContext.loading
    // });
  }, [authContext.user, authContext.isAuthenticated, authContext.loading]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  // Show a loading state until everything is ready
  if (!mounted || authContext.loading) {
    // console.log('YuvaaHeader - Loading State:', {
    //   mounted,
    //   loading: authContext.loading,
    //   user: authContext.user ? 'User exists' : 'No user',
    //   isAuthenticated: authContext.isAuthenticated
    // });

    return (
      <header
        className="py-4 px-4 lg:px-20 md:px-8 bg-white sticky top-0 z-50 shadow-sm text-black"
        style={{ backgroundColor: backgroundColor, color: textColor }}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/home" className="flex items-center space-x-2">
              <div className="font-bold flex items-center">
                <img
                  src={logoUrl}
                  alt={"logo"}
                  width={logoWidth}
                  height={logoHight}
                />
              </div>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // console.log('YuvaaHeader - Final State:', {
  //   user: authContext.user,
  //   isAuthenticated: authContext.isAuthenticated,
  //   loading: authContext.loading,
  //   mounted
  // });

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
      className="py-4 px-4 lg:px-20 md:px-8 bg-white sticky top-0 z-50 shadow-sm text-black"
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-bold flex items-center">
              <img
                src={logoUrl}
                alt={"logo"}
                width={logoWidth}
                height={logoHight}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              style={
                {
                  "--hover-underline": buttonBackgroundColor,
                } as React.CSSProperties
              }
              className={`relative font-medium text-black transition-colors duration-300
             after:content-[''] after:absolute after:left-0 after:-bottom-1
             after:h-[2px] after:w-0 hover:after:w-full
             after:transition-all after:duration-300
             after:bg-[var(--hover-underline)]
             hover:text-[var(--hover-underline)]
             ${isActive("/") ? "text-[var(--hover-underline)] after:w-full" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              style={
                {
                  "--hover-underline": buttonBackgroundColor,
                } as React.CSSProperties
              }
              className={`relative font-medium text-black transition-colors duration-300
             after:content-[''] after:absolute after:left-0 after:-bottom-1
             after:h-[2px] after:w-0 hover:after:w-full
             after:transition-all after:duration-300
             after:bg-[var(--hover-underline)]
             hover:text-[var(--hover-underline)]
             ${isActive("/about") ? "text-[var(--hover-underline)] after:w-full" : ""}`}
            >
              About
            </Link>
            <Link
              href="/courses"
              style={
                {
                  "--hover-underline": buttonBackgroundColor,
                } as React.CSSProperties
              }
              className={`relative font-medium text-black transition-colors duration-300
             after:content-[''] after:absolute after:left-0 after:-bottom-1
             after:h-[2px] after:w-0 hover:after:w-full
             after:transition-all after:duration-300
             after:bg-[var(--hover-underline)]
             hover:text-[var(--hover-underline)] ${isActive("/courses") ? "text-[var(--hover-underline)] after:w-full" : ""}`}
            >
              Courses
            </Link>
            <Link
              href="/events"
              style={
                {
                  "--hover-underline": buttonBackgroundColor,
                } as React.CSSProperties
              }
              className={`relative font-medium text-black transition-colors duration-300
             after:content-[''] after:absolute after:left-0 after:-bottom-1
             after:h-[2px] after:w-0 hover:after:w-full
             after:transition-all after:duration-300
             after:bg-[var(--hover-underline)]
             hover:text-[var(--hover-underline)] ${isActive("/events") ? "text-[var(--hover-underline)] after:w-full" : ""}`}
            >
              Events
            </Link>
            <Link
              href="/pricing"
              style={
                {
                  "--hover-underline": buttonBackgroundColor,
                } as React.CSSProperties
              }
              className={`relative font-medium text-black transition-colors duration-300
             after:content-[''] after:absolute after:left-0 after:-bottom-1
             after:h-[2px] after:w-0 hover:after:w-full
             after:transition-all after:duration-300
             after:bg-[var(--hover-underline)]
             hover:text-[var(--hover-underline)] ${isActive("/pricing") ? "text-[var(--hover-underline)] after:w-full" : ""}`}
            >
              Plans
            </Link>
            <Link
              href="/contact"
              style={
                {
                  "--hover-underline": buttonBackgroundColor,
                } as React.CSSProperties
              }
              className={`relative font-medium text-black transition-colors duration-300
             after:content-[''] after:absolute after:left-0 after:-bottom-1
             after:h-[2px] after:w-0 hover:after:w-full
             after:transition-all after:duration-300
             after:bg-[var(--hover-underline)]
             hover:text-[var(--hover-underline)] ${isActive("/contact") ? "text-[var(--hover-underline)] after:w-full" : ""}`}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex">
            {authContext.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-center font-medium min-w-fit">
                  Hi, {authContext.user?.firstName || authContext.user?.email}
                </div>
                {/* <button
                  onClick={() => {
                    const confirmLogout = window.confirm(
                      "Are you sure you want to logout?"
                    );
                    if (confirmLogout) {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="bg-red-500 text-white px-6 py-2 w-full rounded-md hover:bg-red-600 cursor-pointer"
                  style={{
                    backgroundColor: buttonBackgroundColor,
                    color: buttonTextColor,
                  }}
                >
                  Logout
                </button> */}
                <AlertDialog>
                  <AlertDialogTrigger
                    style={{
                      backgroundColor: buttonBackgroundColor,
                      color: buttonTextColor,
                    }}
                    className="bg-red-500 text-white px-6 py-2 w-full rounded-md hover:bg-red-600 cursor-pointer"
                  >
                    Logout
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        style={{
                          backgroundColor: buttonBackgroundColor,
                          color: buttonTextColor,
                        }}
                        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 cursor-pointer"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <button
                  style={{
                    backgroundColor: buttonBackgroundColor,
                    color: buttonTextColor,
                  }}
                  className="rounded-md px-6 py-2 w-full cursor-pointer"
                >
                  {buttonText}
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/features"
                className="font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="pt-4 space-y-2">
                {authContext.isAuthenticated ? (
                  <>
                    <div className="text-center font-medium">
                      Hi,{" "}
                      {authContext.user?.firstName || authContext.user?.email}
                    </div>
                    <button
                      onClick={() => {
                        if (authContext.logout) {
                          authContext.logout();
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="bg-red-500 text-white cursor-pointer px-6 py-2 w-full rounded-md hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button
                      style={{
                        backgroundColor: buttonBackgroundColor,
                        color: buttonTextColor,
                      }}
                      className="rounded-md px-6 py-2 w-full cursor-pointer"
                    >
                      {buttonText}
                    </button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default YuvaaHeader;
