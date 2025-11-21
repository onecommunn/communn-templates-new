import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import Image from "next/image";
import React from "react";

interface SpawellServiceContentProps {
  align: "Left" | "Right";
  image: string;
  tag?: string;
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}

const SpawellServiceContent = ({
  align,
  image,
  tag,
  title,
  description,
  primaryColor,
  secondaryColor,
  neutralColor,
}: SpawellServiceContentProps) => {
  return (
    <section
      className="relative py-10 md:py-16 font-plus-jakarta"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Copy */}
          <div className={`order-1 ${align === "Left" ? "md:order-0" : "md:order-1"}`}>
            {/* Eyebrow */}
            {tag && (
              <AnimatedContent distance={20} duration={0.45} ease="power2.out">
                <div className="mb-2 inline-flex items-center gap-2 text-sm text-[var(--pri)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--pri)]/80" />
                  {tag}
                </div>
              </AnimatedContent>
            )}

            {/* Heading */}
            <AnimatedContent distance={40} duration={0.65} ease="power3.out">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-[var(--pri)] md:text-5xl">
                {title}{" "}
              </h2>
            </AnimatedContent>

            {/* Blurb */}
            <AnimatedContent
              distance={30}
              duration={0.55}
              ease="power2.out"
              delay={0.05}
            >
              <p className="mt-4 text-[16px] leading-7 text-[var(--pri)]">
                {description}
              </p>
            </AnimatedContent>
          </div>

          {/* Right: Image (slide in from right) */}
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={80}
            duration={0.8}
            ease="power3.out"
          >
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={image || "/assets/spawell-course-image-1.jpg"}
                  alt="Therapist providing a relaxing massage"
                  className="w-full rounded-[28px] max-h-[550px]"
                  width={550}
                  height={550}
                  unoptimized
                />
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default SpawellServiceContent;
