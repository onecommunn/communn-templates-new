"use client";
import React from "react";
import RestraintServiceHero from "./_components/RestraintServiceHero";
import { useCMS } from "../CMSProvider.client";
import { RestarintHomePage } from "@/models/templates/restraint/restraint-home-model";
import { dummyData } from "../DummyData";
import RestraintServiceContent from "./_components/RestraintServiceContent";

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
const RestraintServicePage = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: RestarintHomePage | undefined = !isLoading
    ? (home as RestarintHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#3D493A";
  const secondaryColor = source?.color?.secondary || "#AEA17E";
  return (
    <main>
      <RestraintServiceHero
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      {sectionsList?.map((item, idx) => (
        <RestraintServiceContent
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

export default RestraintServicePage;
