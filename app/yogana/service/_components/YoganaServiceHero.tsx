import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { Button } from "@/components/ui/button";
import React from "react";

const YoganaServiceHero = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  return (
    <section
      className="relative flex items-center justify-center h-[60vh] bg-cover bg-center bg-no-repeat font-cormorant"
      style={
        {
          backgroundImage: `url(${"/assets/martivo-hero-bg-image.png"})`,
          ["--pri" as any]: primaryColor,
          ["--sec" as any]: secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 bg-[var(--sec)]/60" />
      <div className="relative z-10 container mx-auto px-6 md:px-20 h-full text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            duration={1.2}
            initialOpacity={0.2}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={0.3}
          >
            {" "}
            <div className="flex flex-col justify-center h-full gap-4 md:gap-6">
              <h2 className="md:text-6xl/[72px] tracking-[-1.2px] text-5xl/[62px] font-bold text-white">
                Empowering Mind, Body And Spirit Through Martial Arts
              </h2>
              <Button
                style={{
                  backgroundColor: primaryColor,
                  color: "#ffffff",
                  border: "none",
                }}
                className="font-plus-jakarta rounded-[3px] w-fit font-semibold text-sm py-[22px] px-[37px] "
              >
                Get Started
              </Button>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default YoganaServiceHero;
