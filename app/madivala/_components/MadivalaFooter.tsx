"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, Globe } from "lucide-react";
import {
    FooterSection,
    SocialMediaLink,
} from "@/models/templates/restraint/restraint-home-model";
import { formatUrl } from "@/utils/StringFunctions";
import Image from "next/image";




type DefaultFooterProps = {
    logo: string;
    name: string;
    socialLinks: any[];
    adminName?: string;
    fullAddress?: string;
    zipCode?: string;
};

export default function MadivalaFooter({
    logo,
    name,
    socialLinks,
    fullAddress,
}: DefaultFooterProps) {

    const normalize = (s?: string) => (s ?? "").trim();

    console.log(name, "name")

    const menu = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Events", href: "/events" },
        { label: "Contact", href: "/contact" },
    ];

    const year = new Date().getFullYear();

    console.log(socialLinks, "socialLinks")

    return (
        <footer
            className="w-full bg-[#f3f3f3]"

        >

            <div className="mx-auto w-full max-w-[1150px] px-0 py-15">
                <div
                    className="
            grid
            grid-cols-1
            gap-10
            md:grid-cols-[2.2fr_0.55fr_0.65fr_0.9fr]
            md:gap-16
            items-start
          "
                >

                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative h-[30px] shrink-0 md:h-[40px] w-[30px] md:w-[40px] rounded-full overflow-hidden">
                                <Image
                                    src={
                                        logo ??
                                        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group 238944.svg"
                                    }
                                    alt="Logo"
                                    width={48}
                                    height={48}
                                    unoptimized
                                    priority
                                />
                            </div>
                            <span className="text-[#1F514C] font-hedvig font-bold md:text-lg text-xs truncate max-w-[150px] md:max-w-[600px] block">
                                {name}
                            </span>
                        </Link>

                        <p className="text-[14px] font-inter text-[#636363]">

                            <>
                                Unity • Service • Empowerment <br />
                                In the footsteps of Sri Madivala <br />
                                Machideva
                            </>

                        </p>
                    </div>

                    {/* Menu */}
                    <div className="space-y-4">
                        <p className="text-[16px] font-inter font-medium text-[#141414]">
                            Menu
                        </p>

                        <ul className="space-y-2">
                            {menu.map((m) => (
                                <li key={m.label}>
                                    <Link
                                        href={m.href}
                                        className="text-[14px] text-[#656565] transition hover:text-[#141414]"
                                    >
                                        {m.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className="space-y-4">
                        <p className="text-[16px] font-inter font-medium text-[#141414]">
                            Follow us:
                        </p>

                        <ul className="space-y-2">
                            {(socialLinks ?? []).filter((x) => (x?.value ?? "").trim().length > 0).length ? (
                                (socialLinks ?? [])
                                    .filter((x) => (x?.value ?? "").trim().length > 0)
                                    .map((each: any, idx: number) => {
                                        const key = normalize(each?.type).toLowerCase(); // ✅ type
                                        const url = formatUrl(each?.value) || "/";        // ✅ value
                                        const label = key ? key.charAt(0).toUpperCase() + key.slice(1) : "Social";

                                        return (
                                            <li key={each?._id ?? idx}>
                                                <Link
                                                    href={url}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 text-[14px] text-[#656565] transition hover:text-[#141414]"
                                                >
                                                    <span>{label}</span>
                                                </Link>
                                            </li>
                                        );
                                    })
                            ) : (
                                <>
                                    <li className="text-[14px] text-[#656565]">Instagram</li>
                                    <li className="text-[14px] text-[#656565]">Linkedin</li>
                                    <li className="text-[14px] text-[#656565]">Twitter</li>
                                </>
                            )}
                        </ul>
                    </div>



                    <div className="space-y-4">
                        <p className="text-[16px] font-inter font-medium text-[#141414]">
                            Contact
                        </p>

                        <div className="space-y-2 text-[14px] text-[#656565] leading-relaxed">
                            {/* Emails */}
                            <p>{"info@madivalarasangha.in"}</p>
                            <p>support@madivalarasangha.in</p>



                            {/* Phones */}
                            <p>
                                Sales: {"954-648-1802"}
                            </p>
                            <p>
                                Support: {"963-612-1782"}
                            </p>

                            {/* Address */}
                            <p className="whitespace-pre-line">
                                {fullAddress ||
                                    `#7, Sirur Park Rd, Jai Bheema
Nagar, Seshadripuram,
Bengaluru, Karnataka 560020`}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom center line like your design */}
                <div className="mt-14 flex items-center justify-center gap-3 text-[14px] text-[#8a8a8a]">
                    <span>{"Copyright@2026"}</span>
                    <span className="h-1 w-1 rounded-full bg-[#1f5652]" />
                    <span>{"Madivalarasangha"}</span>
                </div>
            </div>
        </footer>
    );
}
