"use client";
import { useCommunity } from "@/hooks/useCommunity";
import { Event } from "@/models/event.model";
import { getEvents } from "@/services/eventService";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { EventCard, formatMonthDay } from "../../_components/RestraintEvents";
import {
  EventsSection,
} from "@/models/templates/restraint/restraint-home-model";

const RestraintEventsPage = ({
  primaryColor,
  secondaryColor,
  data,
}: {
  secondaryColor: string;
  primaryColor: string;
  data?: EventsSection;
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { communityId } = useCommunity();

  const content = data?.content;

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

  return (
    <section
      className="py-10 font-sora"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* header */}
        <div className="text-center md:mb-16 mb-6">
          <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
            Events
          </p>
          <h2 className="font-marcellus text-4xl leading-tight text-black">
            {content?.heading}{" "}
            <span style={{ color: secondaryColor }}>{content?.subHeading}</span>
          </h2>
        </div>
        {/* main */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="h-100 animate-pulse rounded-2xl border border-[var(--pri)] bg-[var(--pri)]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((event) => {
              const availability = event?.availability;
              const end = availability?.[availability.length - 1]?.day;
              const isBookable = (() => {
                if (!end) return false;
                const today = new Date().setHours(0, 0, 0, 0);
                const endDate = new Date(end).setHours(0, 0, 0, 0);
                return today <= endDate;
              })();
              return (
                <Link
                  href={`/event-details?eventid=${event._id}`}
                  key={event._id}
                >
                  <EventCard
                    image={event?.coverImage?.value || "/assets/spawell-event-image-3.png"}
                    title={event?.title}
                    blurb={event?.description}
                    date={formatMonthDay(availability?.[0]?.day)}
                    price={event?.pricing}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default RestraintEventsPage;
