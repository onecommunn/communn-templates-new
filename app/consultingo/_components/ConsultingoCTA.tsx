import { CtaSection } from "@/models/templates/consultingo/consultingo-home-model";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const ConsultingoCTA = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: CtaSection;
}) => {
  const content = data?.content;
  return (
    <section
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
      className="mx-auto relative w-full overflow-hidden font-lexend px-8 md:px-28 -mb-[60px] md:-mb-[180px] z-10 bg-[var(--neu)] pt-12"
    >
      <div className="border border-[#0000001A] rounded-t-[30px] p-8 pb-16  md:p-[80px] md:pb-[230px] bg-[var(--sec)]/5 flex flex-col items-center justify-center gap-8">
        <h2 className="font-semibold text-[22px]/[26px] md:text-[54px]/[64px] text-[#4F2910] font-fraunces text-center">
          {content?.heading}
        </h2>
        <Link
          href={content?.button?.link ?? "/"}
          className="bg-[#BC4C37] rounded-[30px] py-3 px-10 text-white flex items-center gap-2 cursor-pointer"
        >
          {content?.button?.label}
          <span>
            <CircleArrowRight />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default ConsultingoCTA;
