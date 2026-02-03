"use client";

import React, { useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";

type IdCardData = {
  label?: string;
  name: string;
  role?: string;
  idNumber: string;
  phone: string;
  email: string;
  caste: string;
  subCaste: string;
  image: string;
  address?: string;
};

export default function IdCardUI({
  primaryColor = "#1F514C",
  data = {
    label: "Madivala Sangha",
    name: "JAKE RILEYY",
    role: "Member",
    idNumber: "9876 - 5432",
    phone: "+91 XXXXXXXXXX",
    email: "info@gmail.com",
    caste: "+91 XXXXXXXXXX",
    subCaste: "jakeriley@gmail.com",
    address: "127 sdjksajdkjdsey Bangalore.",
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Rfi8Dzlz5SKxegez4irAvX21mk.jpg.png",
  },
}: {
  primaryColor?: string;
  data?: IdCardData;
}) {
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!exportRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(exportRef.current, { pixelRatio: 3 });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${data.name.replace(/\s+/g, "_")}_ID_Card.png`;
      a.click();
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-10 bg-white min-h-screen font-inter">
      {/* Container for Side-by-Side View */}
      <div ref={exportRef} className="flex flex-col md:flex-row gap-6 p-6 bg-transparent">
        {/* FRONT CARD */}
        <div className="w-[350px] h-[600px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">
          {/* Top Dark Section */}
          <div
            style={{ backgroundColor: primaryColor }}
            className="h-[350px] text-white overflow-hidden rounded-br-[100px] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-8 mt-8">
              <span className="text-sm font-medium">Madivala Sangha</span>
            </div>

            {/* Name */}
            <h1 className="my-3 px-8 text-4xl tracking-tight leading-tight uppercase font-hedvig font-normal break-words">
              {data.name}
            </h1>

            {/* Bottom Row (Role + Image) */}
            <div className="flex justify-between items-end mt-auto">
              <div className="px-8 pb-6 self-start">
                <span className="bg-white text-black font-inter px-4 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                  {data.role}
                </span>
              </div>

              {/* Image */}
              <div className="w-48 h-60 rounded-tl-[100px] overflow-hidden">
                <img
                  src={`/api/image-proxy?url=${encodeURIComponent(data.image)}`}
                  alt="Profile"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Bottom White Section */}
          <div className="flex-1 p-8 flex flex-col gap-4 font-inter">
            <div>
              <p className="text-[#1F514C] font-bold text-[24px]/[24px] tracking-tighter">
                # ID : <br /> {data.idNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InfoField
                label="Phone"
                value={data.phone}
                color={primaryColor}
              />
              <InfoField
                label="Caste"
                value={data.caste}
                color={primaryColor}
              />
              <InfoField
                label="Email"
                value={data.email}
                color={primaryColor}
              />
              <InfoField
                label="Sub Caste"
                value={data.subCaste}
                color={primaryColor}
              />
            </div>
          </div>
        </div>

        {/* BACK CARD */}
        <div className="w-[350px] h-[600px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">
          <div className="p-8 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-inter font-medium text-[#1F514C]">
                Madivala Sangha
              </span>
              <div className="h-[2px] flex-1 bg-[#1F514C] mr-10"></div>
            </div>

            <h2 className="text-5xl font-hedvig text-[#1F514C] mb-4">
              Terms and <br /> Conditions
            </h2>

            <div className="space-y-4">
              <p className="font-bold text-[#1F514C]">Usage Guidelines</p>
              <ul className="text-sm text-gray-600 list-disc ml-4 space-y-2">
                <li>
                  Lorem ipsum dolor sit amet consectetur. Blandit id vel feugiat
                  sit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur. Blandit id vel feugiat
                  sit. Lorem ipsum dolor sit amet.
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Section with Curve */}
          <div
            style={{ backgroundColor: primaryColor }}
            className="h-fit p-8 pb-12 text-white relative rounded-tr-[100px]"
          >
            <div className="grid grid-cols-2 gap-4 mr-4">
              {data.address && (
                <div>
                  <p className="font-bold mb-2">Address</p>
                  <p className="text-[10px] opacity-80 leading-relaxed max-w-[120px]">
                    {data.address}
                  </p>
                </div>
              )}
              <div>
                <p className="font-bold mb-2">Contact</p>
                <ul className="list-disc ml-4">
                  <li className="text-sm">+91 847487823</li>
                  <li className="text-sm">info@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={downloading}  
        className="flex items-center cursor-pointer gap-2 bg-[#1F514C] text-white px-8 py-3 rounded-full hover:scale-105 transition-transform"
      >
        <Download size={20} />
        {downloading ? "Generating PNG..." : "Download"}
      </button>
    </div>
  );
}

function InfoField({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex flex-col">
      <span style={{ color }} className="text-sm font-bold capitalize">
        {label}
      </span>
      <span className="text-xs text-[#1F514C] break-all">{value}</span>
    </div>
  );
}
