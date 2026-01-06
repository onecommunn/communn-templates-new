import Link from "next/link";
import React from "react";

const CollectionsPersonaliseSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 my-10">
      {/* Left */}
      <div className="flex flex-col items-center justify-center text-center gap-4 p-10 font-figtree order-1 md:order-0 bg-[#C09932]/20">
        <p>Personalized styling and storytelling</p>
        <img
          src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/b9a822240f19a1f79aa75b67f7b6ec33608b409a.png"
          alt="logo"
          className="max-w-[380px] max-h-[146px] object-cover"
        />
        <p>
          We personally engage with customers, helping them find the saree that
          matches their personality, body type, and occasion — turning shopping
          into a personalized experience.
        </p>
        <Link
          href={"/"}
          className="bg-[#C09932] w-fit font-figtree cursor-pointer hover:bg-[#A6822B] text-white px-8 py-3 text-sm font-medium rounded-sm transition-all transform hover:scale-105"
        >
          Learn More
        </Link>
      </div>
      {/* Right */}
      <div className="order-0 md:order-1">
        <img
          src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/89fd1eac478d56fd174ddb3ea12e310db720fa06.jpg"
          alt="Personalise-Section-image"
          className="w-full object-cover"
        />
      </div>
    </section>
  );
};

export default CollectionsPersonaliseSection;
