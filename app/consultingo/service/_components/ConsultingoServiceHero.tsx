import Image from "next/image";
import React from "react";

const ConsultingoServiceHero = () => {
  return (
    <section className="relative font-lexend bg-[#fcf6e8] overflow-hidden py-16">
      <div className="relative container mx-auto px-6 md:px-20 text-[#4F2910] flex flex-col items-center">
        {/* header */}
        <div className="text-center flex flex-col items-center">
          <h1 className="text-[34px]/[40px] md:text-[62px]/[74px] leading-tight text-center font-fraunces text-[#BC4C37]">
            Planning and Implementation
          </h1>
          <p className="text-base text-[#4F2910] leading-relaxed text-center mt-2 md:max-w-[80%]">
            Developing strategic plans tailored to your business objectives and
            ensuring seamless implementation. Our expert guidance guarantees
            alignment with long-term goals & industry trends for sustained
            growth.
          </p>
        </div>
        {/* Image Container */}
        <div className="relative w-full aspect-[16/8] mt-6 md:mt-12">
          <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-transparent">
            <Image
              src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/1affd5e7a9471916ccd329b91ab0cd52c75152fd.jpg"
              alt="Hero Image"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoServiceHero;
