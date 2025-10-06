import React from "react";
import CreatorPlansSection from "./_components/CreatorPlansSection";

const CreatorPlans = () => {
  const primaryColor = "#fff";
  const secondaryColor = "#000";
  return (
    <>
      <div>
        <CreatorPlansSection
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </div>
    </>
  );
};

export default CreatorPlans;
