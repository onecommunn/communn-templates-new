"use client"
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const DefaultEvents = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  // Mock data based on typical community event layouts
  const events = [
    {
      id: 1,
      title: "Community Meetup 2024",
      description:
        "Our platform streamlines member organization and invites, letting you focus on community growth.",
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fe6a4b806e873a81d332bf491042932e809a78a9.jpg",
    },
    {
      id: 2,
      title: "Digital Marketing Workshop",
      description:
        "Assign roles, elevate members, and manage who enters your community.",
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fe6a4b806e873a81d332bf491042932e809a78a9.jpg",
    },
    {
      id: 3,
      title: "Networking Dinner",
      description:
        "Customize your community with member-defined roles and contributions.",
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fe6a4b806e873a81d332bf491042932e809a78a9.jpg",
    },
    {
      id: 4,
      title: "Annual Tech Summit",
      description:
        "Our platform streamlines member organization and invites, letting you focus on community growth.",
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fe6a4b806e873a81d332bf491042932e809a78a9.jpg",
    },
  ];

  return (
    <section
      id="events"
      className="max-w-6xl mx-auto px-6 py-12 font-montserrat scroll-mt-[40px] md:scroll-mt-[90px]"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-black">Events</h2>
      </div>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {events.map((event) => (
            <CarouselItem
              key={event.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3 flex"
            >
              {/* Card */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-200  transition-all duration-300 group flex flex-col h-full w-full">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 line-clamp-1">
                    {event.title}
                  </h3>

                  <p className="text-sm font-medium line-clamp-3 mb-4">
                    {event?.description}
                  </p>

                  {/* Button always aligned */}
                  <button className="cursor-pointer mt-auto w-full py-3 rounded-full bg-[#3056A7] text-white font-semibold text-sm hover:bg-[#25468a] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
        <CarouselNext className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default DefaultEvents;
