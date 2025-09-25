"use client";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
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

interface ICreatorHeader {
  logoUrl: string;
  logoWidth: number;
  logoHight: number;
}

const CreatorHeader = ({ logoHight, logoUrl, logoWidth }: ICreatorHeader) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const authContext = useContext(AuthContext);
  const { communityId } = authContext;
  const [data, setData] = useState({});

  const fetchHeader = async () => {
    const responce = await fetchCreatorHeader(communityId);
    console.log(responce, "respnce headerd");
  };

  useEffect(() => {
    if (communityId) {
      fetchHeader();
    }
  }, [communityId]);

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
    <header className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={
                logoUrl ||
                "https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2F062e0f3cd667449793b24103817a0704"
              }
              alt="logo"
              width={logoWidth || 180}
              height={logoHight}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              About us
            </Link>

            {/* <Link href="/courses" className={linkClass("/courses")}>Courses</Link> */}
            <Link href="/plans" className={linkClass("/plans")}>
              Plans
            </Link>
            <Link href="/events" className={linkClass("/events")}>
              Events
            </Link>
            {/* <Link
              href="/appointments"
              className={linkClass("/appointments")}
            >
              Appointments
            </Link> */}
            {/* <Link href="/" className={linkClass("/")}>Blog</Link> */}
            <Link href="/contact" className={linkClass("/contact")}>
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center">
            {authContext.isAuthenticated ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="text-center font-medium min-w-fit">
                    Hi, {authContext.user?.firstName || authContext.user?.email}
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger className="cursor-pointer hover:bg-red-600 px-5 font-inter py-1.5 bg-black text-white rounded-[12px] text-sm w-fit">
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
                          onClick={() => {
                            handleLogout();
                          }}
                          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 cursor-pointer"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </>
            ) : (
              <>
                <Link href={"/login"}>
                  <Button className="rounded-[12px] text-sm pr-[20px] pl-[20px] w-fit">
                    Login{" "}
                    <span>
                      <ArrowRight />
                    </span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu (Sheet) */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <div
                  className="cursor-pointer"
                  aria-controls={"creator-mobile-menu"}
                >
                  <Menu className="h-6 w-6" />
                </div>
              </SheetTrigger>

              <SheetContent side="right" className="w-[85vw] sm:max-w-sm px-0">
                {/* Custom header inside sheet */}
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
                          logoUrl ||
                          "https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2F062e0f3cd667449793b24103817a0704"
                        }
                        alt="logo"
                        width={120}
                        height={logoHight}
                      />
                    </Link>

                    {/* <button aria-label="Close menu">
                      <X className="h-6 w-6" />
                    </button> */}
                  </div>
                </SheetHeader>

                {/* Nav list */}
                <nav className="flex flex-col space-y-1 py-2">
                  <SheetClose asChild>
                    <Link href="/" className={`px-4 py-3 ${linkClass("/")}`}>
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/about"
                      className={`px-4 py-3 ${linkClass("/about")}`}
                    >
                      About us
                    </Link>
                  </SheetClose>

                  {/* <SheetClose asChild>
                    <Link href="/courses" className={`px-4 py-3 ${linkClass("/courses")}`}>
                      Courses
                    </Link>
                  </SheetClose> */}
                  <SheetClose asChild>
                    <Link
                      href="/plans"
                      className={`px-4 py-3 ${linkClass("/plans")}`}
                    >
                      Plans
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/events"
                      className={`px-4 py-3 ${linkClass("/events")}`}
                    >
                      Events
                    </Link>
                  </SheetClose>
                  {/* <SheetClose asChild>
                    <Link
                      href="/appointments"
                      className={`px-4 py-3 ${linkClass("/appointments")}`}
                    >
                      Appointments
                    </Link>
                  </SheetClose> */}
                  {/* <SheetClose asChild>
                    <Link href="/" className={`px-4 py-3 ${linkClass("/")}`}>
                      Blog
                    </Link>
                  </SheetClose> */}
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className={`px-4 py-3 ${linkClass("/contact")}`}
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>

                {/* CTA pinned at bottom */}
                <div className="px-4 pt-2 pb-6">
                  <SheetClose asChild>
                    <Button className="rounded-[12px] text-sm pr-[20px] pl-[20px] w-full">
                      Book Us
                      <span className="ml-2">
                        <ArrowRight />
                      </span>
                    </Button>
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
