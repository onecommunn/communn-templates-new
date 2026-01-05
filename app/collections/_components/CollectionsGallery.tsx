"use client";
import React from "react";

const CollectionsGallery = () => {
  const images = [
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/b32f303be02e4ae712e911ed15536d84a3325369.jpg", // Left Top
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ac20c5a29535b4242ec0cdcbc2d211542665e37c.jpg", // Left Bottom
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/28683a34ce4fec00a49cec22115dbb7f426257d7.jpg", // Inner Left Top
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/650f35bcb3082d5821188c7ea7ad65bbbbb6caaf.jpg", // Inner Left Bottom
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/9b5e9e2c9a4ab8ec97112aed7b072acba46a197a.png", // CENTER LARGE
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/330b6b3b09b00a2723d6dfc435eb9f2eeb0f0370.jpg",
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/7ed8c4ddc9ff11584127fbc7d3687648301cfef9.jpg", // Inner Right Top
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/58a0acf7987d0c5fea87ef30f5aafb16729065e7.jpg", // Inner Right Bottom
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/a125603cb16bf58d39bc761d5a4361da4f00ad2b.jpg", // Right Top
  ];

  return (
    <section className="mx-auto px-4 md:px-10 py-16">
      <div className="grid grid-cols-2 md:grid-cols-10 gap-1 md:gap-2">
        {/* Column 1: Far Left (Smallest) */}
        <div className="md:col-span-1 flex flex-col gap-1 md:gap-2 h-full">
          <img
            src={images[0]}
            className="h-full w-full object-cover rounded-sm"
            alt="gallery"
          />
          <img
            src={images[1]}
            className="h-full w-full object-cover rounded-sm"
            alt="gallery"
          />
        </div>

        {/* Column 2: Inner Left (Medium) */}
        <div className="md:col-span-1 flex flex-col gap-1 md:gap-2 h-full">
          <img
            src={images[2]}
            className="h-[60%] w-full object-cover rounded-sm"
            alt="gallery"
          />
          <img
            src={images[3]}
            className="h-[40%] w-full object-cover rounded-sm"
            alt="gallery"
          />
        </div>

        {/* Column 3: THE CENTER (Large Feature) */}
        <div className="col-span-2 md:col-span-6 h-full overflow-hidden rounded-md group relative">
          <img
            src={images[4]}
            className="w-full h-full object-cover max-h-[500px]"
            alt="End of Season Sale"
          />
        </div>

        {/* Column 4: Inner Right (Medium) */}
        <div className="md:col-span-1 flex flex-col gap-1 md:gap-2 h-full">
          <img
            src={images[5]}
            className="h-[60%] w-full object-cover rounded-sm"
            alt="gallery"
          />
          <img
            src={images[6]}
            className="h-[40%] w-full object-cover rounded-sm"
            alt="gallery"
          />
        </div>

        {/* Column 5: Far Right (Smallest) */}
        <div className="md:col-span-1 flex flex-col gap-1 md:gap-2 h-full">
          <img
            src={images[7]}
            className="h-full w-full object-cover rounded-sm"
            alt="gallery"
          />
          <img
            src={images[8]}
            className="h-full w-full object-cover rounded-sm"
            alt="gallery"
          />
        </div>
      </div>
    </section>
  );
};

export default CollectionsGallery;
