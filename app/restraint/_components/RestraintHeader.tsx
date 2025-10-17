"use client";
import React from "react";
import Link from "next/link";
import { Header } from "@/models/templates/restraint/restraint-home-model";

const RestraintHeader = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: Header;
}) => {
  const src = data?.content?.media?.[0] ?? "";
  return (
    <header style={{ color: primaryColor }} className="relative z-30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {src ? (
            <img src={src} alt="Restraint logo" className="h-10 w-auto" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300" />
          )}
          <div>
            {data.content.subheading && (
              <div className="text-xs text-gray-300">{data.content.subheading}</div>
            )}
          </div>
        </div>
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 text-sm">
          <Link href="#">Home</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Services</Link>
          <Link href="#">Pages</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Contact</Link>
          <a
            href="#"
            className="ml-4 inline-block text-white px-4 py-2 rounded"
            style={{ background: secondaryColor }}
          >
            Get Started ↗
          </a>
        </nav>
        <div className="md:hidden">
          <button aria-label="Open menu" className="p-2 bg-white/10 rounded">Menu</button>
        </div>
      </div>
    </header>
  );
};

export default RestraintHeader;
