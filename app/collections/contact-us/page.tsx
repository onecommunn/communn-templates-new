"use client";
import React, { FormEvent, useContext, useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { AuthContext } from "@/contexts/Auth.context";
import { ContactForm } from "@/models/contact.model";
import { sendNotification } from "@/services/contactService";
import { toast } from "sonner";
import Breadcum from "./_components/Breadcum";
import ContactInfo from "./_components/ContactInfo";
import ShoppingBanner from "./_components/ShoppingBanner";
import ContactFormCollection from "./_components/ContactForm";
import { useCMS } from "../CMSProvider.client";
import { ContactdummyData } from "./contact-dummy-data";
import {
  CollectionsContactPage,
  ContactSection,
  HeroSection,
  ContactFormSection,
  ContactInfoSection,
  CTASection,
} from "@/models/templates/collections/collections-contact-model";

const CollectionsContactusRoot: React.FC = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: CollectionsContactPage | undefined = !isLoading
    ? (home as CollectionsContactPage | undefined) ?? ContactdummyData
    : undefined;

  const primaryColor = source?.color?.primary ?? "#C09932";
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

  const heroSectionData = source?.sections?.find(
    (s: ContactSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive
  );

  const contactInfoSection = source?.sections?.find(
    (s: ContactSection): s is ContactInfoSection =>
      s.sectionName === "contactInfoSection" && s.isActive
  );

  const contactFormSection = source?.sections?.find(
    (s: ContactSection): s is ContactFormSection =>
      s.sectionName === "contactFormSection" && s.isActive
  );

  const ctaSection = source?.sections?.find(
    (s: ContactSection): s is CTASection =>
      s.sectionName === "ctaSection" && s.isActive
  );

  const heroBanner =
    heroSectionData?.content?.media ??
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/89fd1eac478d56fd174ddb3ea12e310db720fa06.jpg";

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Banner */}
        {heroSectionData && (
          <Breadcum
            title={heroSectionData?.content?.heading}
            bannerImage={heroBanner}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
          />
        )}

        {/* Contact Section */}
        <section className="py-16 md:py-16 px-4 md:px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                {contactInfoSection && (
                  <ContactInfo
                    data={contactInfoSection}
                    primaryColor={primaryColor}
                  />
                )}
              </div>

              <div className="lg:col-span-6">
                {contactFormSection && (
                  <ContactFormCollection
                    data={contactFormSection}
                    primaryColor={primaryColor}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Shopping Banner */}
        {ctaSection && (
          <ShoppingBanner data={ctaSection} primaryColor={primaryColor} />
        )}

        <div className="relative min-h-[500px] my-20">
          <iframe
            title={contactInfoSection?.content?.contact?.location ?? "Location"}
            src={contactInfoSection?.content?.contact?.googleMapLink}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </>
  );
};

export default CollectionsContactusRoot;
