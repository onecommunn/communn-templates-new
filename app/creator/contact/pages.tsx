import React from "react";
import CreatorLayout from "../layout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";

const CreatorContact = () => {
  return (
    <CreatorLayout>
      <section className="py-10 md:py-20 font-inter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <CreatorSectionHeader
            title="We’d love to hear from you"
            description="Ready to start your transformation journey? Have questions about my programs? I'd love to hear from you and help you take the next step."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-2xl md:text-5xl font-poppins">
                Get in touch
              </h3>
              <form className="space-y-4 mt-6 max-w-[90%]">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  name="phoneNumber"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
                <Textarea
                  placeholder="Enter your Message..."
                  className="min-h-40 pb-2"
                />
                <Button>
                  Send Message{" "}
                  <span>
                    <ArrowRight />
                  </span>
                </Button>
              </form>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <div className="rounded-full bg-[#F4F4F4] w-12 h-12 p-1 flex justify-center items-center">
                  <Mail />
                </div>
                <div>
                  <h4 className="font-semibold  font-poppins text-2xl md:text-3xl">
                    Send us an email
                  </h4>
                  <p className="text-[16px] ">
                    Our community has been the heart of our journey from the
                    start, their unwavering support means the world to us.
                  </p>
                </div>
                <h4 className="font-semibold text-xl">
                  contact@prachiandharsh.com
                </h4>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-full bg-[#F4F4F4] w-12 h-12 p-1 flex justify-center items-center">
                  <Phone />
                </div>
                <div>
                  <h4 className="font-semibold  font-poppins md:text-3xl text-2xl">
                    Give us a call
                  </h4>
                  <p className="text-[16px] ">
                    The strength of our community has been pivotal since day
                    one, and their encouragement is priceless.
                  </p>
                </div>
                <h4 className="font-semibold text-xl">+91 9882438734</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CreatorLayout>
  );
};

export default CreatorContact;
