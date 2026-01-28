
"use client";

import Image from "next/image";

type TeamMember = {
    id: string;
    name: string;
    role: string;
    location?: string;
    image: string;
};

type Props = {
    title?: string;
    eyebrow?: string;
    members?: TeamMember[];
    primaryColor?: string;
};

export default function MadivalaTeamOne({
    eyebrow = "• Team",
    title = "ಕುಲಗುರು ವೀರಶೈವಂತಿ ಮಡಿವಾಳ\nಮಠಾಧೀಶರು",
    primaryColor = "#1F514C",
    members = [
        {
            id: "1",
            name: "ಶ್ರೀಶ್ರೀಶ್ರೀ\nಶಿವಯೋಗಾನಂದಪ್ಪಜಿ",
            role: "ಸ್ವಾಮೀಜಿ",
            image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/WWbcr9xA8ezJ0nrGh99vBWXbBs.jpg.png",
        },
        {
            id: "2",
            name: "ಶ್ರೀಶ್ರೀಶ್ರೀ\nಮುಕ್ತಾನಂದ",
            role: "ಸ್ವಾಮೀಜಿ",
            image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/tems1.png",
        },
        {
            id: "3",
            name: "ಶ್ರೀಶ್ರೀಶ್ರೀ\nಮಠಾಧೀಶ",
            role: "ಸ್ವಾಮೀಜಿ",
            image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/WWbcr9xA8ezJ0nrGh99vBWXbBs.jpg (2).png",
        },
        {
            id: "4",
            name: "ಶ್ರೀಶ್ರೀ\nಬಸವ ರಾಜೇಂದ್ರ",
            role: "ಶರಣ",
            image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/tem4.png",
        },
    ],
}: Props) {
    return (
        <section className="w-full bg-[#FAFAFA]">
            <div className="mx-auto w-full max-w-[1150px] px-4 sm:px-6 lg:px-0 py-10 sm:py-14">
                {/* Header */}
                <div className="text-center mb-10 md:mb-10 space-y-3">
                    <p
                        style={{ color: primaryColor }}
                        className="flex items-center justify-center gap-2 font-inter text-2xl md:text-[16px]"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#1F514C]"></span>
                        Team
                    </p>

                    <h2
                        style={{ color: "#000000" }}
                        className="font-hedvig text-[28px] md:text-[45px] font-[400] leading-tight"
                    >
                        ಕುಲಗುರು ವೀರಶೈವಂತಿ ಮಡಿವಾಳ <br /> ಮಠಾಧೀಶರು
                    </h2>

                </div>

                {/* Grid */}
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {members.map((m) => (
                        <TeamCard key={m.id} member={m} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TeamCard({ member }: { member: TeamMember }) {
    return (
        <div className="group relative overflow-hidden rounded-[22px] bg-[#f3f3f3] shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
            {/* Image */}
            <div className="relative aspect-[4/5] w-full">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                    priority={false}
                    unoptimized
                />

                {/* Soft vignette / dark overlay at bottom */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                {/* Text overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="whitespace-pre-line text-[18px] font-semibold leading-snug text-white">
                        {member.name}
                    </p>

                    <div className="mt-2 flex flex-col gap-0.5">
                        <p className="text-[13px] font-medium text-white/90">{member.role}</p>
                        {member.location ? (
                            <p className="text-[12px] text-white/70">{member.location}</p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
