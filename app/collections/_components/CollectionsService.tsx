"use client";

import React from "react";
import SecurePaymentIcon from "./icons/SecurePaymentIcon";
import FreeShippingIcon from "./icons/FreeShippingIcon";
import LiveShoppingIcon from "./icons/LiveShoppingIcon";
import CustomerCareIcon from "./icons/CustomerCareIcon";
import StitchingIcon from "./icons/StitchingIcon";

const services = [
  { label: "Safe & Secure Payment", Icon: SecurePaymentIcon },
  { label: "Free Shipping", Icon: FreeShippingIcon },
  { label: "Live Shopping", Icon: LiveShoppingIcon },
  { label: "Customer Care Service", Icon: CustomerCareIcon },
  { label: "Stitching Service", Icon: StitchingIcon },
];

const CollectionsService = () => {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "#C09932",
        backgroundImage: `url("/assets/collections-header-bg-image.png")`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-0 py-10 md:py-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
          {services.map(({ label, Icon }, idx) => (
            <div
              key={label}
              className={`flex flex-col items-center justify-center text-center py-6 md:py-12 gap-4 relative`}
            >
              {/* Icon */}
              <div className="text-white">
                <Icon />
              </div>

              {/* Title */}
              <p className="font-figtree text-white text-[16px] md:text-[20px] leading-tight">
                {label}
              </p>
              {idx !== services.length - 1 && (
                <div className="absolute hidden md:flex md:right-0 top-1/2 -translate-y-1/2 bg-[#FAEEDC]/50 w-[1px] h-20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsService;
