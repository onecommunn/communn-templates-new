"use client";

import React, { FC, useContext, useState } from "react";
import { Phone, Mail, Send } from "lucide-react";
import { ContactDetails } from "@/models/templates/yogana/yogana-home-model";
import { ContactForm } from "@/models/contact.model";
import { sendNotification } from "@/services/contactService";
import { toast } from "sonner";
import { AuthContext } from "@/contexts/Auth.context";

interface YoganaContactProps {
  data: ContactDetails;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}

const YoganaContact: FC<YoganaContactProps> = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}) => {
  const auth = useContext(AuthContext);
  const { communityId } = auth;
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    phoneNumber: "",
    message: "",
    communityId: communityId,
  });

  console.log(communityId, "communityId");

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(form, "form");

    try {
      const payload = { ...form, communityId };
      const response = await sendNotification(payload);
      toast.success("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        subject: "",
        phoneNumber: "",
        message: "",
        communityId: communityId,
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-14">
      <style jsx>{`
        .dynamic-input::placeholder {
          color: #888;
          opacity: 1;
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Left: Form */}
          <div>
            <p
              className="font-alex-brush text-2xl"
              style={{ color: primaryColor }}
            >
              Send us email
            </p>
            <h2
              className="mt-1 font-cormorant font-semibold text-4xl md:text-5xl"
              style={{ color: secondaryColor }}
            >
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="dynamic-input h-12 w-full rounded-md px-4 text-sm outline-none transition-colors duration-200"
                  style={{
                    border: `1px solid #e5e5e5`,
                    backgroundColor: `${neutralColor}10`,
                    // color: primaryColor,
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = primaryColor)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#e5e5e5")
                  }
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="dynamic-input h-12 w-full rounded-md px-4 text-sm outline-none transition-colors duration-200"
                  style={{
                    border: `1px solid #e5e5e5`,
                    backgroundColor: `${neutralColor}10`,
                    // color: primaryColor,
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = primaryColor)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#e5e5e5")
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter Subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="dynamic-input h-12 w-full rounded-md px-4 text-sm outline-none transition-colors duration-200"
                  style={{
                    border: `1px solid #e5e5e5`,
                    backgroundColor: `${neutralColor}10`,
                    // color: primaryColor,
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = primaryColor)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#e5e5e5")
                  }
                />

                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter Phone"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="dynamic-input h-12 w-full rounded-md px-4 text-sm outline-none transition-colors duration-200"
                  style={{
                    border: `1px solid #e5e5e5`,
                    backgroundColor: `${neutralColor}10`,
                    // color: primaryColor,
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = primaryColor)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#e5e5e5")
                  }
                />
              </div>

              <textarea
                name="message"
                placeholder="Enter Message"
                rows={6}
                required
                value={form.message}
                onChange={handleChange}
                className="dynamic-input w-full rounded-md px-4 py-3 text-sm outline-none transition-colors duration-200"
                style={{
                  border: `1px solid #e5e5e5`,
                  backgroundColor: `${neutralColor}10`,
                  // color: primaryColor,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = primaryColor)
                }
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
              />

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: primaryColor }}
                className={`inline-flex items-center gap-2 rounded-none px-6 py-3 text-sm font-medium text-white ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "cursor-pointer hover:opacity-95"
                }`}
              >
                {loading ? "SENDING..." : <Send size={16} />}
                {!loading && "SEND MESSAGE"}
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div>
            <p
              style={{ color: primaryColor }}
              className="font-alex-brush text-2xl"
            >
              Need any help?
            </p>
            <h3
              style={{ color: secondaryColor }}
              className="mt-1 font-cormorant font-semibold text-4xl md:text-5xl"
            >
              {data?.heading}
            </h3>
            <p
              style={{ color: neutralColor }}
              className="mt-3 font-plus-jakarta max-w-md text-[16px] leading-relaxed"
            >
              {data?.subHeading}
            </p>

            <div className="mt-8 space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div
                  className="grid h-16 w-16 min-h-16 min-w-16 place-items-center"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Phone className="text-white" />
                </div>
                <div>
                  <p style={{ color: neutralColor }} className="text-sm">
                    Have any question?
                  </p>
                  <p style={{ color: secondaryColor }} className="mt-1 text-md">
                    {data?.call?.value}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div
                  className="grid h-16 w-16 min-h-16 min-w-16 place-items-center"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Mail className="text-white " />
                </div>
                <div>
                  <p className="text-sm" style={{ color: neutralColor }}>
                    Write email
                  </p>
                  <p style={{ color: secondaryColor }} className="mt-1 text-md">
                    {data?.email?.value}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div
                  className="grid h-16 w-16 min-h-16 min-w-16 place-items-center"
                  style={{ backgroundColor: primaryColor }}
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
                  <p className="text-sm" style={{ color: neutralColor }}>
                    Visit anytime
                  </p>
                  <p className="mt-1 text-md" style={{ color: secondaryColor }}>
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
