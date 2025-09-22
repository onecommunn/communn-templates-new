"use client";
import { Button } from "@/components/ui/button";
import {
  capitalizeWords,
  formatDate,
} from "@/components/utils/StringFunctions";
import { useCommunity } from "@/hooks/useCommunity";
import { Event } from "@/models/event.model";
import { getEvents } from "@/services/eventService";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const YoganaEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(true);
  const { communityId } = useCommunity();

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response: any = await getEvents(communityId);
      setEvents(response.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (communityId) {
      fetchEvents();
    }
  }, [communityId]);

  return (
    <section
      id="events"
      className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* heading */}
        <div className="relative z-10 text-center md:mb-16 mb-6">
          <p className="text-[#C2A74E] font-alex-brush text-3xl">Events</p>
          <h2 className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold">
            Upcoming Events & Retreats
          </h2>
          <div className="flex items-center justify-center w-full mt-3">
            <p className="font-plus-jakarta text-[16px] text-[#707070] md:max-w-xl">
              A yoga shop is a place where practitioners of all levels can find
              essential equipment, accessories,
            </p>
          </div>
        </div>
        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event: Event, index) => (
            <div key={index}>
              <div className="relative aspect-12/13 rounded-2xl overflow-hidden">
                <Image
                  src={
                    event?.coverImage?.value || "/assets/yogona-hero-image.jpg"
                  }
                  alt={event.title || "event Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover object-center"
                  priority={false}
                />
              </div>
              <div className="flex items-center flex-col gap-2">
                <div className="flex items-center flex-col mt-2">
                  <h6 className="font-cormorant text-xl text-[#C2A74E] font-medium">
                    {`${formatDate(event?.availability[0]?.day)} - ${formatDate(
                      event?.availability[event?.availability.length - 1]?.day
                    )}`}
                  </h6>
                  <h6 className="font-cormorant text-4xl text-[#C2A74E] font-semibold">
                    {event?.pricing != null && `₹${event.pricing}`}
                  </h6>
                </div>
                <p className="text-black font-medium font-cormorant text-2xl">
                  {capitalizeWords(event.title)}
                </p>
                {(() => {
                  const availability = event?.availability;
                  const end = availability?.[availability.length - 1]?.day;

                  const isBookable = (() => {
                    if (!end) return false;
                    const today = new Date().setHours(0, 0, 0, 0);
                    const endDate = new Date(end).setHours(0, 0, 0, 0);
                    return today <= endDate;
                  })();

                  return isBookable ? (
                    <Link href={`/event-details?eventid=${event._id}`}>
                      <Button
                        variant={"ghost"}
                        className="mt-2 font-semibold font-cormorant text-[16px] cursor-pointer hover:bg-[#C2A74E] bg-[#C2A74E] text-white rounded-full hover:text-white hover:scale-105"
                      >
                        RESERVE SPOT
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      disabled
                      variant={'outline'}
                      className="bg-gray-400 font-cormorant text-[20px] rounded-full text-black disabled:cursor-not-allowed"
                      title="This event has already ended"
                    >
                      Booking Closed
                    </Button>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YoganaEvents;
