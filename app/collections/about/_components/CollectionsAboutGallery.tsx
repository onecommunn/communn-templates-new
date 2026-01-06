import { Marquee } from "@/components/CustomComponents/marquee";
import React from "react";

const images = [
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/b32f303be02e4ae712e911ed15536d84a3325369.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ac20c5a29535b4242ec0cdcbc2d211542665e37c.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/28683a34ce4fec00a49cec22115dbb7f426257d7.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/650f35bcb3082d5821188c7ea7ad65bbbbb6caaf.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/330b6b3b09b00a2723d6dfc435eb9f2eeb0f0370.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/7ed8c4ddc9ff11584127fbc7d3687648301cfef9.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/58a0acf7987d0c5fea87ef30f5aafb16729065e7.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/a125603cb16bf58d39bc761d5a4361da4f00ad2b.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/71b586be092c99929a4d1095d0bce841d99cffaa.jpg",
];
const CollectionsAboutGallery = () => {
  return (
    <section className="py-10">
      <div className="relative">
        <Marquee className="[--duration:26s] [--gap:1.5rem]">
          {images?.map((item, idx) => (
            <img
              key={idx}
              src={item}
              alt={`image-${idx}`}
              className="w-50 h-50 object-center object-cover"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CollectionsAboutGallery;
