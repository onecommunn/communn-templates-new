"use client";
import React from "react";
import { useCMS } from "../CMSProvider.client";
import { MartivoHomePage } from "@/models/templates/martivo/martivo-home-model";
import { dummyData } from "../DummyData";
import MartivoServiceHero from "./_components/MartivoServiceHero";
import MartivoServiceContent from "./_components/MartivoServiceContent";
import MartivoCTA from "../_components/MartivoCTA";

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

const MartivoServicePage = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: MartivoHomePage | undefined = !isLoading
    ? (home as MartivoHomePage | undefined) ?? dummyData
    : undefined;
  const primaryColor = source?.color?.primary || "#29400a";
  const secondaryColor = source?.color?.secondary || "#7bd900";
  return (
    <main>
      <MartivoServiceHero
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      {sectionsList?.map((item, idx) => (
        <MartivoServiceContent
          key={idx}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          title={item.title}
          tag={item?.tag}
          image={item?.image}
          description={item?.description}
          align={idx % 2 !== 0 ? "Left" : "Right"}
        />
      ))}
      <MartivoCTA primaryColor={primaryColor} secondaryColor={secondaryColor} />
    </main>
  );
};

export default MartivoServicePage;
