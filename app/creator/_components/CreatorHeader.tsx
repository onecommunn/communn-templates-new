"use client";

import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/Auth.context";
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
import { fetchCreatorHeader } from "@/services/creatorService";
import type {
  CreatorHeaderPage,
  HeaderButton,
  HeaderSection,
} from "@/models/templates/creator/creator-header.model";

type Props = {
  /** Optional: pass pre-fetched section from layout for best UX */
  section?: HeaderSection;
  /** Optional: override logo size if you need to constrain it */
  logoWidth?: number;
  logoHeight?: number;
  primaryColor: string;
  secondaryColor: string;
};

const FALLBACK_LOGO =
  "https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2F062e0f3cd667449793b24103817a0704";

const CreatorHeader: React.FC<Props> = ({
  section,
  logoWidth = 180,
  logoHeight = 100,
  primaryColor,
  secondaryColor,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const auth = useContext(AuthContext);
  const { communityId } = auth;

  // Local state only used if `section` prop isn't passed
  const [pageData, setPageData] = useState<CreatorHeaderPage | null>(null);

  useEffect(() => {
    if (section) return; // already provided by parent
    if (!communityId) return;

    let mounted = true;
    (async () => {
      try {
        const res = await fetchCreatorHeader(communityId);
        if (!mounted) return;
        setPageData(res?.data ?? null);
      } catch (e) {
        console.error("Failed to fetch header", e);
        if (!mounted) setPageData(null);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [communityId, section]);

  const effectiveSection: HeaderSection | undefined = useMemo(() => {
    if (section) return section;
    return pageData?.sections?.[0];
  }, [section, pageData]);

  const logoSrc = effectiveSection?.media?.[0] || FALLBACK_LOGO;
  const buttons: HeaderButton[] = effectiveSection?.buttons ?? [];

  const linkClass = (href: string) =>
    `text-black font-inter ${
      pathname === href ? "underline" : "hover:underline"
    }`;

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
      className="sticky top-0 z-50 bg-white"
      style={{ backgroundColor: primaryColor, color: secondaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            aria-label="Go home"
          >
            <img
              src={logoSrc}
              alt="Logo"
              width={logoWidth}
              height={logoHeight}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            style={{ color: secondaryColor }}
            aria-label="Primary"
          >
            {buttons.map((btn, idx) => (
              <Link
                key={`${btn.label}-${idx}`}
                href={btn.url}
                className={linkClass(btn.url)}
                style={{ color: secondaryColor }}
              >
                {btn.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA / Auth */}
          <div className="hidden md:flex md:items-center">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-center font-medium min-w-fit">
                  Hi, {auth.user?.firstName || auth.user?.email}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger
                    style={{
                      backgroundColor: secondaryColor,
                      color: primaryColor,
                    }}
                    className="cursor-pointer hover:bg-red-600 px-5 font-inter py-1.5 bg-black text-white rounded-[12px] text-sm w-fit"
                  >
                    Logout
                  </AlertDialogTrigger>
                  <AlertDialogContent style={{ backgroundColor: primaryColor }}>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-inter">
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        className="border"
                        style={{
                          borderColor: secondaryColor,
                          color: secondaryColor,
                          backgroundColor:"transparent"
                        }}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 cursor-pointer"
                        style={{
                          backgroundColor: secondaryColor,
                          color: primaryColor,
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <Link href="/login" aria-label="Login">
                <Button
                  style={{
                    backgroundColor: secondaryColor,
                    color: primaryColor,
                  }}
                  className="cursor-pointer rounded-[12px] text-sm !px-6 w-fit inline-flex items-center gap-2"
                >
                  Login <ArrowRight className="h-4 w-4" />
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
                        src={logoSrc}
                        alt="Logo"
                        width={120}
                        height={logoHeight}
                      />
                    </Link>
                  </div>
                </SheetHeader>

                {/* Nav list */}
                <nav
                  className="flex flex-col space-y-1 py-2"
                  aria-label="Mobile"
                >
                  {buttons.map((btn, idx) => (
                    <SheetClose asChild key={`${btn.label}-${idx}`}>
                      <Link
                        href={btn.url}
                        className={`px-4 py-3 ${linkClass(btn.url)}`}
                      >
                        {btn.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* CTA pinned at bottom */}
                <div className="px-4 pt-2 pb-6">
                  <SheetClose asChild>
                    {auth.isAuthenticated ? (
                      <Button
                        onClick={handleLogout}
                        className="rounded-[12px] text-sm px-5 w-full bg-red-500 hover:bg-red-600"
                      >
                        Logout
                      </Button>
                    ) : (
                      <Link href="/login" className="w-full">
                        <Button
                          style={{
                            backgroundColor: secondaryColor,
                            color: primaryColor,
                          }}
                          className="rounded-[12px] text-sm px-5 w-full inline-flex items-center gap-2"
                        >
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

export default CreatorHeader;
