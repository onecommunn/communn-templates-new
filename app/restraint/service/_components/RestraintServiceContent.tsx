import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import Image from "next/image";
import React from "react";

interface RestraintServiceContentProps {
  align: "Left" | "Right";
  image: string;
  tag?: string;
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
}

const RestraintServiceContent = ({
  align,
  image,
  tag,
  title,
  description,
  primaryColor,
  secondaryColor,
}: RestraintServiceContentProps) => {
  return (
    <section
      className="relative font-sora"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-6 md:px-20 py-10 md:py-16">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* LEFT — image */}
          <div
            className={`order-1 ${
              align === "Left" ? "md:order-0" : "md:order-1"
            }`}
          >
            <AnimatedContent
              direction="horizontal"
              distance={120}
              duration={0.9}
              ease="power3.out"
              threshold={0.2}
              animateOpacity
            >
              <div className={`relative`}>
                <div className="flex items-center justify-center gap-6 md:gap-8">
                  <Image
                    src={image || "/assets/restraint-about-image-1.png"}
                    alt="Martial artist pose"
                    className="w-full rounded-[28px] max-h-[550px]"
                    width={550}
                    height={550}
                    unoptimized
                  />
                </div>
              </div>
            </AnimatedContent>
          </div>

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
              {tag && (
                <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
                  {tag}
                </p>
              )}

              <h2 className="md:text-5xl/[56px] text-4xl font-marcellus">
                {title}
              </h2>
              <p className="text-[#9C9C9C] text-[16px] font-sora">
                {description}
              </p>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default RestraintServiceContent;
