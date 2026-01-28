// app/components/IdCardUI.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";

type IdCardData = {
    label?: string; // "ID CARD"
    name: string; // "JAKE RILEYY"
    role?: string; // "Owner"
    idNumber: string; // "9876 - 5432"
    dob: string; // "26 Dec 2004"
    city: string; // "Bangalore"
    phone: string; // "+91 039840948092"
    email: string; // "jakeriley@gmail.com"
    caste: string; // "..."
    subCaste: string; // "..."
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
    onDownload,
}: {
    primaryColor?: string;
    data?: IdCardData;
    onDownload?: () => void;
}) {
    return (
        <section
            className="w-full"
            style={{ backgroundColor: primaryColor }}
            aria-label="ID Card"
        >
            <div className="mx-auto max-w-[1150px] px-6 md:px-10 py-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
                    {/* Left */}
                    <div className="text-white">
                        {/* Eyebrow */}
                        <div className="flex items-center gap-2 text-white/90">
                            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                            <span className="text-sm tracking-wide">{data.label ?? "ID CARD"}</span>
                        </div>

                        {/* Name */}
                        <h1 className="mt-6 font-serif text-[44px] leading-[1.05] md:text-[56px]">
                            {data.name}
                        </h1>

                        {/* Role pill */}
                        {data.role ? (
                            <div className="mt-4">
                                <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-[12px] font-medium text-[#111]">
                                    {data.role}
                                </span>
                            </div>
                        ) : null}

                        {/* ID */}
                        <div className="mt-10 text-[22px] md:text-[26px] font-semibold">
                            <span className="opacity-90"># ID :</span>{" "}
                            <span className="tracking-wide">{data.idNumber}</span>
                        </div>

                        {/* Details grid */}
                        <div className="mt-10 grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-16">
                            <Info label="DOB" value={data.dob} />
                            <Info label="City" value={data.city} />
                            <Info label="Phone" value={data.phone} />

                            <Info label="Email" value={data.email} />
                            <Info label="Caste" value={data.caste} />
                            <Info label="Sub Caste" value={data.subCaste} />
                        </div>

                        {/* Download */}
                        <div className="mt-12">
                            <button
                                type="button"
                                onClick={onDownload}
                                className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-1.5 text-[#111] shadow-sm transition hover:shadow"
                            >
                                <span className="text-sm font-semibold">Download PDF</span>
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
                    <div className="md:justify-self-end">
                        <div className="relative w-full max-w-[560px] h-[560px] overflow-hidden rounded-[28px] bg-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
                            <Image
                                src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/95eacd45-1680-493c-bd7a-32feb5afb50d.png"
                                alt={data.name}
                                fill
                                className="object-cover object-center"
                                unoptimized
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
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
