"use client"
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


const CollectionsContactusRoot: React.FC = () => {
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

  const heroBanner =

    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/89fd1eac478d56fd174ddb3ea12e310db720fa06.jpg";

  return (
    <>


      <div className="min-h-screen bg-background">
        {/* Hero Banner */}
        <Breadcum
          title="Contact Us"
          bannerImage={heroBanner}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Contact Us" },
          ]}

        />
        {/* Contact Section */}
        <section className="py-16 md:py-16 px-4 md:px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              <div className="lg:col-span-6">
                <ContactInfo />
              </div>

              <div className="lg:col-span-6">
                <ContactFormCollection />
              </div>

            </div>
          </div>
        </section>


        {/* Shopping Banner */}
        <ShoppingBanner />

        <div className="relative min-h-[500px] my-20">
          <iframe
            title="Gym location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.96863716412!2d77.49488397531978!3d12.973857787341696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d8fc2f3820b%3A0xbdf67a52213e35be!2sVinutha%20saree%20verse!5e0!3m2!1sen!2sus!4v1767679232427!5m2!1sen!2sus"
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
