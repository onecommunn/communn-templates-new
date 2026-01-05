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
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ac20c5a29535b4242ec0cdcbc2d211542665e37c.jpg",
    quote:
      "Perfect for festive occasions. The saree looked royal and felt extremely comfortable all day.",
    name: "Priya",
    country: "India",
  },
  {
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/28683a34ce4fec00a49cec22115dbb7f426257d7.jpg",
    quote: "It feels special knowing this saree supports traditional artisans.",
    name: "Nithya",
    country: "India",
  },
  {
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/650f35bcb3082d5821188c7ea7ad65bbbbb6caaf.jpg",
    quote:
      "The saree quality exceeded my expectations. The fabric, color and finish were exactly as shown. Truly elegant.",
    name: "Ananya",
    country: "Malaysia",
  },
  {
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/330b6b3b09b00a2723d6dfc435eb9f2eeb0f0370.jpg",
    quote: "It feels special. The handloom work is stunning.",
    name: "Andreya",
    country: "Canada",
  },
  // duplicate a few for smoother loop feel (optional)
  {
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/7ed8c4ddc9ff11584127fbc7d3687648301cfef9.jpg",
    quote:
      "Perfect for festive occasions. The saree looked royal and felt extremely comfortable all day.",
    name: "Priya",
    country: "India",
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

      {/* dark overlay like screenshot */}
      <div className="absolute inset-0 bg-black/10" />

      {/* bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

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
