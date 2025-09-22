import React from "react";
import Timeline from "./Timeline";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";

const CreatorTimeline = () => {
  const steps = [
    {
      id: 1,
      title: "Started My Journey - 2014",
      subtitle: "Began my first coaching certificate",
    },
    {
      id: 2,
      title: "Started My Journey - 2014",
      subtitle: "Began my first coaching certificate",
    },
    {
      id: 3,
      title: "Started My Journey - 2014",
      subtitle: "Began my first coaching certificate",
    },
    {
      id: 4,
      title: "Started My Journey - 2014",
      subtitle: "Began my first coaching certificate",
    },
  ];
  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader
          title="Our Journey Timeline"
          description="Join our vibrant community! Explore uplifting stories and experiences from
learners as they embark on their educational journeys."
        />
        <Timeline steps={steps} />
      </div>
    </section>
  );
};

export default CreatorTimeline;
