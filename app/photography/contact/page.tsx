"use client";
import React, { useState, FormEvent, useEffect } from "react";
import PhotographyBreadcum from "../_components/PhotographyBreadcum";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { ContactForm } from "@/models/contact.model";
import { useCommunity } from "@/hooks/useCommunity";
import { sendNotification } from "@/services/contactService";

const PhotographyContactRoot = () => {
  const { communityId } = useCommunity();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    phoneNumber: "",
    message: "",
    communityId: communityId || "",
  });

  // ✅ keep communityId synced
  useEffect(() => {
    if (communityId) {
      setForm((prev) => ({
        ...prev,
        communityId,
      }));
    }
  }, [communityId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: ContactForm = {
        ...form,
        communityId: communityId || "",
      };

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

  return (
    <>
      <PhotographyBreadcum
        heading="Contact Us"
        title="Get in Touch"
        image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80"
      />

      <section className="py-20 px-4 bg-[#121212] text-[#EFECE7]">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl font-bold mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-[#1A1A1A] py-2 h-auto border-[#2A2A2A] text-[#EFECE7] font-raleway rounded-none"
              />

              <Input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-[#1A1A1A] py-2 h-auto border-[#2A2A2A] text-[#EFECE7] font-raleway rounded-none"
              />

              {/* ✅ Fixed phone field binding */}
              <Input
                type="tel"
                placeholder="Your Phone"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
                className="bg-[#1A1A1A] py-2 h-auto border-[#2A2A2A] text-[#EFECE7] font-raleway rounded-none"
              />

              <Textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={10}
                className="bg-[#1A1A11A] min-h-[80px] border-[#2A2A2A] text-[#EFECE7] font-raleway rounded-none"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E0A24D] rounded-none text-[#0d0d0d] hover:bg-[#E0A24D]/90 font-raleway uppercase tracking-widest"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-display text-3xl font-bold mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone
                  className="text-[#E0A24D] mt-1 flex-shrink-0"
                  size={20}
                />
                <div>
                  <p className="font-raleway font-semibold text-sm mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+917022779616"
                    className="text-[#8c8c8c] font-raleway text-sm hover:text-[#E0A24D] transition-colors block"
                  >
                    7022779616
                  </a>
                  <a
                    href="tel:+919606177802"
                    className="text-[#8c8c8c] font-raleway text-sm hover:text-[#E0A24D] transition-colors block"
                  >
                    9606177802
                  </a>
                </div>
              </div>
              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <MessageCircle
                  className="text-[#E0A24D] mt-1 flex-shrink-0"
                  size={20}
                />
                <div>
                  <p className="font-raleway font-semibold text-sm mb-1">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/917022779616?text=Hi%2C%20I%20am%20interested%20in%20your%20photography%20services.%20Can%20we%20discuss%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8c8c8c] font-raleway text-sm hover:text-[#E0A24D] transition-colors"
                  >
                    7022779616
                  </a>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="text-[#E0A24D] mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-raleway font-semibold text-sm mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:Vipulvikki07@gmail.com"
                    className="text-[#8c8c8c] font-raleway text-sm hover:text-[#E0A24D] transition-colors"
                  >
                    Vipulvikki07@gmail.com
                  </a>
                </div>
              </div>
              {/* Locations */}
              <div className="flex items-start gap-4">
                <MapPin
                  className="text-[#E0A24D] mt-1 flex-shrink-0"
                  size={20}
                />
                <div>
                  <p className="font-raleway font-semibold text-sm mb-1">
                    Main Branch – Chitradurga
                  </p>
                  <p className="text-[#8c8c8c] font-raleway text-sm">
                    Dharmashala Road, Near Megha Lodge, <br /> Chitradurga,
                    Karnataka 577501
                  </p>
                  <a
                    href="https://www.google.com/maps?q=14.451021194458008,75.90921783447266&z=17&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E0A24D] font-body text-xs mt-1 inline-block hover:underline"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin
                  className="text-[#E0A24D] mt-1 flex-shrink-0"
                  size={20}
                />
                <div>
                  <p className="font-raleway font-semibold text-sm mb-1">
                    Branch – Davanagere
                  </p>
                  <p className="text-[#8c8c8c] font-raleway text-sm">
                    Near Ayyappa Swamy Temple, B.I.E.T College Road, <br /> 13th
                    Main, 5th Cross, M.C.C. 'B' Block, <br /> Davanagere 577004
                  </p>
                  <a
                    href="https://www.google.com/maps?q=14.222463607788086,76.4011459350586&z=17&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E0A24D] font-body text-xs mt-1 inline-block hover:underline"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Embedded Maps */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


              {/* Davanagere */}
              <div>
                <p className="font-raleway text-xs text-[#8c8c8c] mb-2">
                  Main  Branch – Chitradurga
                </p>
                <div className="aspect-video border border-[#2A2A2A] overflow-hidden rounded-md">
                  <iframe
                    src="https://maps.google.com/maps?q=14.222463607788086,76.4011459350586&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Davanagere Office Location"
                  />
                </div>
              </div>

              {/* Chitradurga */}
              <div>
                <p className="font-raleway text-xs text-[#8c8c8c] mb-2">
                  Branch – Davanagere
                </p>
                <div className="aspect-video border border-[#2A2A2A] overflow-hidden rounded-md">
                  <iframe
                    src="https://maps.google.com/maps?q=14.451021194458008,75.90921783447266&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Chitradurga Office Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PhotographyContactRoot;
