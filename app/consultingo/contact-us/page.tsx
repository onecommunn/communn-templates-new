"use client"
import React, { FormEvent, useContext, useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { AuthContext } from "@/contexts/Auth.context";
import { ContactForm } from "@/models/contact.model";
import { sendNotification } from "@/services/contactService";
import { toast } from "sonner";

const ConsultingoContactusRoot: React.FC = () => {
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

  return (
    <section className="bg-[#FDF7E9] min-h-screen py-16 px-6 md:px-12 lg:px-24 font-lexend">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-fraunces text-[#B85C44]">
          Contact us
        </h1>
      </div>

      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Info */}
        <div className="space-y-8">
          <header>
            <h2 className="text-3xl font-bold text-[#4A2C19] mb-4">
              Get in touch with us
            </h2>
            <p className="text-[#6B5E54] leading-relaxed max-w-md">
              We're here to answer any questions you have and help you get
              started on your journey to success. Reach out to us through any of
              the following methods, and a member of our team will be in touch
              shortly.
            </p>
          </header>

          <div className="space-y-6 text-[#4A2C19]">
            <div>
              <h3 className="font-bold text-lg mb-1">Phone</h3>
              <p className="text-[#6B5E54] underline">(123) 456-7890</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-1">Email</h3>
              <p className="text-[#6B5E54] underline">hello@example.com</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-1">Address</h3>
              <p className="text-[#6B5E54]">
                Chicago HQ Estica Cop. Macomb, MI 48042
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-1">Business hours</h3>
              <p className="text-[#6B5E54]">
                Monday to Friday: 9:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="pt-4">
            <h3 className="font-bold text-lg mb-4 text-[#4A2C19]">
              Follow us on
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#4A2C19] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#4A2C19] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#4A2C19] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Form Card */}
        <div className="bg-white p-6 md:p-10 rounded-[20px] md:rounded-[40px] shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#4A2C19] font-semibold mb-2 ml-1">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-[#F3EDE0] border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#B85C44] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#4A2C19] font-semibold mb-2 ml-1">
                Email
              </label>
              <input
                value={form.email}
                onChange={handleChange}
                required
                type="email"
                className="w-full bg-[#F3EDE0] border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#B85C44] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#4A2C19] font-semibold mb-2 ml-1">
                Phone
              </label>
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={handleChange}
                required
                className="w-full bg-[#F3EDE0] border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#B85C44] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#4A2C19] font-semibold mb-2 ml-1">
                Subject
              </label>
              <input
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full bg-[#F3EDE0] border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#B85C44] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#4A2C19] font-semibold mb-2 ml-1">
                Message
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-[#F3EDE0] border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#B85C44] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B85C44] text-white font-bold py-4 rounded-full text-lg hover:bg-[#a14e38] transition-colors mt-4"
            >
              {loading ? "Sending" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoContactusRoot;
