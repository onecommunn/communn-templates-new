import React from "react";
import CreateHeader from "./_components/CreateHeader";
import CreateHero from "./_components/CreateHero";
import CreatorAbout from "./_components/CreatorAbout";
import CreateCTA from "./_components/CreateCTA";

const CreatePage = () => {
  return (
    <>
      <CreateHeader />
      <CreateHero/>
      <CreatorAbout/>
      <CreateCTA/>
    </>
  );
};

export default CreatePage;
