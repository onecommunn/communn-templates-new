"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import OmIcon from "./icons/OmIcon";

type Testimonial = {
  image: string;
  quote: string;
  name: string;
  country: string;
};

const testimonials: Testimonial[] = [
  {
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/a667f5b5ab637abb7b14f094693a6673a9e5a184.jpg",
    quote:
      "Perfect for festive occasions. The saree looked royal and felt extremely comfortable all day.",
    name: "Priya",
    country: "India",
  },
  {
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ff6155a7c370f9b1c7bb8fd89c143e191175fb00.jpg",
    quote: "It feels special knowing this saree supports traditional artisans.",
    name: "Nithya",
    country: "India",
  },
  {
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/9d53821c68fee3c1e58e11b5892e3724b2210106.jpg",
    quote:
      "The saree quality exceeded my expectations. The fabric, color and finish were exactly as shown. Truly elegant.",
    name: "Ananya",
    country: "Malaysia",
  },
  {
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/9c13dbbf6c883c9709971ad364209b4983a67b37.jpg",
    quote: "It feels special. The handloom work is stunning.",
    name: "Andreya",
    country: "Canada",
  },
];

const CollectionsTestimonials = () => {
  const autoplay = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );
  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Top */}
        <div className="flex flex-col items-center text-center">
          <OmIcon size={60} />
          <h3 className="text-3xl md:text-[42px]/[50px] text-center font-kalnia">
            Reviews From Our Clients
          </h3>
          <p className="mt-5 max-w-3xl font-figtree text-[14px] md:text-[16px] leading-6 md:leading-7">
            Proin fermentum leo vel orci porta non pulvinar. Lectus nulla at
            volutpat diam. Ut hac habitasse platea placerat orci nulla
            pellentesque.
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-4 md:mt-10">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {testimonials.map((t, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <TestimonialCard t={t} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CollectionsTestimonials;

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="relative h-[420px] md:h-[460px] overflow-hidden rounded-[10px]">
      {/* image */}
      <img
        src={t.image}
        alt={t.name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        {/* big quote mark */}
        <div className="text-white/90 text-[70px]/[20px] select-none font-kalnia">
          “
        </div>

        <p className="font-figtree text-white/85 text-[16px] leading-7">
          {t.quote}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-kalnia text-white text-[22px]">{t.name}</span>
          <span className="font-figtree text-white/70 text-[16px]">
            – {t.country}
          </span>
        </div>
      </div>
    </div>
  );
}
