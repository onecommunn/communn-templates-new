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

const dummyData: CreatorContactPage = {
  templateId: "creator",
  pageName: "Contact",
  sections: [
    {
      email: {
        heading: "Send us an email",
        subHeading:
          "Our community has been the heart of our journey from the start, their unwavering support means the world to us",
        value: "contact@prachiandharsh.com",
      },
      call: {
        heading: "Give us a call",
        subHeading:
          "The strength of our community has been pivotal since day one, and their encouragement is priceless.",
        value: "+91 000000000",
      },
      address: {
        heading: "Find us",
        subHeading:
          "The strength of our community has been pivotal since day one, and their encouragement is priceless.",
        value: "66 broklyn golden street. New York",
      },
      sectionName: "Contact details",
      title: "We’d love to hear from you",
      description:
        "Ready to start your transformation journey? Have questions about my programs? I'd love to hear from you and help you take the next step.",
      order: 0,
      isActive: true,
    },
    {
      sectionName: "CTA Section",
      title: "Stay Inspired",
      description:
        "Get weekly insights, tips, and exclusive content delivered to your inbox. Join over 10,000 people on their growth journey.",
      order: 1,
      isActive: true,
      buttons: [
        {
          label: "Explore All Activities",
          url: "https://prachiandharsh/courses",
        },
      ],
    },
  ],
  status: "published",
  __v: 0,
};

const CreatorContact: React.FC = () => {
  const { contact } = useCMS();
  const isLoading = contact === undefined;
  const data: CreatorContactPage | undefined = !isLoading
    ? (contact as CreatorContactPage | undefined) ?? dummyData
    : undefined;

  const contactDetailsSection = data?.sections.find(
    (s: ContactSection): s is ContactDetailsSection =>
      s.sectionName === "Contact details"
  );
  const contactCTA = data?.sections.find(
    (s: ContactSection): s is CTASection => s.sectionName === "CTA Section"
  );

  const auth = useContext(AuthContext);
  const { communityId } = auth;

  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    phoneNumber: "",
    message: "",
    communityId: communityId || "", // fallback in case auth not ready
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
      const response = await sendNotification(payload);

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

  return (
    <>
      {contactDetailsSection && (
        <section className="py-10 md:py-20 font-inter">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <CreatorSectionHeader
              title={contactDetailsSection.title}
              description={contactDetailsSection.description}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
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
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Mobile Number"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={form.phoneNumber}
                    onChange={handleChange}
                  />
                  <Textarea
                    name="message"
                    placeholder="Enter your Message..."
                    className="min-h-40 pb-2"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="submit"
                    className="cursor-pointer inline-flex items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}{" "}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </form>
              </div>

              {/* Right: Contact Info */}
              <div className="flex flex-col gap-10 justify-center">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-[#F4F4F4] w-12 h-12 flex justify-center items-center">
                    <MapPin />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-semibold font-poppins text-2xl md:text-3xl">
                      {contactDetailsSection?.address?.heading || "Find Us"}
                    </h4>
                    <p>
                      {contactDetailsSection?.address?.value ||
                        "66 broklyn golden street. New York"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-[#F4F4F4] w-12 h-12 flex justify-center items-center">
                    <Mail />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-semibold font-poppins text-2xl md:text-3xl">
                      {contactDetailsSection.email.heading}
                    </h4>
                    <p>{contactDetailsSection.email.value}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-[#F4F4F4] w-12 h-12 flex justify-center items-center">
                    <Phone />
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

      {contactCTA && <CreatorCTA data={contactCTA} />}
    </>
  );
};

export default CreatorContact;
