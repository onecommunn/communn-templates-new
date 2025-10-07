"use client";

import React, { useState, useContext, FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import {
  ContactDetailsSection,
  ContactSection,
  CreatorContactPage,
  CTASection,
} from "@/models/templates/creator/creator-contact.model";
import CreatorCTA from "../_components/CreatorCTA";
import CreatorContactSkeleton from "../_components/Skeletons/CreatorContactSkeleton";
import { useCMS } from "../CMSProvider.client";
import { AuthContext } from "@/contexts/Auth.context";
import { sendNotification } from "@/services/contactService";
import { toast } from "sonner";
import { ContactForm } from "@/models/contact.model";

const CreatorContact: React.FC = () => {
  const { contact } = useCMS();
  const isLoading = contact === undefined;
  const data: CreatorContactPage | undefined = !isLoading
    ? (contact as CreatorContactPage | undefined)
    : undefined;

  const contactDetailsSection = data?.sections.find(
    (s: ContactSection): s is ContactDetailsSection =>
      s.sectionName === "contactSection"
  );
  const contactCTA = data?.sections.find(
    (s: ContactSection): s is CTASection => s.sectionName === "ctaSection"
  );

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  if (isLoading) return <CreatorContactSkeleton />;

  const primaryColor = data?.color?.primary || "#fff";
  const secondaryColor = data?.color?.secondary || "#000";

  return (
    <>
      {contactDetailsSection && (
        <section
          className="py-10 md:py-20 font-inter relative overflow-hidden"
          style={{ backgroundColor: primaryColor }}
        >
          {/* ::before pseudo-element using CSS variable */}
          <style jsx>{`
            section::before {
              content: "";
              position: absolute;
              inset: 0;
              background-color: ${secondaryColor};
              opacity: 0.05;
              z-index: 0;
            }
          `}</style>

          <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
            <CreatorSectionHeader
              title={contactDetailsSection.title}
              description={contactDetailsSection.description}
              textColor={secondaryColor}
            />

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center"
              style={{ color: secondaryColor }}
            >
              {/* Left: Contact Form */}
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-2xl md:text-5xl font-poppins">
                  Get in touch
                </h3>

                <form
                  className="space-y-4 mt-6 max-w-[90%]"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full rounded-md border px-3 py-2 text-sm shadow-none"
                    style={{
                      border: `1px solid ${secondaryColor}`,
                      borderRadius: "6px",
                      padding: "0.75rem 1rem",
                      outline: "none",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${secondaryColor}10`; // 25% opacity
                      e.currentTarget.style.borderColor = secondaryColor;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = secondaryColor;
                    }}
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    style={{
                      border: `1px solid ${secondaryColor}`,
                      borderRadius: "6px",
                      padding: "0.75rem 1rem",
                      outline: "none",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${secondaryColor}10`; // 25% opacity
                      e.currentTarget.style.borderColor = secondaryColor;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = secondaryColor;
                    }}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    style={{
                      border: `1px solid ${secondaryColor}`,
                      borderRadius: "6px",
                      padding: "0.75rem 1rem",
                      outline: "none",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${secondaryColor}10`; // 25% opacity
                      e.currentTarget.style.borderColor = secondaryColor;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = secondaryColor;
                    }}
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Mobile Number"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    style={{
                      border: `1px solid ${secondaryColor}`,
                      borderRadius: "6px",
                      padding: "0.75rem 1rem",
                      outline: "none",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${secondaryColor}10`; // 25% opacity
                      e.currentTarget.style.borderColor = secondaryColor;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = secondaryColor;
                    }}
                    value={form.phoneNumber}
                    onChange={handleChange}
                  />
                  <div className="relative">
                    <Textarea
                      name="message"
                      placeholder="Enter your Message..."
                      className="min-h-40 pb-2"
                      style={{
                        border: `1px solid ${secondaryColor}`,
                        borderRadius: "6px",
                        padding: "0.75rem 1rem",
                        outline: "none",
                        transition: "all 0.3s ease",
                        color: secondaryColor,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 0 3px ${secondaryColor}10`; // 10% opacity
                        e.currentTarget.style.borderColor = secondaryColor;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = secondaryColor;
                      }}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />

                    {/* Placeholder color */}
                    <style>{`
                      textarea::placeholder {
                        color: ${secondaryColor}80; /* 50% opacity for placeholder */
                      }
                    `}</style>
                  </div>

                  <Button
                    type="submit"
                    className="cursor-pointer inline-flex items-center gap-2"
                    style={{ backgroundColor: secondaryColor }}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}{" "}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </form>
              </div>

              {/* Right: Contact Info */}
              <div className="flex flex-col gap-10 justify-center">
                {/** Address */}
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-full w-12 h-12 min-w-12 min-h-12 flex justify-center items-center"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    <MapPin className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-semibold font-poppins text-2xl md:text-3xl">
                      {contactDetailsSection?.address?.heading || "Find Us"}
                    </h4>
                    <p>{contactDetailsSection?.address?.value}</p>
                  </div>
                </div>

                {/** Email */}
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-full w-12 h-12 min-w-12 min-h-12 flex justify-center items-center"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    <Mail className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-semibold font-poppins text-2xl md:text-3xl">
                      {contactDetailsSection.email.heading}
                    </h4>
                    <p>{contactDetailsSection.email.value}</p>
                  </div>
                </div>

                {/** Phone */}
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-full w-12 h-12 min-w-12 min-h-12 flex justify-center items-center"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    <Phone className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-semibold font-poppins text-2xl md:text-3xl">
                      {contactDetailsSection.call.heading}
                    </h4>
                    <p>{contactDetailsSection.call.value}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {contactCTA && (
        <CreatorCTA
          data={contactCTA}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
    </>
  );
};

export default CreatorContact;
