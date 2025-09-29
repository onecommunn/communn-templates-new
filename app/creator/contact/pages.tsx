"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Map, MapPin, Phone } from "lucide-react";
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

  if (isLoading) {
    return (
      <>
        <CreatorContactSkeleton />
      </>
    );
  }

  return (
    <>
      {contactDetailsSection ? (
        <section className="py-10 md:py-20 font-inter">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <CreatorSectionHeader
              title={
                contactDetailsSection?.title || "We’d love to hear from you"
              }
              description={
                contactDetailsSection?.description ||
                "Ready to start your transformation journey? Have questions about my programs? I'd love to hear from you and help you take the next step."
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left: Contact form */}
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-2xl md:text-5xl font-poppins">
                  Get in touch
                </h3>

                <form
                  className="space-y-4 mt-6 max-w-[90%]"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: plug form handler
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    aria-label="Full Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    aria-label="Email Address"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    name="phoneNumber"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    aria-label="Mobile Number"
                  />
                  <Textarea
                    placeholder="Enter your Message..."
                    className="min-h-40 pb-2"
                    aria-label="Message"
                  />
                  <Button
                    type="submit"
                    className="cursor-pointer inline-flex items-center gap-2"
                  >
                    Send Message <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              {/* Right: Email & Phone blocks */}
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <div className="rounded-full bg-[#F4F4F4] w-12 h-12 p-1 flex justify-center items-center">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="font-semibold font-poppins text-2xl md:text-3xl">
                      {contactDetailsSection?.address?.heading || "Find Us"}
                    </h4>
                    {/* <p className="text-[16px] ">
                      {contactDetailsSection?.call?.subHeading ||
                        "The strength of our community has been pivotal since day one, and their encouragement is priceless."}
                    </p> */}
                  </div>
                  <h4 className=" text-xl">
                    {contactDetailsSection?.address?.value ||
                      "66 broklyn golden street. New York"}
                  </h4>
                </div>
                {/* Email */}
                <div className="flex flex-col gap-4">
                  <div className="rounded-full bg-[#F4F4F4] w-12 h-12 p-1 flex justify-center items-center">
                    <Mail />
                  </div>
                  <div>
                    <h4 className="font-semibold font-poppins text-2xl md:text-3xl">
                      {contactDetailsSection?.email?.heading ||
                        "Send us an email"}
                    </h4>
                    {/* <p className="text-[16px] ">
                      {contactDetailsSection?.email?.subHeading ||
                        "Our community has been the heart of our journey from the start, their unwavering support means the world to us."}
                    </p> */}
                  </div>
                  <h4 className="text-xl break-all">
                    {contactDetailsSection?.email?.value ||
                      "contact@example.com"}
                  </h4>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-4">
                  <div className="rounded-full bg-[#F4F4F4] w-12 h-12 p-1 flex justify-center items-center">
                    <Phone />
                  </div>
                  <div>
                    <h4 className="font-semibold font-poppins text-2xl md:text-3xl">
                      {contactDetailsSection?.call?.heading || "Give us a call"}
                    </h4>
                    {/* <p className="text-[16px] ">
                      {contactDetailsSection?.call?.subHeading ||
                        "The strength of our community has been pivotal since day one, and their encouragement is priceless."}
                    </p> */}
                  </div>
                  <h4 className=" text-xl">
                    {contactDetailsSection?.call?.value || "+91 0000000000"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : isLoading ? (
        <CreatorContactSkeleton />
      ) : (
        <></>
      )}

      {contactCTA ? <CreatorCTA data={contactCTA} /> : null}
    </>
  );
};

export default CreatorContact;
