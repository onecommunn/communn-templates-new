"use client";
import React, { useEffect, useState } from "react";
import { MoveUpRight } from "lucide-react";
import { useCommunity } from "@/hooks/useCommunity";
import { Event } from "@/models/event.model";
import { getEvents } from "@/services/eventService";
import Link from "next/link";

// interface EventItem {
//   id: string;
//   title: string;
//   date: string;
//   price: number;
// }

// const events: EventItem[] = [
//   {
//     id: "1",
//     title: "Transforming operations efficiency",
//     date: "Dec 25 2025",
//     price: 4000,
//   },
//   {
//     id: "2",
//     title: "Digital driving transformation",
//     date: "Dec 25 2025",
//     price: 4000,
//   },
//   {
//     id: "3",
//     title: "Enhancing sustainability practices",
//     date: "Dec 25 2025",
//     price: 4000,
//   },
//   {
//     id: "4",
//     title: "Market expansion strategy",
//     date: "Dec 25 2025",
//     price: 4000,
//   },
// ];

export const formatMonthDay = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
    .format(new Date(iso))
    .replace(",", "");

const ConsultingoEvents: React.FC = () => {
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
      <section className="bg-[#fcf6e8] py-20 px-6 md:px-20" id="events">
        <div className="container mx-auto max-w-6xl">
          {/* Title Skeleton */}
          <div className="mb-16 h-12 w-48 animate-pulse rounded-lg bg-[#4F2910]/10" />

          <div className="flex flex-col">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-start md:items-center justify-between py-10 border-b border-[#4F2910]/5 last:border-0 animate-pulse"
              >
                {/* Event Title Placeholder */}
                <div className="md:w-1/3 mb-6 md:mb-0 space-y-2">
                  <div className="h-8 w-full rounded bg-slate-200/60" />
                  <div className="h-8 w-2/3 rounded bg-slate-200/60" />
                </div>

                {/* Metadata Placeholders (Date & Price) */}
                <div className="flex flex-row gap-12 mb-8 md:mb-0">
                  <div className="space-y-2">
                    <div className="h-3 w-10 rounded bg-[#4F2910]/10" />
                    <div className="h-5 w-24 rounded bg-slate-200/60" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-10 rounded bg-[#4F2910]/10" />
                    <div className="h-5 w-16 rounded bg-slate-200/60" />
                  </div>
                </div>

                {/* Button Placeholder */}
                <div className="h-14 w-full md:w-44 rounded-full bg-slate-300/50" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#fcf6e8] py-10 md:py-20 px-6 md:px-20 font-lexend" id="events">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-fraunces text-[#4F2910] mb-10">
          Events
        </h2>

        {events?.length === 0 ? (
          <div className="text-center w-full flex items-center justify-center">
            <p>No Events available.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {events.map((event) => {
              const availability = event?.availability;
              const end = availability?.[availability.length - 1]?.day;
              return (
                <div
                  key={event._id}
                  className="group bg-[#F4EFE1] rounded-[30px] flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:px-12 md:py-6 border-b border-[#4F2910]/10 last:border-0"
                >
                  {/* Event Title */}
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <h3 className="text-2xl md:text-3xl font-fraunces text-[#4F2910] leading-tight">
                      {event.title}
                    </h3>
                  </div>

                  {/* Event Metadata (Date & Price) */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-20 mb-4 md:mb-0">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-[#4F2910]/60 mb-1">
                        Date
                      </span>
                      <span className="text-[#4F2910] font-medium">
                        {formatMonthDay(availability?.[0]?.day)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-[#4F2910]/60 mb-1">
                        Price
                      </span>
                      <span className="text-[#4F2910] font-medium">
                        ₹{event.pricing}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="w-auto ">
                    <Link
                      href={`/event-details?eventid=${event._id}`}
                      className="flex items-center justify-between w-full md:w-auto gap-4 bg-[#4F2910] hover:bg-[#BC4C37] text-white px-8 py-4 rounded-full transition-all duration-300 group-hover:shadow-lg"
                    >
                      <span className="font-semibold text-sm">
                        View details
                      </span>
                      <div className="rounded-full bg-white/10 p-1">
                        <MoveUpRight size={18} />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ConsultingoEvents;
