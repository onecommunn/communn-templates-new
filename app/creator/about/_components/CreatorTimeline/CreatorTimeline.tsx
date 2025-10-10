"use client";

import React from "react";
import Timeline from "./Timeline";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import type { JourneyTimelineSection } from "@/models/templates/creator/creator-about.model";

type Props = {
  data: JourneyTimelineSection;
  secondaryColor: string;
  primaryColor: string;
};

const CreatorTimeline: React.FC<Props> = ({
  data,
  primaryColor,
  secondaryColor,
}) => {
  const title = data?.content?.heading || "Our Journey Timeline";
  const description =
    data?.content?.subHeading ||
    "Join our vibrant community! Explore uplifting stories and experiences from learners as they embark on their educational journeys.";

  // Map CMS timeline -> Timeline steps
  const steps =
    (data?.content?.timeline ?? []).map((t, idx) => ({
      id: idx + 1,
      title: t.title,
      subtitle: t.description,
    })) || [];

  return (
    <section
      className="py-10 font-inter"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader
          title={title}
          description={description}
          textColor={secondaryColor}
        />

        {steps.length > 0 ? (
          <Timeline
            steps={steps}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        ) : (
          <p
            className="text-center text-sm text-gray-500 mt-6"
            style={{ color: secondaryColor }}
          >
            No milestones yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
};

export default CreatorTimeline;
