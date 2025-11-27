import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { FeaturesSection } from "@/models/templates/restraint/restraint-home-model";
import Image from "next/image";
import React from "react";
import type { LucideProps } from "lucide-react";
import * as Lucide from "lucide-react";

type StatProps = {
  icon: string;
  value: string;
  label: string;
};

const isUrl = (v: string) => /^https?:\/\//i.test(v) || v?.startsWith("/");

type LucideIconType = React.ComponentType<LucideProps>;
function getLucideIcon(name: string): LucideIconType | null {
  const lib = Lucide as unknown as Record<string, LucideIconType>;
  return lib[name] ?? null;
}
const SUBTEXT = "#9C9C9C";
function Stat({ icon, value, label }: StatProps) {
  const LucideIcon = !isUrl(icon) ? getLucideIcon(icon) : null;
  return (
    <div className="flex items-center gap-4 md:gap-3">
      <div className="flex items-center justify-center rounded-lg text-[var(--sec)]">
        {LucideIcon ? (
          <LucideIcon strokeWidth={1} className="w-12 h-12" />
        ) : (
          <Image
            src={icon || ""}
            alt={label || "feature icon"}
            width={42}
            height={42}
            className="object-contain"
            unoptimized
          />
        )}
      </div>
      <div>
        <div className="font-marcellus text-[22px] md:text-3xl text-[#273126]">{value}</div>
        <div className="text-sm md:text-[16px]" style={{ color: SUBTEXT }}>
          {label}
        </div>
      </div>
    </div>
  );
}

const RestraintFeatures = ({
  data,
  primaryColor,
  secondaryColor,
}: {
  data: FeaturesSection;
  secondaryColor: string;
  primaryColor: string;
}) => {
  const content = data?.content;
  return (
    <section
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-20 py-10">
        <AnimatedContent
          direction="vertical"
          distance={50}
          duration={0.55}
          stagger={0.12}
          animateOpacity
        >
          <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
            {content?.features?.map((item, idx) => (
              <Stat
                icon={item?.icon}
                value={item?.title}
                label={item?.description}
                key={idx}
              />
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default RestraintFeatures;
