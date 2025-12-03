"use client";

import React from "react";
import { Clock, MapPin, Mail, Phone } from "lucide-react";
import { ContactSection } from "@/models/templates/fitkit/fitkit-home-model";

const FitKitContact = ({
  data,
  secondaryColor,
  primaryColor,
}: {
  data: ContactSection;
  secondaryColor: string;
  primaryColor: string;
}) => {
  const content = data?.content;
  const contactItems = [
    {
      icon: Clock,
      title: "Opening hours",
      text: `${content?.availableTimings?.join("\n")}`,
    },
    {
      icon: MapPin,
      title: "Address Location",
      text: `${content?.contact?.address}`,
    },
    {
      icon: Mail,
      title: "Email Address",
      text: `${content?.contact?.email}`,
    },
    {
      icon: Phone,
      title: "Phone Number",
      text: `${content?.contact?.phoneNumber}`,
    },
  ];
  return (
    <section
      className="w-full font-archivo"
      id="contact"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container  md:px-20 md:py-16 grid min-h-[420px] md:min-h-[520px] md:grid-cols-[1.1fr_1.4fr]">
        {/* LEFT – CONTENT */}
        <div className="bg-[var(--pri)] text-white px-6 py-10 md:px-16 md:py-16 flex items-center">
          <div className="w-full max-w-xl">
            <h2 className="text-[32px] md:text-[44px] leading-tight font-bold">
              Gym Contact Info
            </h2>

            {/* Red underline */}
            <div className="mt-5 mb-10 h-[2px] w-40 bg-[var(--sec)]" />

            <div className="space-y-8">
              {contactItems?.map((item, idx) => {
                const Icon = item?.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    {/* Icon block */}
                    <div className="relative">
                      <div className="h-16 w-16 bg-[#2A2A2A]" />
                      <div className="absolute -right-2 -bottom-2 flex h-16 w-16 items-center justify-center bg-[var(--sec)]">
                        <Icon size={26} strokeWidth={1.7} />
                      </div>
                    </div>

                    {/* Text */}
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold">
                        {item?.title}
                      </h4>
                      <p className="mt-1 text-sm md:text-[15px] text-[#D0D4DB] whitespace-pre-line">
                        {item?.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT – MAP */}
        <div className="relative min-h-[260px]">
          <iframe
            title="Gym location"
            src={content?.contact?.mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
};

export default FitKitContact;
