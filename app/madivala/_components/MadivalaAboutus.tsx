"use client";

import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { ArrowUpRight, Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Icons from "lucide-react";
import type { ComponentType, SVGProps } from "react";

function IconOrImage({ src, alt }: { src: string; alt: string }) {
  const isImage =
    String(src || "").includes("/") || String(src || "").includes(".");

  if (!isImage && src in Icons) {
    const Ico = Icons[src as keyof typeof Icons] as ComponentType<
      SVGProps<SVGSVGElement>
    >;
    return (
      <Ico
        className="h-12 w-12 text-[#273126]"
        aria-label={alt}
        strokeWidth={0.5}
      />
    );
  }
  return (
    <Image
      src={src || "/assets/restraint-about-image01.svg"}
      alt={alt}
      width={50}
      height={50}
      className="h-12 w-12 object-contain"
      unoptimized
    />
  );
}

const MadivalaAboutus = ({
  primaryColor,
  secondaryColor,

}: {
  primaryColor: string;
  secondaryColor: string;

}) => {

  return (
    <section
      id="about-us"
      className="bg-[var(--sec)]/15 relative py-20 md:pb-28"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="text-center mb-10 md:mb-10 space-y-3">
        <p
          style={{ color: primaryColor }}
          className="flex items-center justify-center gap-2 font-inter text-2xl md:text-[16px]"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--pri)]"></span>
          About Us
        </p>

        <h2
          style={{ color: secondaryColor }}
          className="font-hedvig text-[28px] md:text-[45px] font-[400] leading-tight"
        >
          KARNATAKA RAJYA MADIVALARA  <br></br>
          SANGHA
        </h2>

      </div>

      <div className="container mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">

          <AnimatedContent
            direction="horizontal"
            distance={120}
            duration={0.9}
            ease="power3.out"
            threshold={0.2}
            animateOpacity
          >
            <div className="relative">
              <div className="relative w-full h-[360px] md:h-[460px] lg:h-[520px]">
                <Image
                  src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/8711393c-19e9-4267-a63b-db61c9c1d1c1.png"
                  alt="MadivalaAboutusImage pose"
                  className="rounded-[24px] object-cover"
                  fill
                  unoptimized
                  priority
                />
              </div>

            </div>
          </AnimatedContent>

          {/* RIGHT — text + list */}
          <AnimatedContent
            direction="horizontal"
            distance={120}
            reverse
            duration={0.9}
            ease="power3.out"
            threshold={0.25}
            animateOpacity
          >
            <div className="relative space-y-4">
              <p className="text-[#636363] text-[16px] font-inter">
                ಈ ಸಂಘವು 1933 ರಲ್ಲಿ ಪ್ರಾರಂಭವಾಗಿಇದುವರೆವಿಗೂ ಸಂಘದಉನ್ನತ ಪದವಿ ರಾಜ್ಯಾಧ್ಯಕ್ಷ ಸ್ಥಾನವನ್ನು ಅಲಂಕರಿಸಿದ 14 ಮಂದಿ ಅಧ್ಯಕ್ಷರು ಸಂಘದಕಾರ್ಯ ಚಟುವಟಿಕೆಗಳನ್ನು ಮುನ್ನಡೆಸಿಕೊಂಡು ಹೋಗುತ್ತಿದ್ದರು. ಆಗ ಕರ್ನಾಟಕರಾಜ್ಯ ಮಡಿವಾಳರ ಸಂಘವು ಬೆಂಗಳೂರಿಗೆ ಮಾತ್ರ ಸೀಮಿತವಾಗಿತ್ತು. 15-07-2013 ರಲ್ಲಿ ಸಂಘದರಾಜ್ಯಾಧ್ಯಕ್ಷ ಸ್ಥಾನಕ್ಕೆ ಪದಗ್ರಹಣ ಮಾಡಿದ ಶ್ರೀ ಸಿ.ನಂಜಪ್ಪ ರವರುದುರ್ಬಲರ ಶೋಷಣೆ , ಜಾತೀಯತೆ , ಮೇಲು ಕೀಳು ತಾರತಮ್ಯ , ಅಸ್ಪøಶ್ಯತೆ , ಮೂಡನಂಬಿಕೆಗಳು , ಶಿಕ್ಷಣದಲ್ಲಿ ಅವಕಾಶ ವಂಚನೆ ಹೀಗೆ ಅನೇಕ ಅಸಮಾನತೆಗಳಿಂದ ತುಳಿತಕ್ಕೆ ಒಳಗಾಗಿದ್ದ ರಾಜ್ಯದಲ್ಲಿನ ಮಡಿವಾಳ ಜನಾಂಗವನ್ನು ಸಮಾಜದ ಮುಖ್ಯವಾಹಿನಿಗೆ ತರುವ ನಿಟ್ಟಿನಲ್ಲಿರಾಜ್ಯದ ಮೂಲೆ ಮೂಲೆಗಳಿಗೂ ಪ್ರವಾಸಕೈಗೊಂಡು, ರಾಜ್ಯದಎಲ್ಲಾಜಿಲ್ಲೆ ಮತ್ತುತಾಲ್ಲೂಕು ಪದಾಧಿಕಾರಿಗಳನ್ನು ನೇಮಿಸಿ ಆಯಾ ಭಾಗಗಳಲ್ಲಿ ಮಡಿವಾಳರ ಸ್ಥಿತಿ ಗತಿಗಳ ವಿವರಗಳನ್ನು ಪಡೆದು, ಮಡಿವಾಳರ ಕೂಗು ಸರ್ಕಾರದ ಗಮನಕ್ಕೆ ತರುವುದಕ್ಕಾಗಿ, ಸಂಘಟನೆಯ ಮೂಲಕ, ಕೂಡಲಸಂಗಮ , ಮೈಸೂರು , ಬೆಂಗಳೂರಿನ ನ್ಯಾಷನಲ್‍ಕಾಲೇಜು ಮೈದಾನ , ಚಿತ್ರದುರ್ಗಗುರುಪೀಠ , ಮಂಡ್ಯ , ಗಳಲ್ಲಿ ಅಂದಿನ ಸರ್ಕಾರಗಳ ಮುಖ್ಯ ಮಂತ್ರಿಗಳು ಮತ್ತು ಮಂತ್ರಿವರ್ಗದ ಪ್ರಮುಖರನ್ನು ಕರೆಸಿ ಸಮಾವೇಶಗಳನ್ನು ಮಾಡಿದ್ದರ ಫಲವಾಗಿ,
              </p>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default MadivalaAboutus;
