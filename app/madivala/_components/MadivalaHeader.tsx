"use client";
import Link from "next/link";
import Image from "next/image";
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
    LogOut,
    Menu,
    UserRoundPen,
    Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/Auth.context";
import { logoutService } from "@/services/logoutService";
import {
    Header,
    ServiceSection,
} from "@/models/templates/restraint/restraint-home-model";
import {
    toSnakeCase,
    underscoreToSpace,
} from "@/utils/StringFunctions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
type DefaultHeaderProps = {
    name: string;
    logo: string;
    primaryColor: string;

};

const MadivalaHeader = ({ logo, name, primaryColor }: DefaultHeaderProps) => {

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
    // console.log(name, "name");

    return (
        <header
            className="sticky top-0 z-50 backdrop-blur bg-[#ffffff]"

        >
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between h-16">
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
                        <span className="text-[#1F514C] font-hedvig font-bold md:text-lg text-xs truncate max-w-[150px] md:max-w-[600px] block">
                            {name}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav
                        className="hidden md:flex items-center space-x-8"
                        aria-label="Primary"
                    >
                        <Link
                            href="/"
                            className="font-inter hover:font-semibold text-[#000000] text-[16px] font-[500]"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="font-inter hover:font-semibold text-[#000000] text-[16px] font-[500]"
                        >
                            About us
                        </Link>
                        <Link
                            href="/team"
                            className="font-inter hover:font-semibold text-[#000000] text-[16px] font-[500]"
                        >
                            Team
                        </Link>

                        <Link
                            href="/#about-us"
                            className="font-inter hover:font-semibold text-[#000000] text-[16px] font-[500]"
                        >
                            Events
                        </Link>

                        <Link
                            href="/#about-us"
                            className="font-inter hover:font-semibold text-[#000000] text-[16px] font-[500]"
                        >
                            Infrastructure
                        </Link>

                        <Link
                            href="/#about-us"
                            className="font-inter hover:font-semibold text-[#000000] text-[16px] font-[500]"
                        >
                            News
                        </Link>


                        {/* {eventsisActive && (
                            <Link
                                href="/#events"
                                className="font-sora hover:font-semibold text-white text-sm"
                            >
                                Events
                            </Link>
                        )} */}

                        {/* {plansisActive && (
                            <Link
                                href="/#plans"
                                className="font-sora hover:font-semibold text-white text-sm"
                            >
                                Plans
                            </Link>
                        )} */}

                        <Link
                            href="/#contact"
                            className="font-inter hover:font-semibold text-[#000000] text-[16px] font-[500]"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Desktop CTA / Auth */}
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
                                    // style={
                                    //     {
                                    //         "--pri": primaryColor,
                                    //         "--sec": secondaryColor,
                                    //     } as React.CSSProperties
                                    // }
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
                            <Link href="/join-member" aria-label="Login">
                                <Button className="p-[22px] font-[500px] font-inter cursor-pointer bg-[#1F514C] hover:bg-[#1F514C] hover:text-white text-[#ffffff] border border-white rounded-[30px] text-sm px-6 w-fit inline-flex items-center gap-2">
                                    Join Membership
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffffff] text-[#163f3c] transition group-hover:translate-x-0.5">
                                        <ArrowRight className="h-4 w-4" color="#163f3c" />
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
                                    // style={
                                    //     {
                                    //         "--pri": primaryColor,
                                    //         "--sec": secondaryColor,
                                    //     } as React.CSSProperties
                                    // }
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
                                    className="cursor-pointer p-2 text-white"
                                    aria-controls="creator-mobile-menu"
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-6 w-6" />
                                </button>
                            </SheetTrigger>

                            <SheetContent side="right" className="w-[85vw] sm:max-w-sm px-0">
                                {/* Header inside sheet */}
                                <SheetHeader className="px-4 pb-2">
                                    {/* <div className="flex items-center justify-between">
                                        <SheetTitle className="sr-only">Menu</SheetTitle>
                                        <Link
                                            href="/"
                                            aria-label="Go home"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center space-x-2"
                                        >
                                            <img
                                                src={
                                                    content?.media?.[0] ?? "/assets/restraint-logo.png"
                                                }
                                                alt="Logo"
                                                className="w-25 h-15 object-contain"
                                            />
                                        </Link>
                                    </div> */}
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
                                        >
                                            Home
                                        </Link>
                                    </SheetClose>

                                    <SheetClose asChild>
                                        <Link
                                            href="/#about-us"
                                            className="px-4 py-3 font-inter hover:font-semibold"
                                        >
                                            About us
                                        </Link>
                                    </SheetClose>

                                    {/* Services with expandable submenu (mobile) */}
                                    <div className="px-4 py-2 font-inter">
                                        <button
                                            type="button"
                                            onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                                            className="w-full flex items-center justify-between py-1 text-left hover:font-semibold"
                                        >
                                            <span>Services</span>
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {isMobileServicesOpen && (
                                            <div className="mt-1 pl-3 space-y-1">
                                                {/* {servicesContent?.services?.map((service, idx) => (
                                                    <SheetClose asChild key={idx}>
                                                        <Link
                                                            href={`/service?name=${service?.serviceName}`}
                                                            className="block py-1.5 text-sm text-[#6B7280] hover:text-black capitalize"
                                                        >
                                                            {underscoreToSpace(service.serviceName)}
                                                        </Link>
                                                    </SheetClose>
                                                ))} */}
                                            </div>
                                        )}
                                    </div>

                                    {/* {eventsisActive && (
                                        <SheetClose asChild>
                                            <Link
                                                href="/#events"
                                                className="px-4 py-3 font-inter hover:font-semibold"
                                            >
                                                Events
                                            </Link>
                                        </SheetClose>
                                    )}
                                    {plansisActive && (
                                        <SheetClose asChild>
                                            <Link
                                                href="/#plans"
                                                className="px-4 py-3 font-inter hover:font-semibold"
                                            >
                                                Plans
                                            </Link>
                                        </SheetClose>
                                    )} */}

                                    <SheetClose asChild>
                                        <Link
                                            href="/#contact"
                                            className="px-4 py-3 font-inter hover:font-semibold"
                                        >
                                            Contact
                                        </Link>
                                    </SheetClose>
                                </nav>

                                {/* CTA pinned at bottom */}
                                <div className="px-4 pt-2 pb-6">
                                    <SheetClose asChild>
                                        {!auth.isAuthenticated && (
                                            <Link href="/join-member" className="w-full">
                                                <Button className="rounded-[12px] text-sm px-5 w-full inline-flex items-center gap-2">
                                                    Join MemberShip <ArrowRight className="h-4 w-4" />
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

export default MadivalaHeader;
