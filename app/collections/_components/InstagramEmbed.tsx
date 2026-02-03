"use client";

import { useEffect } from "react";
import Script from "next/script";
import OmIcon from "./icons/OmIcon";
import { InstagramSection } from "@/models/templates/collections/collections-home-model";

export default function InstagramFullWidth({
  data,
}: {
  data: InstagramSection;
}) {
  useEffect(() => {
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  const content = data?.content

  return (
    <>
      <div
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          padding: "0px 40px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <div className="flex flex-col items-center text-center mb-10">
          <OmIcon size={60} color={"#C09932"} />
          <h3 className="text-3xl md:text-[42px]/[50px] text-[#C09932] text-center font-kalnia whitespace-normal break-words">
            Follow us on Instagram
          </h3>
        </div>
        <div className="flex justify-center">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={content?.instagramUrl ?? "/"}
            data-instgrm-version="12"
            style={{
              maxWidth: "50%",
              width: "50%",
              borderRadius: "16px",
              justifyContent: "center",
            }}
          />
        </div>
      </div>

      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
    </>
  );
}
