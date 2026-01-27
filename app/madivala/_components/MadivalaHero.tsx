// app/components/HeroKannada.tsx
"use client";

import Image from "next/image";
import { ArrowRight, MapPin, Footprints } from "lucide-react";
import Link from "next/link";

type Props = {
    title1?: string;
    title2?: string;
    tagline?: string;
    location?: string;
    subtitle?: string;
    primaryCta?: string;
    secondaryCta?: string;
    photoSrc?: string;
    photoAlt?: string;
    photoCaption?: string;
};

export default function MadivalaHero({
    title1 = "ಕರ್ನಾಟಕರಾಜ್ಯ ಮಡಿವಾಳರ",
    title2 = "ಸಂಘ",
    tagline = "Unity • Service • Empowerment",
    location = "Karnataka",
    subtitle = "In the footsteps of Sri Madivala Machideva",
    primaryCta = "Join Our Community",
    secondaryCta = "Donate/Support",
    photoSrc = "/person.jpg",
    photoAlt = "Leader photo",
    photoCaption = "ಶ್ರೀ ಸಿ ನಂಜಪ್ಪ \n ಅಧ್ಯಕ್ಷರು",
}: Props) {
    return (
        <section className="w-full my-5">
            <div className="mx-auto w-full max-w-[1150px] px-4 sm:px-6 lg:px-0">
                <div className="rounded-[28px] bg-[#1f5652] p-6 sm:p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                    <div className="grid gap-8 lg:grid-cols-[1.25fr_0.85fr] lg:items-stretch">
                        {/* LEFT */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-white">
                                <span className="block text-[34px] leading-[1.1] sm:text-[44px] font-hedvig decoration-[#2aa7ff] decoration-[3px] underline-offset-[10px]">
                                    {title1}
                                </span>
                                <span className="mt-4 block text-[34px] leading-[1.1] sm:text-[44px] font-hedvig decoration-[#2aa7ff] decoration-[3px] underline-offset-[10px]">
                                    {title2}
                                </span>
                            </h1>

                            <div className="mt-7 space-y-2 text-white/90">
                                <p className="text-[15px] font-inter font-[500] sm:text-[20px]">{tagline}</p>

                                <div className="flex font-inter items-center gap-2 text-[15px] sm:text-[16px]">
                                    <MapPin className="h-4 w-4 text-[#ff5b5b]" />
                                    <span className="text-[15px] font-inter font-[500] sm:text-[20px]">{location}</span>
                                </div>

                                <div className="flex font-inter items-center gap-2 text-[15px] sm:text-[16px]">
                                    <Footprints className="h-4 w-4 text-[#ff5b5b]" />
                                    <span className="text-[15px] font-inter font-[500] sm:text-[20px]">{subtitle}</span>
                                </div>
                            </div>

                            <div className="mt-7 flex flex-wrap items-center gap-4">
                                <Link href="/join-member" aria-label="Login">
                                    <button
                                        className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 text-[18px] font-inter font-semibold text-[#0f2f2d] shadow-sm transition hover:shadow-md"
                                        type="button"

                                    >
                                        {primaryCta}
                                        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#163f3c] text-white transition group-hover:translate-x-0.5">
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </button>
                                </Link>

                                <button
                                    className="inline-flex items-center rounded-full bg-transparent px-1 py-2.5 text-[18px] font-inter font-semibold text-white/90 hover:text-white"
                                    type="button"
                                >
                                    {secondaryCta}
                                </button>
                            </div>
                        </div>

                        {/* RIGHT CARD */}
                        <div className="flex lg:justify-end">
                            <div className="w-full max-w-[360px] overflow-hidden rounded-[22px] bg-[#0a5a7a] shadow-[0_22px_55px_rgba(0,0,0,0.22)]">
                                <div className="relative aspect-[4/5] w-full">
                                    <Image
                                        src={photoSrc}
                                        alt={photoAlt}
                                        fill
                                        className="object-cover object-top"
                                        priority
                                    />
                                </div>

                                <div className="bg-[#ff1025] px-6 py-6 text-center">
                                    <p className="whitespace-pre-line text-[18px] font-semibold leading-snug text-white">
                                        {photoCaption}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
