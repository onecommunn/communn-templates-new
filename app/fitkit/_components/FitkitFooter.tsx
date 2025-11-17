import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FitkitFooter = () => {
  return (
    <footer>
      {" "}
      <div
        className="relative mx-auto container px-6 md:px-20 bg-black font-archivo h-full object-center object-cover py-10 md:py-16 min-h-[500px] flex flex-c items-center justify-center"
        style={{
          backgroundImage: "url('/assets/fitkit-footer-bg-image-2.png')",
        }}
      >
        <Image
          src="/assets/fitkit-footer-bg-image-1.png"
          alt="fitkit-footer-bg-image-1"
          className="absolute top-10 right-0 hidden md:flex"
          width={129}
          height={367}
        />
        <div className="flex flex-col items-center justify-center gap-6 md:gap-10">
          <div>
            <Image
              src={"/assets/fitkit-logo.svg"}
              alt="logo"
              width={175}
              height={50}
            />
          </div>
          <p className="text-center text-[#AFB8C7] text-sm md:text-[16px] max-w-3xl">
            Treadmills, stationary bikes, and elliptical machines are commonly
            used for cardiovascular workouts, helping to improve endurance, burn
            calories, and enhance heart health.
          </p>
          <div className="border-y border-y-[#1D2229] grid grid-cols-4  md:grid-cols-6">
            <Link
              href={"/"}
              className="font-medium text-[#AFB8C7] text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              Home
            </Link>
            <Link
              href={"/"}
              className="font-medium text-[#AFB8C7] text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              About us
            </Link>
            <Link
              href={"/"}
              className="font-medium text-[#AFB8C7] text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              Services
            </Link>
            <Link
              href={"/"}
              className="font-medium text-[#AFB8C7] text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              Events
            </Link>
            <Link
              href={"/"}
              className="font-medium text-[#AFB8C7] text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              Plans
            </Link>
            <Link
              href={"/"}
              className="font-medium text-[#AFB8C7] text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={"/"}
              className="flex items-center justify-center p-2 border border-[#6B7586] rounded-full bg-[#1D2229]"
            >
              <Facebook color="#AFB8C7" size={18} />
            </Link>
            <Link
              href={"/"}
              className="flex items-center justify-center p-2 border border-[#6B7586] rounded-full bg-[#1D2229]"
            >
              <Twitter color="#AFB8C7" size={18} />
            </Link>
            <Link
              href={"/"}
              className="flex items-center justify-center p-2 border border-[#6B7586] rounded-full bg-[#1D2229]"
            >
              <Instagram color="#AFB8C7" size={18} />
            </Link>
            <Link
              href={"/"}
              className="flex items-center justify-center p-2 border border-[#6B7586] rounded-full bg-[#1D2229]"
            >
              <Linkedin color="#AFB8C7" size={18} />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-h-100 bg-[#1D2229] text-white text-[16px] font-archivo flex md:flex-row flex-col gap-4 items-center justify-between px-6 md:px-20 py-6">
        <p>Copyright 2024  Fitkit. All Rights Reserved.</p>
        <p>Made with ❤️ by communn.io</p>
      </div>
    </footer>
  );
};

export default FitkitFooter;
