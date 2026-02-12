// app/(site)/_components/MartivoContact.tsx
"use client";

import React, { useMemo, useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { WavyStroke } from "./Icons/WavyStroke";
import { useCommunity } from "@/hooks/useCommunity";
import { toast } from "sonner";
import { sendNotification } from "@/services/contactService";
import { ContactForm } from "@/models/contact.model";
import { ContactSection } from "@/models/templates/martivo/martivo-home-model";

export default function MartivoContact({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: ContactSection;
}) {
  const { communityId } = useCommunity();
  const content = data?.content;

  // form state (ONLY existing fields)
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(""); // message
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailOk = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );

  // ✅ Phone is optional (matches UI). Name + Email(valid) + Message required.
  const canSubmit = useMemo(() => {
    return (
      first.trim().length > 0 &&
      emailOk &&
      service.trim().length > 0 &&
      !isSubmitting
    );
  }, [first, emailOk, service, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);

      const payload: ContactForm = {
        name: `${first.trim()} ${last.trim()}`.trim(),
        email: email.trim(),
        subject: "Contact Request",
        phoneNumber: phone.trim(), // optional
        message: service.trim(),
        communityId,
      };

      await sendNotification(payload);

      toast.success("Request submitted! We’ll contact you shortly.");
      setFirst("");
      setLast("");
      setEmail("");
      setPhone("");
      setService("");
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
      className="relative py-16 md:py-24 font-lato"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="mb-2 text-[13px] font-semibold tracking-[0.22em] text-[var(--pri)] uppercase">
            Contact Us
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl">
            {content?.heading}
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center">
            <WavyStroke color={primaryColor} size={120} />
          </div>
        </div>

        {/* Card */}
        <div className="grid gap-8 rounded-2xl border border-[#E6E8EE] bg-white p-6 shadow-[0_1px_0_rgba(16,24,40,0.04)] md:grid-cols-2 md:p-8">
          {/* Left: contact info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">
              {content?.subHeading}
            </h3>
            <p className="max-w-md text-[16px] leading-6 text-slate-600">
              {content?.description}
            </p>

            <ul className="mt-4 space-y-4 text-[14px] text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 rounded-full bg-[var(--pri)] p-2">
                  <MapPin size={18} color={secondaryColor} />
                </span>
                <div>
                  <p className="text-[16px] text-slate-900">Address</p>
                  <p className="text-slate-600 text-[15px]">
                    {content?.contact?.address}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 rounded-full bg-[var(--pri)] p-2">
                  <Phone size={18} color={secondaryColor} />
                </span>
                <div>
                  <p className="text-[16px] text-slate-900">Phone</p>
                  <a
                    href={
                      content?.contact?.phoneNumber
                        ? `tel:${content.contact.phoneNumber}`
                        : undefined
                    }
                    className="text-slate-600 text-[15px] hover:text-slate-800"
                  >
                    {content?.contact?.phoneNumber}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 rounded-full bg-[var(--pri)] p-2">
                  <Mail size={18} color={secondaryColor} />
                </span>
                <div>
                  <p className="text-[16px] text-slate-900">Email</p>
                  <a
                    href={
                      content?.contact?.email
                        ? `mailto:${content.contact.email}`
                        : undefined
                    }
                    className="text-[15px] text-slate-600 hover:text-slate-800"
                  >
                    {content?.contact?.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 rounded-full bg-[var(--pri)] p-2">
                  <Clock size={18} color={secondaryColor} />
                </span>
                <div>
                  <p className="text-[16px] text-slate-900">Hours</p>
                  <p className="text-[15px] text-slate-600">
                    {content?.availableTimings}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <label className="mb-1 block text-[15px] text-slate-700">
                Name *
              </label>
              <input
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                type="text"
                required
                placeholder="Sarah"
                className="w-full rounded-lg border border-[#E6E8EE] bg-white px-3.5 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#CBD3E3]"
              />
            </div>

            <div>
              <label className="mb-1 block text-[15px] text-slate-700">
                Email *
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#E6E8EE] bg-white px-3.5 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#CBD3E3]"
              />
              {!emailOk && email.trim().length > 0 && (
                <p className="mt-1 text-[12px] text-red-600">
                  Please enter a valid email.
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-[15px] text-slate-700">
                Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="+91 9876231202"
                className="w-full rounded-lg border border-[#E6E8EE] bg-white px-3.5 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#CBD3E3]"
              />
            </div>

            <div>
              <label className="mb-1 block text-[15px] text-slate-700">
                Message *
              </label>
              <textarea
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                placeholder="Kickboxing Intro Class"
                className="w-full rounded-lg border border-[#E6E8EE] bg-white px-3.5 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#CBD3E3]"
              />
            </div>

            <div className="mt-2">
              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  "group relative inline-flex items-center gap-3 rounded-full px-6 py-3 text-white shadow-md transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F67C00] focus-visible:ring-offset-2",
                  canSubmit
                    ? "bg-[var(--pri)] hover:-translate-y-0.5"
                    : "bg-[var(--pri)]/60 cursor-not-allowed",
                ].join(" ")}
              >
                <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-white" />
                <span className="relative z-[1] text-[15px]">
                  {isSubmitting ? "Sending…" : "Send Message"}
                </span>
                <span className="relative z-[1] grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--pri)]">
                  <ArrowRight size={18} color={primaryColor} />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* subtle flourish */}
      <div className="pointer-events-none absolute -left-8 top-10 hidden h-20 w-20 rounded-full bg-[var(--sec)]/10 blur-xl md:block" />
    </section>
  );
}
