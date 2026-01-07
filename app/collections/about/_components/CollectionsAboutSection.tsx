import React from "react";
import OmIcon from "../../_components/icons/OmIcon";
import CollectionsPointIcon from "../../_components/icons/CollectionsPointIcon";
import Link from "next/link";

interface CollectionsAboutSection {
  title: string;
  description: string;
  imagePlace?: "Left" | "Right";
  pointes?: string[];
  image: string;
  button: {
    label: string;
    url: string;
  };
  primaryColor: string;
}

const CollectionsAboutSection = ({
  title,
  description,
  pointes,
  image,
  button,
  imagePlace = "Left",
  primaryColor,
}: CollectionsAboutSection) => {
  return (
    <section
      className="mx-auto px-6 md:px-20 py-10"
      style={
        {
          "--pri": primaryColor,
        } as React.CSSProperties
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left */}
        <div
          className={`${imagePlace === "Left" ? "md:order-0" : "md:order-1"}`}
        >
          <img
            src={image}
            alt={title}
            className="w-full object-cover h-fit max-h-[450px]"
          />
        </div>
        {/* Right */}
        <div className="flex flex-col gap-4">
          <OmIcon size={60} color={primaryColor} />
          <h3 className="font-kalnia text-[24px]/[34px] md:text-[35px]/[50px]">
            {title}
          </h3>
          <p className="font-figtree text-base">{description}</p>
          <ul className="space-y-4">
            {pointes &&
              pointes.length > 0 &&
              pointes?.map((p, idx) => (
                <li className="flex items-center gap-2" key={idx}>
                  <CollectionsPointIcon size={30} color={primaryColor}/>
                  <p className="font-lora text-base">{p}</p>
                </li>
              ))}
          </ul>

          <Link
            href={button?.url ?? "/"}
            className="bg-[var(--pri)] w-fit font-figtree cursor-pointer hover:bg-[var(--pri)]/90 text-white px-8 py-3 text-sm font-medium rounded-sm transition-all transform hover:scale-105"
          >
            {button?.label}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionsAboutSection;
