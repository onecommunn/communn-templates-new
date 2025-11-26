import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { Button } from "@/components/ui/button";
import { underscoreToSpace } from "@/components/utils/StringFunctions";
import { Service } from "@/models/templates/yogana/yogana-home-model";
import React from "react";

const YoganaServiceHero = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: Service;
}) => {
  return (
    <section
      className="relative flex items-center justify-center h-[60vh] bg-cover bg-center bg-no-repeat font-cormorant"
      style={
        {
          backgroundImage: `url(${"/assets/martivo-hero-bg-image.png"})`,
          ["--pri" as any]: primaryColor,
          ["--sec" as any]: secondaryColor,
          ["--nue" as any]: neutralColor,
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
            <div className="flex flex-col justify-center h-full gap-4">
              <h2 className="md:text-6xl/[72px] tracking-[-1.2px] text-5xl/[62px] font-bold text-white capitalize">
                {underscoreToSpace(data?.serviceName)}
              </h2>
              <p className="text-lg md:text-xl">{data?.description}</p>
              <Button
                style={{
                  backgroundColor: primaryColor,
                  color: "#ffffff",
                  border: "none",
                }}
                className="font-plus-jakarta rounded-[3px] w-fit font-semibold text-sm py-[22px] px-[37px] cursor-pointer hover:bg-[var(--pri)]/70"
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
