"use client";

import React, { useContext, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { sendNotification } from "@/services/contactService";
import { AuthContext } from "@/contexts/Auth.context";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format as formatDateFns } from "date-fns";
import { toast } from "sonner";
import { ContactSection } from "@/models/templates/spawell/spawell-home-model";

// Given by you
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  phoneNumber: string;
  message: string;
  communityId: string;
}

type Props = {
  primaryColor?: string;
  secondaryColor: string;
  neutralColor: string;
  data: ContactSection;
};

const services = [
  "Signature Full-Body Massage",
  "Deep Tissue Massage",
  "Aromatherapy Healing",
  "Facial Therapy",
  "Herbal Body Scrub & Wrap",
];

const hexToRgba = (hex: string, alpha = 1) => {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SpawellContact: React.FC<Props> = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}) => {
  const auth = useContext(AuthContext);
  const { communityId } = auth;
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [service, setService] = useState<string>(""); // shadcn Select value
  const [date, setDate] = useState<Date | undefined>(undefined); // shadcn Calendar date

  const [isSubmitting, setIsSubmitting] = useState(false);

  const source = data?.content;

  const canSubmit = useMemo(() => {
    return first && email && phone && service && date && !isSubmitting;
  }, [first, email, phone, service, date, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !date) return;

    try {
      setIsSubmitting(true);
      const payload: ContactForm = {
        name: `${first.trim()} ${last.trim()}`.trim(),
        email: email.trim(),
        subject: "Appointment Request",
        phoneNumber: phone.trim(),
        message: `Service: ${service}\nPreferred date: ${formatDateFns(
          date,
          "dd-MM-yyyy"
        )}`,
        communityId,
      };

      await sendNotification(payload);
      toast.success("Request submitted! We’ll contact you shortly.");
      setFirst("");
      setLast("");
      setService("");
      setDate(undefined);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--neu)] py-14 md:py-20 font-plus-jakarta"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Heading + Form */}
          <div>
            <h2 className="text-[34px] md:text-[44px] font-semibold tracking-[-0.02em] text-[var(--pri)]">
              <span>{source?.heading}</span>{" "}
              <span className="font-lora italic font-normal">
                {source?.subHeading}
              </span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-[var(--pri)] max-w-xl">
              {source?.description}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  placeholder="First Name"
                  style={{ color: primaryColor }}
                  className="h-12 rounded-xl border border-[var(--pri)]/20 bg-white px-4 text-sm outline-none focus:border-[var(--pri)]/20"
                />
                <input
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  placeholder="Last Name"
                  style={{ color: primaryColor }}
                  className="h-12 rounded-xl border border-[var(--pri)]/20 bg-white px-4 text-sm outline-none focus:border-[var(--pri)]/20"
                />
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  style={{ color: primaryColor }}
                  className="h-12 rounded-xl border border-[var(--pri)]/20 bg-white px-4 text-sm outline-none focus:border-[var(--pri)]/20"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  style={{ color: primaryColor }}
                  className="h-12 rounded-xl border border-[var(--pri)]/20 bg-white px-4 text-sm outline-none focus:border-[var(--pri)]/20"
                />
              </div>

              {/* Row 3: shadcn Select + date-picker */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {/* shadcn Select */}
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger
                    style={{ color: primaryColor }}
                    className="w-full rounded-xl border border-[var(--pri)]/20 bg-white px-4 py-6 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <SelectValue placeholder="Choose Services" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        style={{ color: primaryColor }}
                      >
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* shadcn Date Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 w-full justify-between rounded-xl border border-[var(--pri)]/20 bg-white px-4 text-left text-sm font-normal hover:bg-white"
                      style={{ color: primaryColor }}
                    >
                      {date ? formatDateFns(date, "dd-MM-yyyy") : "dd-mm-yyyy"}
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-70" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      classNames={{
                        day_selected:
                          "bg-[var(--calendar-selected-bg,#7e1d53)] text-white hover:bg-[var(--calendar-selected-bg-hover,#9b2a6e)]",
                        day_today: "border border-[#7e1d53]",
                        day_outside: "text-gray-400 opacity-50",
                        nav_button: "text-[#7e1d53] hover:bg-[#7e1d5320]",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                type="submit"
                disabled={!canSubmit}
                className="mt-2 rounded-xl bg-[#4b2a1d] px-6 py-6 text-[var(--sec)] hover:bg-[#432314] disabled:opacity-60"
                style={{ backgroundColor: primaryColor }}
              >
                {isSubmitting ? "Submitting..." : "Book An Appointment"}
              </Button>
            </form>
          </div>

          {/* Right: Image + timings */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-square">
              <Image
                src={
                  source?.media?.[0] || "/assets/spawell-contact-image-1.png"
                }
                alt="Therapist providing a relaxing massage"
                width={900}
                height={650}
                className="h-full w-full object-cover"
                priority
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, ${hexToRgba(
                    primaryColor ?? "",
                    0
                  )} 37.07%, ${hexToRgba(primaryColor ?? "", 0.8)} 100%)`,
                }}
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6">
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-[var(--sec)]">
                <div className="flex p-2 items-center justify-center rounded-full bg-[var(--pri)]">
                  <Clock className="h-10 w-10" strokeWidth={1} />
                </div>
                <div className="text-[16px] space-y-2">
                  {source?.availableTimings?.map((item, idx) => (
                    <div key={idx}>
                      {item?.day} : {item?.time}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpawellContact;
