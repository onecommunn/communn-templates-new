"use client";

import * as React from "react";
import { format as formatDateFns } from "date-fns"; // kept in case you need later; safe to remove if unused
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { useCommunity } from "@/hooks/useCommunity";
import { toast } from "sonner";
import { sendNotification } from "@/services/contactService";
import { ContactForm } from "@/models/contact.model";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ContactSection } from "@/models/templates/restraint/restraint-home-model";

/* ---------- Styling palette aligned to Restraint ---------- */
// const ACCENT = "#B6A57B";
// const DARK = "#2F3A31"; // not used now
// const MUTED_TEXT = "#7A8278"; // not used now

/* ---------- Page ---------- */
export default function RestraintContact({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: ContactSection;
}) {
  const content = data?.content;
  // form state
  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState(""); // optional; fine to keep
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { communityId } = useCommunity();

  const canSubmit =
    first.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);

      const payload: ContactForm = {
        name: `${first.trim()} ${last.trim()}`.trim(),
        email: email.trim(),
        subject: "Appointment Request",
        phoneNumber: phone.trim(),
        // You removed service & date from UI, so message only includes notes now
        message: notes ? `Notes:\n${notes.trim()}` : "No additional notes.",
        communityId,
      };

      await sendNotification(payload);
      toast.success("Request submitted! We’ll contact you shortly.");

      // reset
      setFirst("");
      setLast("");
      setEmail("");
      setPhone("");
      setNotes("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="bg-[var(--sec)]/15 font-sora py-12"
      id="contact"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-6 md:px-20">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-4">
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <p className="text-sm uppercase tracking-[4px] text-black">
                Contact
              </p>
              <Link href={`tel:${content?.contact?.phoneNumber}`}>
                <button className="group relative cursor-pointer overflow-hidden rounded-[10px] border border-[var(--pri)] bg-[var(--pri)] px-[20px] py-[10px] text-[16px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-transparent hover:text-[var(--pri)] active:translate-y-0">
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Call Now
                    <ArrowUpRight
                      className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </span>
                </button>
              </Link>
            </div>

            <h1 className="font-marcellus text-4xl leading-tight text-black md:text-5xl">
              {content?.heading}{" "}
              <span style={{ color: secondaryColor }}>{content?.subHeading}</span>
            </h1>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: Form Card */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1">
                <div>
                  <Label className="mb-1 text-[#2B3129]">First name</Label>
                  <Input
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label className="mb-1 text-[#2B3129]">Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                  />
                </div>
                <div>
                  <Label className="mb-1 text-[#2B3129]">Phone</Label>
                  <Input
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98xxxxxx"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-1 text-[#2B3129]">Notes (optional)</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Share anything that would help us prepare (injuries, goals, preferences)…"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="w-full rounded-xl bg-[var(--pri)] text-white hover:opacity-95"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                <p className="mt-2 text-center text-xs text-[#7C847A]">
                  By submitting, you agree to be contacted about your request.
                </p>
              </div>
            </form>
          </div>

          {/* Right: Info blocks */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <InfoCard
                icon={<Phone className="h-4 w-4" />}
                title="Phone"
                lines={[content?.contact?.phoneNumber]}
              />
              <InfoCard
                icon={<Mail className="h-4 w-4" />}
                title="Email"
                lines={[content?.contact?.email]}
              />
              <InfoCard
                icon={<MapPin className="h-4 w-4" />}
                title="Studio"
                lines={[content?.contact?.address]}
              />
              <InfoCard
                icon={<Clock className="h-4 w-4" />}
                title="Hours"
                lines={content?.availableTimings}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reusable info card ---------- */
function InfoCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-4">
      <span className="mt-1 grid h-9 w-9 place-items-center rounded-full bg-[var(--sec)]/10 text-[#2F3A31]">
        {icon}
      </span>
      <div>
        <p className="mb-1 text-sm font-semibold text-[#2B3129]">{title}</p>
        {lines.map((l, i) => (
          <p key={i} className="text-xs text-[#687068]">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}
