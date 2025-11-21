"use client";
import React from "react";
import FitkitServiceHero from "./_components/FitkitServiceHero";
import { useCMS } from "../CMSProvider.client";
import { FitkitHomePage } from "@/models/templates/fitkit/fitkit-home-model";
import { dummyData } from "../dummyData";
import FitkitServiceContent from "./_components/FitkitServiceContent";

const sectionsList = [
  {
    title: "We Have Lot Of Experience Gym Training",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
    image: "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_4.png",
    tag: "Section tag",
  },
  {
    title: "We Have Lot Of Experience Gym Training",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
    image:
      "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_1.png",
    tag: "Section tag",
  },
  {
    title: "We Have Lot Of Experience Gym Training",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
    image:
      "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_2.png",
    tag: "Section tag",
  },
  {
    title: "We Have Lot Of Experience Gym Training",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
    image: "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_3.png",
    tag: "Section tag",
  },
];

const FitkitServicePage = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: FitkitHomePage | undefined = !isLoading
    ? (home as FitkitHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#141414";
  const secondaryColor = source?.color?.secondary || "#F41E1E";

  return (
    <main>
      <FitkitServiceHero
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      {sectionsList?.map((item, idx) => (
        <FitkitServiceContent
          key={idx}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          title={item.title}
          tag={item?.tag}
          image={item?.image}
          description={item?.description}
          align={idx % 2 == 0 ? "Left" : "Right"}
        />
      ))}
    </main>
  );
};

export default FitkitServicePage;
