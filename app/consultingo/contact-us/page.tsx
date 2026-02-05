"use client";
import React, { FormEvent, useContext, useState } from "react";
import { Dribbble, Facebook, Globe, Instagram, Linkedin, Twitter } from "lucide-react";
import { AuthContext } from "@/contexts/Auth.context";
import { ContactForm } from "@/models/contact.model";
import { sendNotification } from "@/services/contactService";
import { toast } from "sonner";
import { useCMS } from "../CMSProvider.client";
import {
  ConsultingoContactPage,
  ContactSection,
  ContactSectionMain,
} from "@/models/templates/consultingo/consultingo-contact.model";
import { formatUrl } from "@/utils/StringFunctions";
import Link from "next/link";
import { contactUsDummyData } from "./contactUs-dummy-data";

export interface SocialMediaLink {
  platform: string;
  url: string;
}

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  dribbble: Dribbble,
  twitter: Twitter,
};

const ConsultingoContactusRoot: React.FC = () => {
  const { contact } = useCMS();
  const isLoading = contact === undefined;
  const source: ConsultingoContactPage | undefined = !isLoading
    ? ((contact as ConsultingoContactPage | undefined) ?? contactUsDummyData)
    : undefined;

  const primaryColor = source?.color?.primary || "#BC4C37";
  const secondaryColor = source?.color?.secondary || "#4F2910";
  const neutralColor = source?.color?.neutral || "#fcf6e8";

  const data = source?.sections?.find(
    (s: ContactSectionMain): s is ContactSection =>
      s.sectionName === "contactSection" && s.isActive,
  );

  const content = data?.content;

  const auth = useContext(AuthContext);
  const { communityId } = auth;

  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    phoneNumber: "",
    message: "",
    communityId: communityId || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: ContactForm = { ...form, communityId };
      await sendNotification(payload);

      toast.success("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        subject: "",
        phoneNumber: "",
        message: "",
        communityId: communityId || "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const normalize = (s?: string) => (s ?? "").trim();
  return (
    <section
      className="bg-[var(--neu)] min-h-screen py-16 px-6 md:px-12 lg:px-24 font-lexend"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-fraunces text-[var(--pri)]">
          Contact us
        </h1>
      </div>

      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Info */}
        <div className="space-y-8">
          <header>
            <h2 className="text-3xl font-bold text-[var(--sec)] mb-4">
              {content?.heading}
            </h2>
            <p className="text-[var(--sec)]/70 leading-relaxed max-w-md">
              {content?.description}
            </p>
          </header>

          <div className="space-y-6 text-[var(--sec)]">
            <div>
              <h3 className="font-bold text-lg mb-1">Phone</h3>
              <p className="text-[var(--sec)]/70 underline">
                {content?.contactDetails?.phone}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-1">Email</h3>
              <p className="text-[var(--sec)]/70 underline">
                {content?.contactDetails?.email}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-1">Address</h3>
              <p className="text-[var(--sec)]/70">
                {content?.contactDetails?.address}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-1">Business hours</h3>
              {content?.availableTimings?.map?.((item, idx) => (
                <p className="text-[var(--sec)]/70" key={idx}>
                  {item?.day} - {item?.time}
                </p>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="pt-4">
            <h3 className="font-bold text-lg mb-4 text-[var(--sec)]">
              Follow us on
            </h3>
            <div className="flex gap-4">
              {content?.socialLinks?.map(
                (each: SocialMediaLink, idx: number) => {
                  const key = normalize(each.platform).toLowerCase();
                  const Icon = PLATFORM_ICON[key] ?? Globe;
                  const url = formatUrl(each.url) || "/";
                  return (
                    <Link href={url ?? "/"} key={idx}>
                      <SocialIcon icon={<Icon />} />
                    </Link>
                  );
                },
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Form Card */}
        <div className="bg-white p-6 md:p-10 rounded-[20px] md:rounded-[40px] shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[var(--sec)] font-semibold mb-2 ml-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Name"
                required
                className="w-full bg-[var(--neu)] rounded-2xl p-4 focus:ring-2 focus:ring-[var(--pri)] outline-none"
              />
            </div>

            <div>
              <label className="block text-[var(--sec)] font-semibold mb-2 ml-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                placeholder="Enter Email"
                onChange={handleChange}
                required
                className="w-full bg-[var(--neu)] rounded-2xl p-4 focus:ring-2 focus:ring-[var(--pri)] outline-none"
              />
            </div>

            <div>
              <label className="block text-[var(--sec)] font-semibold mb-2 ml-1">
                Phone
              </label>
              <input
                name="phoneNumber"
                type="tel"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                required
                className="w-full bg-[var(--neu)] rounded-2xl p-4 focus:ring-2 focus:ring-[var(--pri)] outline-none"
              />
            </div>

            <div>
              <label className="block text-[var(--sec)] font-semibold mb-2 ml-1">
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full bg-[var(--neu)] rounded-2xl p-4 focus:ring-2 focus:ring-[var(--pri)] outline-none"
              />
            </div>

            <div>
              <label className="block text-[var(--sec)] font-semibold mb-2 ml-1">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-[var(--neu)] rounded-2xl p-4 focus:ring-2 focus:ring-[var(--pri)] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer disabled:cursor-not-allowed bg-[var(--pri)]/90 text-white font-bold py-4 rounded-full text-lg hover:bg-[var(--pri)] transition-colors"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoContactusRoot;

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-10 h-10 bg-[var(--sec)] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
    {icon}
  </div>
);
