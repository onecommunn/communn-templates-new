"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Send, Facebook, Search, Instagram, Linkedin } from "lucide-react";
import React from "react";

const YoganaFooter = () => {
  return (
    <>
      <footer
        style={{
          backgroundImage: "url('/assets/yogana-footer-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative text-neutral-200"
      >
        {/* overlay decorative images */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <Image
            src="/assets/yogana-footer-bg-image-1.png"
            alt=""
            width={200}
            height={130}
            sizes="(max-width:1024px) 40vw, 33vw"
            className="absolute left-0 top-1/2 -translate-y-1/2 max-w-none hidden md:block"
            priority={false}
          />
          <Image
            src="/assets/yogana-footer-bg-image-2.png"
            alt=""
            width={285}
            height={344}
            className="absolute right-0 bottom-0 max-w-none"
            priority={false}
          />
        </div>

        {/* main */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
            {/* col 1: brand + newsletter */}
            <div className="lg:col-span-4">
              <Link
                href="/"
                aria-label="Go home"
                className="inline-flex items-center"
              >
                <img
                  src="/logo/yogana_Light_Logo.png"
                  alt="Yogana"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-6 text-neutral-300">
                Proin efficitur, mauris vel condimentum pulvinar, velit orci
                consectetur ligula.
              </p>

              {/* newsletter */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 flex items-stretch gap-2"
              >
                <div className="relative w-full">
                  <input
                    type="email"
                    placeholder="Enter Your E-mail"
                    className="h-12 w-full rounded-sm border border-white/10 bg-black/40 px-4 text-sm text-neutral-200 placeholder:text-neutral-400 outline-none focus:border-[#C2A74E]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="cursor-pointer absolute right-1 top-1 grid h-10 w-10 place-items-center rounded-sm bg-[#111] text-[#C2A74E] hover:opacity-90"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>

              {/* socials */}
              <div className="mt-5 flex items-center gap-4 text-neutral-300">
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-white"
                >
                  <Facebook size={18} />
                </Link>
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-white"
                >
                  <Instagram size={18} />
                </Link>
                <Link
                  href="#"
                  aria-label="Linkedin"
                  className="hover:text-white"
                >
                  <Linkedin size={18} />
                </Link>
              </div>
            </div>

            {/* col 2: links */}
            <div className="lg:col-span-2">
              <h4 className="font-cormorant text-2xl text-neutral-100">
                Links
              </h4>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* col 3: open hours */}
            <div className="lg:col-span-3">
              <h4 className="font-cormorant text-2xl text-neutral-100">
                Open Hours
              </h4>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex justify-between gap-4">
                  <span className="text-neutral-300">Monday to Friday :</span>
                  <span className="font-medium text-neutral-100">
                    09:00–20:00
                  </span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-neutral-300">Saturday:</span>
                  <span className="font-medium text-neutral-100">
                    09:00–18:00
                  </span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-neutral-300">Sunday:</span>
                  <span className="font-medium text-neutral-100">
                    09:00–18:00
                  </span>
                </li>
              </ul>
            </div>

            {/* col 4: contact */}
            <div className="lg:col-span-3">
              <h4 className="font-cormorant text-2xl text-neutral-100">
                Contact
              </h4>
              <ul className="mt-5 space-y-5 text-sm">
                <li className="text-neutral-300">
                  2972 Westheimer Rd. Santa Ana, Illinois
                </li>
                <li className="text-neutral-300">(907) 555–0101</li>
                <li>
                  <Link
                    href="mailto:yourmail@company.com"
                    className="underline hover:text-white"
                  >
                    yourmail@company.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* bottom bar */}
      <div className="relative z-10 border-t border-white/10 bg-[#141215]">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-neutral-400">
          © 2025 Yogana, All Rights Reserved
        </div>
      </div>
    </>
  );
};

export default YoganaFooter;
