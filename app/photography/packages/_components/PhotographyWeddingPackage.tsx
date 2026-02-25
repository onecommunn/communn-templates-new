"use client";
import React from "react";
import { PackageCard } from "./PhotographyPackageCard";
import { WeddingPackageSection } from "@/models/templates/photography/photography-package-model";
import { WhatsappWidgetSection } from "@/models/templates/photography/photography-home-model";

const weddingPackages = [
  {
    name: "Silver",
    price: "₹50,000",
    features: [
      "Devarakarya — Traditional photography & videography",
      "Reception — Traditional photography & videography",
      "Muhurtham — Traditional photography & videography",
    ],
    popular: false,
  },
  {
    name: "Gold",
    price: "₹85,000",
    features: [
      "Devarakarya — Traditional photography & videography",
      "Reception — Traditional photography, videography & candid",
      "Muhurtham — Traditional photography, videography & candid",
    ],
    popular: false,
  },
  {
    name: "Diamond",
    price: "₹1,80,000",
    features: [
      "Devarakarya — Traditional photography, videography & candid",
      "Reception — Full traditional, candid, cinematography & drone",
      "Muhurtham — Full traditional, candid, cinematography & drone",
    ],
    popular: true,
  },
  {
    name: "Platinum",
    price: "₹2,30,000",
    features: [
      "Devarakarya — Traditional, candid & cinematography",
      "Reception — Full coverage with drone & LED wall",
      "Muhurtham — Full coverage with drone & LED wall",
    ],
    popular: false,
  },
  {
    name: "Elite",
    price: "₹2,90,000",
    features: [
      "Devarakarya — Traditional, candid photography & videography",
      "Reception — Complete coverage with drone, LED wall & live spot mixing",
      "Muhurtham — Complete coverage with drone, LED wall & live spot mixing",
      "2 premium album books (40 sheets each)",
    ],
    popular: false,
  },
];

const PhotographyWeddingPackage = ({
  data,
  whatsappWidgetData,
}: {
  data: WeddingPackageSection;
  whatsappWidgetData: WhatsappWidgetSection;
}) => {
  const content = data?.content;
  const whatsapp = whatsappWidgetData?.content;
  return (
    <section className="py-20 px-4 md:px-20 bg-[#262626] text-[#EFECE7]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-bold text-center mb-12">
          {content?.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content?.weddingPackages?.map((pkg, i) => (
            <PackageCard
              key={pkg.name}
              pkg={pkg}
              i={i}
              message={whatsapp?.predefinedMessage}
              whatsappNumber={whatsapp?.whatsappNumber}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyWeddingPackage;
