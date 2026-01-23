"use client";
import React from "react";
import Link from "next/link";

type DefaultContactMeProps = {
  message: string;
  address: string;
  phoneNumber: number;
  email: string;
  fullAddress: string;
  zipCode: string;
  socialLinks: any[];
};

const PLATFORM_ICON: Record<string, string> = {
  instagram: "/assets/instagram-svg-icon.svg",
  facebook: "/assets/facebook-svg-icon.svg",
  twitter: "/assets/twitter-svg-icon.svg",
  youtube: "/assets/youtube-svg-icon.svg",
  linkedin: "/assets/linkedin-svg-icon.svg",
};

const DefaultContactMe = ({
  message,
  address,
  phoneNumber,
  email,
  socialLinks,
  fullAddress,
  zipCode,
}: DefaultContactMeProps) => {
  const normalize = (s?: string) => (s ?? "").trim();
  return (
    <section
      id="contact"
      className="max-w-6xl mx-auto px-3 md:px-6 py-6 font-montserrat scroll-mt-[40px] md:scroll-mt-[90px]"
    >
      {/* Section Heading */}
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">
        Contact
      </h2>

      {/* Description Text */}
      <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-6xl mb-6">
        {message ?? "-"}
      </p>

      {/* Contact Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 flex-grow">
          {/* Call Info */}
          <div>
            <h4 className="text-base font-bold text-black mb-2">Call</h4>
            <p className="text-gray-600 text-sm">{phoneNumber ?? "-"}</p>
          </div>

          {/* Email Info */}
          <div>
            <h4 className="text-base font-bold text-black mb-2">Email</h4>
            <p className="text-gray-600 text-sm">{email}</p>
          </div>

          {/* Address Info */}
          <div>
            <h4 className="text-base font-bold text-black mb-2">Address</h4>
            <p className="text-gray-600 text-sm">
              {fullAddress} - {zipCode}
            </p>
          </div>
        </div>

        {/* Social Follow Links */}
        <div className="flex flex-col items-start md:items-end min-w-[200px]">
          <h4 className="text-base font-bold text-black mb-2">Follow Us</h4>
          <div className="flex gap-4">
            {socialLinks?.map((each: any, idx) => {
              const key = normalize(each.type).toLowerCase();
              const Icon = PLATFORM_ICON[key];
              const url = each.value;
              if (!url) return null;
              return (
                <Link
                  href={url ?? "/"}
                  target="_blank"
                  key={idx}
                  className="cursor-pointer"
                >
                  <img
                    src={Icon}
                    alt="key"
                    className="w-7 h-7 object-cover"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefaultContactMe;
