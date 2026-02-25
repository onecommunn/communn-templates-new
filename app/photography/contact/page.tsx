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
import { useCMS } from "../CMSProvider.client";
import {
  PhotograpyContactPage,
  HeroSection,
  ContactPageSection,
  ContactSection,
} from "@/models/templates/photography/photography-contact-model";
import { contactDummyData } from "./contact-dummy-data";

const PhotographyContactRoot = () => {
  const { communityId } = useCommunity();
  const { contact } = useCMS();
  const isLoading = contact === undefined;
  const source: PhotograpyContactPage | undefined = !isLoading
    ? ((contact as PhotograpyContactPage | undefined) ?? contactDummyData)
    : undefined;

  const heroSectionData: HeroSection | undefined = source?.sections?.find(
    (s: ContactPageSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive,
  );

  const contactSection: ContactSection | undefined = source?.sections?.find(
    (s: ContactPageSection): s is ContactSection =>
      s.sectionName === "contactSection" && s.isActive,
  );

  const contactSectionContent = contactSection?.content;

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
      {heroSectionData && (
        <PhotographyBreadcum
          heading={heroSectionData?.content?.heading}
          title={heroSectionData?.content?.title}
          image={heroSectionData?.content?.image}
        />
      )}

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
          {contactSectionContent && (
            <>
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
                      {contactSectionContent?.phoneNumbers?.map((p, idx) => (
                        <a
                          key={idx}
                          href={`tel:${p}`}
                          className="text-[#8c8c8c] font-raleway text-sm hover:text-[#E0A24D] transition-colors block"
                        >
                          {p}
                        </a>
                      ))}
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
                      {contactSectionContent?.whatsappNumber?.map((m, idx) => (
                        <a
                          href={`https://wa.me/${m}`}
                          target="_blank"
                          key={idx}
                          rel="noopener noreferrer"
                          className="text-[#8c8c8c] font-raleway text-sm hover:text-[#E0A24D] transition-colors"
                        >
                          {m}
                        </a>
                      ))}
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail
                      className="text-[#E0A24D] mt-1 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <p className="font-raleway font-semibold text-sm mb-1">
                        Email
                      </p>
                      {contactSectionContent?.email?.map((e, idx) => (
                        <a
                          href={`mailto:${e}`}
                          key={idx}
                          className="text-[#8c8c8c] font-raleway text-sm hover:text-[#E0A24D] transition-colors"
                        >
                          {e}
                        </a>
                      ))}
                    </div>
                  </div>
                  {/* Locations */}
                  {contactSectionContent?.branches?.map((br, idx) => (
                    <div className="flex items-start gap-4" key={idx}>
                      <MapPin
                        className="text-[#E0A24D] mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <p className="font-raleway font-semibold text-sm mb-1">
                          {br.title}
                        </p>
                        <p className="text-[#8c8c8c] font-raleway text-sm">
                          {br.address}
                        </p>
                        <a
                          href={br?.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E0A24D] font-body text-xs mt-1 inline-block hover:underline"
                        >
                          View on Google Maps →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* Embedded Maps */}
              <div className="col-span-1 md:col-span-2 mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {contactSectionContent?.branches?.map((br, idx) => (
                    <div key={idx}>
                      <p className="font-raleway text-xs text-[#8c8c8c] mb-2">
                        {br?.title}
                      </p>
                      <div className="aspect-video border border-[#2A2A2A] overflow-hidden rounded-md">
                        <iframe
                          src={br.embedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          title="Davanagere Office Location"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PhotographyContactRoot;
