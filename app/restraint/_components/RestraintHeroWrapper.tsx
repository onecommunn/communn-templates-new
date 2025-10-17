import React from "react";
import RestraintHeader from "./RestraintHeader";
import RestraintHero from "./RestraintHero";
import { RestraintHomePage, Header, HeroSection } from "@/models/templates/restraint/restraint-home-model";

const RestraintHeroWrapper = ({
  page,
}: {
  page?: RestraintHomePage;
}) => {
  if (!page || !page.sections) {
    // Prevents the find error
    return null;
  }

  const { primary, secondary, neutral } = page.color ?? {
    primary: "#1E1E1E",
    secondary: "#3D493A",
    neutral: "#AEA17E",
  };
  const header = page.sections.find(
    (s) => s.sectionName === "headerSection" && s.isActive
  ) as Header | undefined;
  const hero = page.sections.find(
    (s) => s.sectionName === "heroSection" && s.isActive
  ) as HeroSection | undefined;
  const bg = hero?.content.media?.[0];

  return (
    <section
      className="relative w-full bg-cover bg-center"
      style={{
        backgroundImage: bg ? `url(${bg})` : undefined,
        minHeight: "80vh",
      }}
    >
      <div className="absolute inset-0 bg-black/45 z-10" />
      {header && (
        <div className="absolute inset-x-0 top-0 z-30">
          <RestraintHeader
            data={header}
            primaryColor={primary}
            secondaryColor={secondary}
            neutralColor={neutral}
          />
        </div>
      )}
      <div className="relative z-20">
        {hero && (
          <RestraintHero
            data={hero.content}
            primaryColor={primary}
            secondaryColor={secondary}
            neutralColor={neutral}
          />
        )}
      </div>
    </section>
  );
};

export default RestraintHeroWrapper;
