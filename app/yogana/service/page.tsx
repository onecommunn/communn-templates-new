"use client";
import React from "react";
import YoganaServiceHero from "./_components/YoganaServiceHero";
import { useCMS } from "../CMSProvider.client";
import { YoganaHomePage } from "@/models/templates/yogana/yogana-home-model";
import { dummyData } from "../dummyData";
import YoganaServiceContent from "./_components/YoganaServiceContent";

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

const YoganaServicePage = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: YoganaHomePage | undefined = !isLoading
    ? (home as YoganaHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#C2A74E";
  const secondaryColor = source?.color?.secondary || "#000";
  const neutralColor = source?.color?.neutral || "#707070";
  return (
    <main>
      <YoganaServiceHero
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      {sectionsList?.map((item, idx) => (
        <YoganaServiceContent
          key={idx}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          title={item.title}
          tag={item?.tag}
          image={item?.image}
          description={item?.description}
          align={idx % 2 !== 0 ? "Left" : "Right"}
          neutralColor={neutralColor}
        />
      ))}
    </main>
  );
};

export default YoganaServicePage;
