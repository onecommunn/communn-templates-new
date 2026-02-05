"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
} from "lucide-react";
import Image from "next/image";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
} from "date-fns";

const TERRACOTTA = "#c2593f";
const TEXT = "#4a3f35";
const BG = "#F4EFE1";

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type CalendarProps = {
  month: Date;
  onPrev: () => void;
  onNext: () => void;
  selectedDate?: Date;
  onSelectDate: (d: Date) => void;
  bookedDates: string[]; // toDateString()
  partialDates: string[]; // toDateString()
};

function BookingCalendar({
  month,
  onPrev,
  onNext,
  selectedDate,
  onSelectDate,
  bookedDates,
  partialDates,
}: CalendarProps) {
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 }); // Sun
    const end = endOfMonth(month);

    // render 6 rows (42 cells) like most booking calendars
    const arr: Date[] = [];
    for (let i = 0; i < 42; i++) arr.push(addDays(start, i));
    // ensure month always visible even if it fits in 5 rows
    return arr;
  }, [month]);

  const weekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full">
      {/* Header: left arrow, month centered, right arrow near divider */}
      <div className="relative flex items-center justify-center mb-6">
        <button
          onClick={onPrev}
          className="absolute left-0 p-2 ml-6 rounded-full hover:bg-black/5 transition"
          aria-label="Previous month"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-[18px] md:text-[20px] font-fraunces font-semibold flex-shrink-0">
          {format(month, "MMMM")}
        </div>

        <button
          onClick={onNext}
          className="absolute right-0 p-2 mr-6 rounded-full hover:bg-black/5 transition"
          aria-label="Next month"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Week header */}
      <div className="grid grid-cols-7 text-center mb-3">
        {weekLabels.map((w) => (
          <div
            key={w}
            className="font-fraunces font-semibold text-base md:text-[20px]"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-5 md:gap-y-6 text-center">
        {days.map((d) => {
          const inMonth = isSameMonth(d, month);
          const selected = selectedDate ? isSameDay(d, selectedDate) : false;

          const key = d.toDateString();
          const isBooked = bookedDates.includes(key);
          const isPartial = partialDates.includes(key);

          return (
            <button
              key={key}
              onClick={() => onSelectDate(d)}
              className={cn(
                "relative flex flex-col mx-auto items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full transition",
                inMonth && !selected && "hover:bg-[#c2593f]/20 cursor-pointer",
                !inMonth && "opacity-35 cursor-default",
                selected && "bg-[#c2593f]",
              )}
            >
              <span
                className={cn(
                  "text-sm md:text-base",
                  selected ? "text-white" : "opacity-80",
                )}
              >
                {format(d, "d")}
              </span>

              {(isBooked || isPartial) && (
                <div className="absolute -bottom-2 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1 w-1 rounded-full"
                      style={{
                        backgroundColor: TERRACOTTA,
                        opacity: isBooked ? 1 : 0.35,
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ConsultingoAppointmentDetailsPage({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 11, 2)); // Dec 02, 2025
  const [month, setMonth] = useState<Date>(startOfMonth(selectedDate));
  const [selectedTime, setSelectedTime] = useState("1:00pm");

  // Mock dots
  const bookedDates = [new Date(2025, 11, 2).toDateString()];
  const partialDates = [new Date(2025, 11, 3).toDateString()];

  const timeSlots = [
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "1:00pm",
    "1:30pm",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const isFormValid = Boolean(formData.name && formData.email);
  const isSubmitting = false;

  return (
    <section
      className="bg-[var(--neu)] min-h-screen py-16 px-6 md:px-20 text-[var(--sec)] font-lexend"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      {/* Header Section */}
      <div className="mx-auto mb-12">
        <h1 className="text-5xl md:text-6xl font-fraunces text-[var(--pri)] mb-6">
          Explore consulting career opportunities
        </h1>
        <p className="text-lg leading-relaxed max-w-5xl">
          Embark on a journey of professional growth and fulfillment as you
          explore a myriad of exciting consulting career opportunities within
          our team.
        </p>
      </div>

      {/* Calendar Card (MATCH IMAGE) */}
      <div
        className="mx-auto bg-[var(--neu)] border border-black/5 rounded-[60px] md:rounded-[300px] px-6 md:px-[90px] lg:px-[140px] py-10 md:py-[70px] flex flex-col lg:flex-row gap-10 items-center lg:items-stretch mb-20"
        style={{ color: TEXT }}
      >
        {/* Left: Calendar */}
        <div className="flex-1 w-full">
          <BookingCalendar
            month={month}
            onPrev={() => setMonth((m) => subMonths(m, 1))}
            onNext={() => setMonth((m) => addMonths(m, 1))}
            selectedDate={selectedDate}
            onSelectDate={(d) => setSelectedDate(d)}
            bookedDates={bookedDates}
            partialDates={partialDates}
          />
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-black/10 mx-2" />

        {/* Right: Time Slots */}
        <div className="w-full max-w-[360px]">
          <div className="font-fraunces font-semibold text-[18px] mb-4">
            {format(selectedDate, "EEEE MMM dd")}
          </div>

          <div className="space-y-3">
            {timeSlots.map((time) => {
              const active = selectedTime === time;

              return (
                <div key={time} className="w-full">
                  {!active ? (
                    <button
                      onClick={() => setSelectedTime(time)}
                      className="w-full cursor-pointer py-3 rounded-md border border-black/10 bg-transparent hover:bg-black/5 transition text-base opacity-80"
                    >
                      {time}
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedTime(time)}
                        className="flex-1 cursor-pointer py-3 rounded-md border border-black/10 bg-transparent text-base opacity-80"
                      >
                        {time}
                      </button>

                      <button
                        className="px-10 rounded-full text-white font-medium text-[13px]"
                        style={{ backgroundColor: TERRACOTTA }}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Details Form Section (your existing form kept) */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 w-full max-w-6xl mx-auto"
        id="book-now"
      >
        <div className="w-full h-[400px] lg:h-[550px] relative rounded-[30px] overflow-hidden group">
          <Image
            src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/66ba7db16f215782d10496851acc046db19a4f89.jpg"
            alt="Client Success"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-4xl md:text-[54px] font-fraunces text-[var(--sec)] text-center mb-2 font-semibold">
              Enter details
            </h2>
            <p className="text-[var(--sec)]/70 text-sm text-center">
              Join a dynamic event that values innovation and collaboration.
            </p>
          </div>
        </div>

        <div className="w-full rounded-[30px] p-8 md:p-12 bg-white shadow-sm">
          <form
            className="flex flex-col justify-between h-full space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-6">
              {[
                {
                  label: "Name",
                  name: "name",
                  type: "text",
                  placeholder: "Enter Name",
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "Enter Email Address",
                },
                {
                  label: "Phone Number",
                  name: "phoneNumber",
                  type: "tel",
                  placeholder: "Mobile Number",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-sm font-medium text-[var(--sec)] mb-2 block">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl px-6 py-4 text-lg bg-[var(--neu)] border-none focus:ring-2 focus:ring-[var(--pri)] outline-none transition-all"
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        [field.name]: (e.target as HTMLInputElement).value,
                      }))
                    }
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full rounded-xl py-4 bg-[var(--pri)] text-white font-bold text-lg hover:bg-[var(--pri)] disabled:bg-gray-300 transition-all flex justify-center items-center"
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Book Appointment"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
