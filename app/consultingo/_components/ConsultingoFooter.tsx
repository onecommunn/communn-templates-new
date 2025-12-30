import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const ConsultingoFooter = () => {
  return (
    <footer className="bg-[#fcf6e8] relative font-lexend overflow-hidden px-4 md:px-20 py-8 md:py-12">
      <div className="bg-white rounded-[60px] md:rounded-full px-10 py-14 md:p-32 grid gap-12 grid-cols-1 md:grid-cols-3 z-30 relative">
        {/* Left Section: Branding & Newsletter */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            <Link href="/">
              <img
                src={
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link - home.svg"
                }
                alt="logo"
                className="w-32 h-15 object-contain"
              />
            </Link>
            <p className="text-[#6b4f3a] text-sm md:text-[16px] leading-relaxed mb-8">
              Explore our comprehensive consultancy services designed to empower
              your business growth towards sustainable success.
            </p>
          </div>

          <p className="text-sm md:text-[16px] text-[#6b4f3a]">
            Powered by{" "}
            <Link href={'https://communn.io/'} className="text-[#b3523e] font-semibold cursor-pointer">
              communn.io
            </Link>
          </p>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="flex flex-col gap-4 text-[#6b4f3a] font-normal text-[16px]">
          <Link href="/" className="hover:text-[#b3523e]">
            Home
          </Link>
          <Link href="/about-us" className="hover:text-[#b3523e]">
            About us
          </Link>
          <Link href="/" className="hover:text-[#b3523e]">
            Services
          </Link>
          <Link href="/events" className="hover:text-[#b3523e]">
            Events
          </Link>
          <Link href="/plans" className="hover:text-[#b3523e]">
            Plans
          </Link>
          <Link href="/contact" className="hover:text-[#b3523e]">
            Contact
          </Link>
        </div>

        {/* Right Section: Legal & Socials */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4 text-[#6b4f3a]">
            <a href="#" className="hover:text-[#b3523e] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#b3523e] transition-colors">
              Licenses
            </a>
            <a href="#" className="hover:text-[#b3523e] transition-colors">
              Terms and conditions
            </a>
            <a href="#" className="hover:text-[#b3523e] transition-colors">
              Refund policy
            </a>
          </div>
          <div className="flex gap-4 mt-10 md:mt-0">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaInstagram />} />
            <SocialIcon icon={<FaXTwitter />} />
          </div>
        </div>

      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-10 h-10 bg-[#3d2314] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#b3523e] transition-all">
    {icon}
  </div>
);

export default ConsultingoFooter;
