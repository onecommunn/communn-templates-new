import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const data = [
  {
    image: "/assets/restraint-about-image01.svg",
    title: "Community Support and Encouragement",
    descriptiom:
      "Foster a sense of belonging with our supportive community. Share your journey, exchange experiences.",
  },
  {
    image: "/assets/restraint-about-image02.svg",
    title: "Enhanced Physical Flexibility and Strength",
    descriptiom:
      "Foster a sense of belonging with our supportive community. Share your journey, exchange experiences.",
  },
];

const RestraintAboutus = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  return (
    <section
      id="about-us"
      className="relative py-20 md:pb-28 font-sora"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="inset-1 pointer-events-none">
        <Image
          src={"/assets/restraint-about-bg-image01.svg"}
          alt="restraint-about-bg-image01"
          width={300}
          height={250}
          className="absolute -bottom-12 right-2 hidden md:flex"
        />
      </div>
      <div className="container mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* LEFT — image */}
          <div className="relative">
            <div className="flex items-center justify-center gap-6 md:gap-8 aspect-square">
              <Image
                src={"/assets/restraint-about-image-1.png"}
                alt="Martial artist pose"
                className="h-[460px] w-full rounded-[28px] md:w-[650px] md:h-[650px]"
                width={650}
                height={650}
                unoptimized
              />
            </div>
          </div>
          <div className="relative space-y-4">
            <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
              About Us
            </p>
            <h2 className="md:text-5xl/[56px] text-4xl font-marcellus">
              Transforming lives through{" "}
              <span className="text-[var(--sec)]">yoga and meditation</span>
            </h2>
            <p className="text-[#9C9C9C] text-[16px] font-sora">
              Discover inner peace and well-being through yoga Our practice
              combines physical movement, mindfulness, and breathing techniques
              to help you achieve balance, reduce stress, and foster personal
              growth.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4">
              {data?.map((item, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className="w-19 h-19 flex items-center justify-center aspect-square">
                    <Image
                      src={item?.image}
                      alt={item.image}
                      width={50}
                      height={50}
                      unoptimized
                    />
                  </div>
                  <div>
                    <h5 className="font-marcellus text-xl">{item.title}</h5>
                    <p className="text-[#9C9C9C] text-[16px] font-sora">
                      {item.descriptiom}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link href={"/"}>
              <button
                className={`${"mt-2 group cursor-pointer relative overflow-hidden px-[20px] py-[10px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[var(--pri)] text-white border-[var(--pri)] hover:bg-transparent hover:text-[var(--pri)] hover:border-[var(--pri)] hover:-translate-y-0.5 active:translate-y-0"}`}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  More About Us
                  <ArrowUpRight
                    className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestraintAboutus;
