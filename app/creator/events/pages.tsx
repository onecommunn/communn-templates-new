import React from "react";
import CreatorEventsPage from "./_components/CreatorEvents";

const CreatorEvents = () => {
  const primaryColor = "#fff";
  const secondaryColor = "#000";
  return (
    <>
      <CreatorEventsPage
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </>
  );
};

export default CreatorEvents;
