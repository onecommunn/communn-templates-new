import { capitalizeWords } from "@/utils/StringFunctions";
import Image from "next/image";
import React from "react";

const blogList = [
  {
    date: "Aug 20, 2025",
    tag: "Trending",
    title: `Spring Has Arrived, and So Have
Our Incredible Yoga Deals!`,
    image: "/assets/yogona-courses-image-1.jpg",
  },
  {
    date: "Sep 30, 2025",
    tag: "Trending",
    title: `Yoga Asanas to Soothe the Mind
and Alleviate Stress`,
    image: "/assets/yogona-hero-image.jpg",
  },
  {
    date: "Jun 22, 2025",
    tag: "Trending",
    title: `Top Yoga Poses for Effective our
Backache and Pain Relief`,
    image: "/assets/yogana-service-image-2.jpg",
  },
];

const YoganaBlogs = () => {
  return (
    <section
      id="blogs"
      className="relative py-10 font-cormorant bg-[#C2A74E1A] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* heading */}
        <div className="relative z-10 text-center md:mb-16 mb-6">
          <p className="text-[#C2A74E] font-alex-brush text-3xl">Blogs</p>
          <h2 className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold">
            Yoga & Wellness Insights
          </h2>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogList.map((blog, i) => (
              <article key={i} className="break-inside-avoid">
                {/* Image */}
                <div className="relative aspect-[13/16] rounded-2xl overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width:768px) 100vw, (max-width:1280px) 33vw, 33vw"
                    unoptimized
                  />
                </div>
                {/* meta */}
                <div className="mt-5 flex items-center gap-3 text-sm text-neutral-500">
                  <span className="inline-block h-[1px] w-10 bg-neutral-300" />
                  <p className="text-[#092C4C] font-cormorant font-medium text-xl">
                    {blog.tag}
                  </p>
                  <span className="text-[#C2A74E]">•</span>
                  <span className="font-cormorant font-medium text-[#707070] text-xl">
                    {blog.date}
                  </span>
                </div>
                {/* Title */}
                <h3 className="mt-3 text-3xl font-semibold leading-snug text-[#1C1A1D]">
                  {capitalizeWords(blog.title)}
                </h3>
                {/* CTA */}
                <button
                  type="button"
                  className="group  cursor-pointer  rounded-full mt-2 font-plus-jakarta font-semibold inline-flex items-center gap-2 text-[13px] uppercase tracking-wide text-neutral-700"
                >
                  Read More
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoganaBlogs;
