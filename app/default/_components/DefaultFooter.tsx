"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const PLATFORM_ICON: Record<string, string> = {
  instagram: "/assets/instagram-svg-icon.svg",
  facebook: "/assets/facebook-svg-icon.svg",
  twitter: "/assets/twitter-svg-icon.svg",
  youtube: "/assets/youtube-svg-icon.svg",
  linkedin:'/assets/linkedin-svg-icon.svg'
};

type DefaultFooterProps = {
  logo: string;
  name: string;
  socialLinks: any[];
  adminName?: string;
  fullAddress?: string;
  zipCode?: string;
};

const DefaultFooter = ({
  logo,
  name,
  socialLinks,
  adminName,
  fullAddress,
  zipCode,
}: DefaultFooterProps) => {
  const navLinks = ["Home", "Events", "Plans", "Courses", "Team", "Contact"];
  const bottomLinks = [
    "Privacy Policy",
    "Terms of Use",
    // "Sales and Refunds",
    // "Legal",
    // "Site Map",
  ];

  const normalize = (s?: string) => (s ?? "").trim();

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F3F4F6] pt-16 pb-8 px-4 font-montserrat text-[#4B5563]">
      <div className="container mx-auto max-w-7xl">
        {/* Top Section: Logo and Main Nav */}
        <div className="flex flex-col items-center text-center mb-16">
          <Image
            src={
              logo ??
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group 238944.svg"
            }
            alt="One Communn Logo"
            width={100}
            height={100}
            className="mb-4 overflow-hidden bg-white p-4 rounded-[20px] shadow-md"
            unoptimized
          />
          <h2 className="text-xl md:text-3xl font-bold text-[#1c2120] mb-1">
            {name}
          </h2>
          <p className="text-sm text-gray-400 mb-8 font-medium">
            By {adminName}
          </p>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold text-gray-700">
            {navLinks?.map((link) => (
              <Link
                key={link}
                href={`#${link?.toLowerCase()}`}
                className="hover:text-blue-600 transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>

        {/* Middle Section: Built With & Follow Us */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-end mb-6 gap-8">
          <div className="text-center">
            <h4 className="font-bold text-black mb-2 text-base">Built with</h4>
            <div className="flex items-center gap-2">
              {/* Replace with your actual small horizontal logo path */}
              <Image
                src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group 238944.svg"
                alt="Logo"
                width={24}
                height={24}
              />
              <span className="tracking-tight font-quattrocento font-bold text-2xl">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90.13deg, #2952A2 1.48%, #50A1CA 13.11%, #3B9B7F 24.92%)",
                  }}
                >
                  one
                </span>{" "}
                <span className="text-[#2952A2]">c</span>
                <span className="text-[#50A1CA]">o</span>
                <span className="text-[#3B9B7F]">m</span>
                <span className="text-[#227727]">m</span>
                <span className="text-[#7FC41B]">u</span>
                <span className="text-[#FE7F06]">n</span>
                <span className="text-[#DA0242]">n</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-bold text-black mb-4">Follow us</h4>
            <div className="flex gap-3">
              {socialLinks?.map((each: any, idx) => {
                const key = normalize(each.type).toLowerCase();
                const Icon = PLATFORM_ICON[key];
                const url = each.value;
                if (!url) return null;
                return (
                  <Link
                    href={url ?? "/"}
                    key={idx}
                    target="_blank"
                    className="cursor-pointer"
                  >
                    <img src={Icon} alt="key" className="w-10 h-10 object-cover"/>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <hr className="border-gray-300 mb-8" />

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium">
          <p>© {year} All Rights Reserved</p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {bottomLinks?.map((link) => (
              <Link key={link} href="/" className="hover:underline">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DefaultFooter;
