"use client";
import React from "react";
import { PackageCard } from "./PhotographyPackageCard";

const preWeddingPackages = [
  {
    name: "Pre-Wedding — 1 Day",
    price: "₹40,000",
    features: [
      "Candid photography session",
      "Professional cinematography",
      "Aerial drone coverage",
      "30 professionally edited photographs",
      "1-minute highlight teaser",
      "4-minute cinematic video",
    ],
    popular: false,
  },
  {
    name: "Pre-Wedding — 2 Days",
    price: "₹80,000",
    features: [
      "Candid photography session",
      "Professional cinematography",
      "Aerial drone coverage",
      "60 professionally edited photographs",
      "1-minute highlight teaser",
      "1 social media reel",
      "5-minute cinematic video",
    ],
    popular: false,
  },
];


const PhotographyPreWeddingPackages = () => {
  return (
    <section className="py-20 px-4 bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-bold text-center mb-12 text-[#EFECE7]">
          Pre-Wedding Packages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {preWeddingPackages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyPreWeddingPackages;
