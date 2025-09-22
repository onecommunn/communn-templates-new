import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import React from "react";

interface ITeamList {
  name: string;
  role: string;
  description: string;
  profile: string;
}

const teamList: ITeamList[] = [
  {
    name: "Jonathan Jones",
    role: "Founder & CEO",
    description: "Began my first coaching certificate ",
    profile: "/assets/teamImage1.png",
  },
  {
    name: "Jean Lang",
    role: "Manager",
    description: "Began my first coaching certificate ",
    profile: "/assets/teamImage2.png",
  },
  {
    name: "Katrina Towne",
    role: "Instructor",
    description: "Began my first coaching certificate ",
    profile: "/assets/teamImage3.png",
  },
  {
    name: "Nicolas Rohan",
    role: "Assistant Instructor",
    description: "Began my first coaching certificate ",
    profile: "/assets/teamImage4.png",
  },
];

const CreatorOurTeam = () => {
  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader
          title="Our Team"
          description="Join our vibrant community! Explore uplifting stories and experiences from
learners as they embark on their educational journeys."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0">
          {teamList.map((each, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-center items-center gap-4"
            >
              <img src={each.profile} className="rounded-full w-50 h-50" />
              <div className="flex items-center flex-col gap-2">
                <h5 className="font-semibold font-poppins text-lg">
                  {each.name}
                </h5>
                <p className="font-inter text-sm text-[#4C4C4C]">{each.role}</p>
                <p className="font-inter text-sm text-[#4C4C4C]">
                  {each.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorOurTeam;
