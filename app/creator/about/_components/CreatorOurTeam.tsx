"use client";

import React from "react";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import type { OurTeamSection } from "@/models/templates/creator/creator-about.model";

type Props = {
  data: OurTeamSection;
  secondaryColor: string;
  primaryColor: string;
};

const FALLBACK_AVATAR = "/assets/teamImage1.png";

const CreatorOurTeam: React.FC<Props> = ({
  data,
  primaryColor,
  secondaryColor,
}) => {
  const title = data?.content?.heading || "Our Team";
  const description =
    data?.content?.subHeading ||
    "Join our vibrant community! Explore uplifting stories and experiences from learners as they embark on their educational journeys.";
  const members = data?.content?.members ?? [];

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

        {members.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            No team members yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {members.map((m, idx) => {
              const name = m.name?.trim() || "Team Member";
              const role = m.designation?.trim() || "Member";
              const desc = m.description?.trim() || "";
              const avatar = m.avatar || FALLBACK_AVATAR;

              return (
                <div
                  key={`${name}-${idx}`}
                  className="flex flex-col justify-center items-center gap-4 text-center"
                >
                  <img
                    src={avatar}
                    alt={`${name} avatar`}
                    className="rounded-full w-50 h-50 object-cover"
                    loading="lazy"
                  />
                  <div className="flex items-center flex-col gap-1">
                    <h5
                      className="font-semibold font-poppins text-lg"
                      style={{ color: secondaryColor }}
                    >
                      {name}
                    </h5>
                    <p
                      className="font-inter text-sm text-[#4C4C4C]"
                      style={{ color: secondaryColor }}
                    >
                      {role}
                    </p>
                    {desc && (
                      <p
                        className="font-inter text-sm text-[#4C4C4C]"
                        style={{ color: secondaryColor }}
                      >
                        {desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatorOurTeam;
