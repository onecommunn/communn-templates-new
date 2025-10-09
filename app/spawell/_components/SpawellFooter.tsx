"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const SpawellFooter: React.FC = () => {
  return (
    <footer className="bg-[#5D3222] text-white/90 font-plus-jakarta">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-[1fr_2fr]">
          {/* Brand + contacts */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src={"/assets/spawell-logo-light.png"}
                alt="logo"
                className="w-44 h-auto object-contain"
              />
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-white/70">Toll free customer care</p>
                <p className="mt-1 text-base font-medium">+1 (246) 333–0085</p>
              </div>
              <div>
                <p className="text-white/70">Need live support?</p>
                <p className="mt-1 text-base font-medium">support@domain.com</p>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="mb-3 text-sm text-white/70">Follow On</p>
              <div className="flex items-center gap-3">
                <Link
                  href="#"
                  aria-label="Pinterest"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white hover:bg-white/85 text-[#5D3222] transition"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white hover:bg-white/85 text-[#5D3222] transition"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white hover:bg-white/85 text-[#5D3222] transition"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:pl-8 md:border-l md:border-white/10">
            <div>
              <h4 className="text-sm font-semibold">Our Charity</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Services</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li>
                  <Link href="#" className="hover:text-white">
                    Healing Therapy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Herbal Body Scrub & Wrap
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Rejuvenating Facial Therapy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Signature Full-Body
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Support</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Term’s & Condition
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="bg-[#6E3C2B]">
        <div className="container mx-auto px-6 md:px-20 flex items-center justify-between">
          <div className="py-4 text-center text-xs text-white/80">
            Copyright © 2025 All Rights Reserved.
          </div>
          <div className="py-4 text-center text-xs text-white/80">
            Made with ❤️ by communn.io
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SpawellFooter;
