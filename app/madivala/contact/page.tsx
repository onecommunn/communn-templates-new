"use client";

import React, { useState } from "react";

const image =
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/8f68bfdc4ae00eeb7c7d81d120aae2f08f742580.png-2026-01-29T10-31-43-944Z.png";

const MadivalaContactPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  const onChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate your API here
    console.log("Contact form submit:", form);
  };

  return (
    <main className="w-full bg-white px-4 py-10 md:py-14 font-inter">
      <section className="mx-auto w-full max-w-7xl">
        {/* Card */}
        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT */}
            <div className="bg-[#1F5A55] px-6 py-8 md:px-10 md:py-10">
              <div className="text-white">
                <div className="mb-4 flex items-center gap-2 text-base font-medium opacity-90">
                  <span className="text-base leading-none">•</span>
                  <span>Contact us</span>
                </div>

                <h1 className="text-3xl font-[500] leading-tight md:text-5xl font-hedvig">
                  Get in touch with our
                  <br />
                  experts team
                </h1>
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-5">
                <div>
                  <input
                    value={form.fullName}
                    onChange={onChange("fullName")}
                    placeholder="Full Name"
                    className="h-11 w-full rounded-lg bg-[#2B6A65] px-4 text-sm text-white placeholder:text-white/70 outline-none ring-0 focus:bg-[#2f726c]"
                  />
                </div>

                <div>
                  <input
                    value={form.email}
                    onChange={onChange("email")}
                    placeholder="Email Address"
                    type="email"
                    className="h-11 w-full rounded-lg bg-[#2B6A65] px-4 text-sm text-white placeholder:text-white/70 outline-none ring-0 focus:bg-[#2f726c]"
                  />
                </div>

                <div>
                  <input
                    value={form.mobile}
                    onChange={onChange("mobile")}
                    placeholder="Mobile Number"
                    inputMode="numeric"
                    className="h-11 w-full rounded-lg bg-[#2B6A65] px-4 text-sm text-white placeholder:text-white/70 outline-none ring-0 focus:bg-[#2f726c]"
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-2 inline-flex items-center gap-3 rounded-full bg-[#2B6A65] px-4 py-2 text-sm font-medium text-white/95 hover:bg-[#327a74] focus:outline-none"
                >
                  Submit your Form
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#1F5A55] transition-transform group-hover:translate-x-0.5">
                    {/* Arrow icon */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 5L20 12L13 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
              </form>
            </div>

            {/* RIGHT */}
            <div className="relative min-h-[260px] md:min-h-[420px] max-h-[606px]">
              <img
                src={image}
                alt="Support"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {/* subtle overlay to match design vibe */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-black/0" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MadivalaContactPage;
