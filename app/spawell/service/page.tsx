"use client";
import React from "react";
import SpawellServiceHero from "./_components/SpawellServiceHero";
import { useCMS } from "../CMSProvider.client";
import { SpawellHomePage } from "@/models/templates/spawell/spawell-home-model";
import { dummyData } from "../DummyData";
import SpawellServiceContent from "./_components/SpawellServiceContent";

const sectionsList = [
  {
    title: "Transforming lives through yoga and meditation",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
    image: "https://html.awaikenthemes.com/restraint/images/post-1.jpg",
    tag: "Section tag",
  },
  {
    title: "Transforming lives through yoga and meditation",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
    image: "https://html.awaikenthemes.com/restraint/images/post-6.jpg",
    tag: "Section tag",
  },
  {
    title: "Transforming lives through yoga and meditation",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
    image: "http://html.awaikenthemes.com/restraint/images/post-3.jpg",
    tag: "Section tag",
  },
  {
    title: "Transforming lives through yoga and meditation",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
    image: "https://html.awaikenthemes.com/restraint/images/post-4.jpg",
    tag: "Section tag",
  },
  {
    title: "Transforming lives through yoga and meditation",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
    image: "https://html.awaikenthemes.com/restraint/images/post-5.jpg",
    tag: "Section tag",
  },
];

const SpawellServicePage = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: SpawellHomePage | undefined = !isLoading
    ? (home as SpawellHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#5D3222";
  const secondaryColor = source?.color?.secondary || "#fff";
  const neutralColor = source?.color?.neutral || "#F9F6F1";

  return (
    <main>
      <SpawellServiceHero
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />

      {sectionsList?.map((item, idx) => (
        <SpawellServiceContent
          key={idx} 
          image={item?.image}
          title={item?.title}
          align={idx % 2 == 0 ? "Left" : "Right"}
          description={item?.description}
          neutralColor={neutralColor}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ))}
    </main>
  );
};

export default SpawellServicePage;
