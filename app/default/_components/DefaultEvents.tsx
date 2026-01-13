"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCommunity } from "@/hooks/useCommunity";
import { Event } from "@/models/event.model";
import { getEvents } from "@/services/eventService";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

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

const DefaultEvents = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { communityId } = useCommunity();

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response: any = await getEvents(communityId);
      setEvents(response?.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (communityId) fetchEvents();
  }, [communityId]);

  if (isLoading) {
    return (
      <section
        id="events"
        className="max-w-6xl mx-auto px-6 py-12 font-montserrat scroll-mt-[40px] md:scroll-mt-[90px]"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-black">Events</h2>
        </div>

        <Carousel
          opts={{ align: "start", loop: false }}
          className="w-full"
          plugins={[plugin.current]}
        >
          <CarouselContent>
            {Array.from({ length: 6 }).map((_, i) => (
              <CarouselItem
                key={i}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/3"
              >
                <Skeleton className="h-[420px] w-full rounded-[2.5rem]" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>
    );
  }
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
          {events.map((event) => {
            return (
              <CarouselItem
                key={event._id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 flex"
              >
                {/* Card */}
                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-200  transition-all duration-300 group flex flex-col h-full w-full">
                  {/* Image */}
                  <div className="relative h-64 w-full overflow-hidden shrink-0">
                    <Image
                      src={
                        event?.coverImage?.value ??
                        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/undefined/Default%20Events.png"
                      }
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
                    <Link
                      href={`/event-details?eventid=${event._id}`}
                      className="cursor-pointer text-center mt-auto w-full py-3 rounded-full bg-[#3056A7] text-white font-semibold text-sm hover:bg-[#25468a] transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
        <CarouselNext className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default DefaultEvents;
