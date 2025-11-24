import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface FitkitServiceContentProps {
  align: "Left" | "Right";
  image: string;
  tag?: string;
  title?: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
}

const FitkitServiceContent = ({
  align,
  image,
  title,
  description,
  primaryColor,
  secondaryColor,
  tag,
}: FitkitServiceContentProps) => {
  return (
    <section
      className="font-archivo relative w-full overflow-hidden"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container px-6 md:px-20 py-10 md:py-20 grid md:grid-cols-2 gap-6 md:gap-8">
        {/* left */}
        <div
          className={`flex flex-col justify-center order-1 ${
            align === "Left" ? "md:order-0" : "md:order-1"
          }`}
        >
          {tag && (
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-16 bg-[var(--sec)] hidden md:flex" />
              <span className="font-semibold text-xl text-[var(--sec)] font-kanit">
                {tag ?? "Section Name"}
              </span>
            </div>
          )}

          {title && (
            <h4 className="font-kanit font-semibold text-3xl md:text-5xl">
              {title ?? "Section Title"}
            </h4>
          )}

          <div className="grid grid-cols-1 mt-10 gap-4 md:gap-0">
            <div className="flex flex-col justify-between gap-4 md:gap-0">
              <p className="text-[#6A6A6A] text-lg">{description}</p>
              {/* <Link href={"/"}>
                <Button className="bg-[var(--sec)] rounded-none uppercase text-white h-12 px-[40px] py-[20px] w-full md:w-fit mt-4">
                  get Started
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
        {/* right */}
        <div>
          <Image
            src={image || "/assets/fitkit-about-us-image2.png"}
            alt="fitkit-about-us-image2"
            width={683}
            height={557}
            unoptimized
            className="max-h-[557px]"
          />
        </div>
      </div>
    </section>
  );
};

export default FitkitServiceContent;
