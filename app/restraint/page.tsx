import React from "react";
import { dummyData } from "./DummyData";
import RestraintHeroWrapper from "./_components/RestraintHeroWrapper";
import RestraintAboutUs from "./_components/RestraintAboutUs";
import { Header, HeroSection, AboutSection } from "@/models/templates/restraint/restraint-home-model";

export default function Page() {
  const header = dummyData.sections.find(
    (s) => s.sectionName === "headerSection" && s.isActive
  ) as Header | undefined;

  const hero = dummyData.sections.find(
    (s) => s.sectionName === "heroSection" && s.isActive
  ) as HeroSection | undefined;

  const about = dummyData.sections.find(
    (s) => s.sectionName === "aboutSection" && s.isActive
  ) as AboutSection | undefined;

  return (
    <div>
      {/* Hero Section (wrapper handles header/nav + hero bg/content) */}
      <RestraintHeroWrapper page={dummyData} />

      {/* About Us Section */}
      {about && (
        <RestraintAboutUs
          data={about.content}
          primaryColor={dummyData.color.primary}
          secondaryColor={dummyData.color.secondary}
          neutralColor={dummyData.color.neutral}
        />
      )}

    </div>
  );
}
