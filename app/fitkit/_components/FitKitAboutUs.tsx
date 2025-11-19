import { Button } from "@/components/ui/button";
import { AboutSection } from "@/models/templates/fitkit/fitkit-home-model";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FitKitAboutUs = ({
  data,
  secondaryColor,
  primaryColor,
}: {
  data: AboutSection;
  secondaryColor: string;
  primaryColor: string;
}) => {
  const content = data?.content;
  return (
    <section
      className="font-archivo relative w-full overflow-hidden"
      id="about-us"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container px-6 md:px-20 py-10 md:py-20 grid md:grid-cols-2 gap-6">
        {/* left */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-16 bg-[var(--sec)] hidden md:flex" />
            <span className="font-semibold text-xl text-[var(--sec)] font-kanit">
              About Us
            </span>
          </div>
          <h4 className="font-kanit font-semibold text-3xl md:text-5xl">
            {content?.heading}
          </h4>
          <div className="grid md:grid-cols-2 mt-10 gap-4 md:gap-0">
            <div>
              <Image
                src={
                  content?.media?.[1] || "/assets/fitkit-about-us-image1.png"
                }
                alt="fitkit-about-us-image1"
                className="w-full md:w-fit"
                width={285}
                height={350}
                unoptimized
              />
            </div>
            <div className="flex flex-col justify-between gap-4 md:gap-0">
              <p className="text-[#6A6A6A] text-[16px]">
                {content?.description}
              </p>
              <ul className="space-y-3">
                {content?.bulletes?.map((item, idx) => (
                  <li key={idx}>
                    <div className="flex items-center gap-3">
                      <span className="h-[2px] w-7 bg-[var(--sec)] hidden md:flex" />
                      <span className="font-medium text-[16px] text-[#1D2229] font-archivo">
                        {item}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href={content?.buttons?.[0]?.url || "/"}>
                <Button className="bg-[var(--sec)] rounded-none uppercase text-white h-12 px-[40px] py-[20px] w-full md:w-fit">
                  {content?.buttons?.[0]?.label}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* right */}
        <div>
          <Image
            src={content?.media?.[0] || "/assets/fitkit-about-us-image2.png"}
            alt="fitkit-about-us-image2"
            width={683}
            height={557}
            unoptimized
          />
        </div>
      </div>
    </section>
  );
};

export default FitKitAboutUs;
