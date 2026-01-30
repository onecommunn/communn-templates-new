// app/components/IdCardUI.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";

type IdCardData = {
  label?: string;
  name: string;
  role?: string;
  idNumber: string;
  dob: string;
  city: string;
  phone: string;
  email: string;
  caste: string;
  subCaste: string;
  image: string; // url or /public
};

export default function IdCardUI({
  primaryColor = "#1F514C",
  data = {
    label: "ID CARD",
    name: "JAKE RILEYY",
    role: "Owner",
    idNumber: "9876 - 5432",
    dob: "26 Dec 2004",
    city: "Bangalore",
    phone: "+91 039840948092",
    email: "jakeriley@gmail.com",
    caste: "+91 039840948092",
    subCaste: "jakeriley@gmail.com",
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Rfi8Dzlz5SKxegez4irAvX21mk.jpg.png",
  },
}: {
  primaryColor?: string;
  data?: IdCardData;
}) {
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState(false);

  const fileName = useMemo(() => {
    const sanitize = (name: string) =>
      name
        .trim()
        .replace(/[\/\\?%*:|"<>]/g, "-")
        .replace(/\s+/g, "_")
        .slice(0, 80);
    return `${sanitize(data?.name || "id-card")}.png`;
  }, [data?.name]);

  const handleDownload = async () => {
    if (!exportRef.current) return;

    try {
      setDownloading(true);

      // Ensure any images inside export UI are fully loaded before capture
      const imgs = Array.from(exportRef.current.querySelectorAll("img"));
      await Promise.all(
        imgs.map(
          (img) =>
            new Promise<void>((resolve) => {
              if ((img as HTMLImageElement).complete) return resolve();
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            })
        )
      );

      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: primaryColor,
      });

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Failed to download ID card as image:", err);
      alert("Download failed due to image/CORS issue.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      {/* =======================
          ✅ VISIBLE UI (with button)
         ======================= */}
      <section
        className="w-full"
        style={{ backgroundColor: primaryColor }}
        aria-label="ID Card"
      >
        <div className="mx-auto max-w-[1150px] px-6 md:px-10 py-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            {/* Left */}
            <div className="text-white">
              <div className="flex items-center gap-2 text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                <span className="text-sm tracking-wide">
                  {data?.label ?? "ID CARD"}
                </span>
              </div>

              <h1 className="mt-6 font-serif text-[44px] leading-[1.05] md:text-[56px]">
                {data?.name}
              </h1>

              {data?.role ? (
                <div className="mt-4">
                  <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-[12px] font-medium text-[#111]">
                    {data.role}
                  </span>
                </div>
              ) : null}

              <div className="mt-10 text-[22px] md:text-[26px] font-semibold">
                <span className="opacity-90"># ID :</span>{" "}
                <span className="tracking-wide">{data?.idNumber}</span>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-y-8 md:grid-cols-3 md:gap-x-16">
                <Info label="DOB" value={data?.dob || ""} />
                <Info label="City" value={data?.city || ""} />
                <Info label="Phone" value={data?.phone || ""} />

                <Info label="Email" value={data?.email || ""} />
                <Info label="Caste" value={data?.caste || ""} />
                <Info label="Sub Caste" value={data?.subCaste || ""} />
              </div>

              {/* Download button in visible UI */}
              <div className="mt-12">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-1.5 text-[#111] shadow-sm transition hover:shadow disabled:opacity-60"
                >
                  <span className="text-sm font-semibold">
                    {downloading ? "Downloading..." : "Download"}
                  </span>
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full transition"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Download className="h-4 w-4 text-white" />
                  </span>
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="md:justify-self-end w-full">
              <div className="relative w-full aspect-square overflow-hidden rounded-[28px] bg-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
                <img
                  src={
                   data?.image ?? "https://res.cloudinary.com/dxcob4mbd/image/upload/v1730444104/1_0004_Generative_Fill4_5d54a3f4_d440_4092_a5f5_80867443cd0c_e2417c591c.webp"
                  }
                  alt={data?.name}
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================
          ✅ HIDDEN EXPORT UI (NO BUTTON)
          - This is what we convert to PNG
         ======================= */}
      <div
        className="fixed -left-[99999px] top-0 opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          ref={exportRef}
          style={{ backgroundColor: primaryColor }}
          className="w-[1150px]"
        >
          <div className="px-10 py-10">
            <div className="grid grid-cols-[1.05fr_0.95fr] items-center gap-10">
              {/* Left */}
              <div className="text-white">
                <div className="flex items-center gap-2 text-white/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                  <span className="text-sm tracking-wide">
                    {data?.label ?? "ID CARD"}
                  </span>
                </div>

                <h1 className="mt-6 font-serif text-[56px] leading-[1.05]">
                  {data?.name}
                </h1>

                {data?.role ? (
                  <div className="mt-4">
                    <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-[12px] font-medium text-[#111]">
                      {data.role}
                    </span>
                  </div>
                ) : null}

                <div className="mt-10 text-[26px] font-semibold">
                  <span className="opacity-90"># ID :</span>{" "}
                  <span className="tracking-wide">{data?.idNumber}</span>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-x-16 gap-y-8">
                  <Info label="DOB" value={data?.dob || ""} />
                  <Info label="City" value={data?.city || ""} />
                  <Info label="Phone" value={data?.phone || ""} />

                  <Info label="Email" value={data?.email || ""} />
                  <Info label="Caste" value={data?.caste || ""} />
                  <Info label="Sub Caste" value={data?.subCaste || ""} />
                </div>
              </div>

              {/* Right Image */}
              <div className="justify-self-end">
                <div className="relative w-[560px] aspect-square overflow-hidden rounded-[28px] bg-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
                  <img
                    src={
                      "https://res.cloudinary.com/dxcob4mbd/image/upload/v1730444104/1_0004_Generative_Fill4_5d54a3f4_d440_4092_a5f5_80867443cd0c_e2417c591c.webp"
                    }
                    alt={data?.name}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[18px] font-semibold">{label}</p>
      <p className="mt-3 text-[15px] text-white/90">{value}</p>
    </div>
  );
}
