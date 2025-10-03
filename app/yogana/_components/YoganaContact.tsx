"use client";

import React, { FC } from "react";
import { Phone, Mail, Send } from "lucide-react";
import { ContactDetails } from "@/models/templates/yogana/yogana-home-model";

interface YoganaContactProps {
  data: ContactDetails;
}

const YoganaContact: FC<YoganaContactProps> = ({ data }) => {
  const gold = "#C2A74E";

  return (
    <section id="contact" className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Left: Form */}
          <div>
            <p className="font-alex-brush text-2xl text-[#C2A74E]">
              Send us email
            </p>
            <h2 className="mt-1 font-cormorant font-semibold text-4xl md:text-5xl text-neutral-900">
              Send Us a Message
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: handle submit
              }}
              className="mt-8 space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  required
                  className="h-12 w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-[#C2A74E]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                  className="h-12 w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-[#C2A74E]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter Subject"
                  className="h-12 w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-[#C2A74E]"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone"
                  className="h-12 w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-[#C2A74E]"
                />
              </div>

              <textarea
                name="message"
                placeholder="Enter Message"
                rows={6}
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-[#C2A74E]"
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-none cursor-pointer bg-[#C2A74E] px-6 py-3 text-sm font-medium text-white hover:opacity-95"
              >
                <Send size={16} />
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div>
            <p className="font-alex-brush text-2xl text-[#C2A74E]">
              Need any help?
            </p>
            <h3 className="mt-1 font-cormorant font-semibold text-4xl md:text-5xl text-neutral-900">
              {data?.heading}
            </h3>
            <p className="mt-3 font-plus-jakarta max-w-md text-[16px] leading-relaxed text-neutral-600">
              {data?.subHeading}
            </p>

            <div className="mt-8 space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div
                  className="grid h-16 w-16 place-items-center"
                  style={{ backgroundColor: gold }}
                >
                  <Phone className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-700">
                    Have any question?
                  </p>
                  <p className="mt-1 text-lg text-neutral-800">
                    {data?.call?.value}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div
                  className="grid h-16 w-16 place-items-center"
                  style={{ backgroundColor: gold }}
                >
                  <Mail className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-700">
                    Write email
                  </p>
                  <p className="mt-1 text-lg text-neutral-800">
                    {data?.email?.value}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div
                  className="grid h-16 w-16 place-items-center"
                  style={{ backgroundColor: gold }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-700">
                    Visit anytime
                  </p>
                  <p className="mt-1 text-lg text-neutral-800">
                    {data?.address?.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoganaContact;
