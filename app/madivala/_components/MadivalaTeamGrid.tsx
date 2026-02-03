// app/components/MembersGrid.tsx
"use client";

import Image from "next/image";

export type Member = {
  id: string;
  name: string;
  phone?: string;
  image: string;
};

type Props = {
  title?: string;
  members: Member[];
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
};

export default function MadivalaTeamGrid({
  title = " ",
  members,
  columns = { base: 2, sm: 3, md: 4, lg: 4 },
}: Props) {
  const gridCols = pickGridCols(columns);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[520px] sm:max-w-[720px] lg:max-w-[1150px] px-6 md:px-0 py-8">
        {/* Title */}
        <h2 className="font-hedvig text-center text-[28px] md:text-[45px] font-[400] leading-tight pb-10 break-words">
          2018-2019 ರಚುನಾವಣೆಯಲ್ಲಿಚುನಾಯಿತರಾದ <br />
          ಸಧಸ್ಯರುಗಳು
        </h2>

        {/* Grid */}
        <div className={`mt-5 grid gap-3 sm:gap-4 ${gridCols}`}>
          {members.map((m) => (
            <MemberCard key={m.id} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ m }: { m: Member }) {
  return (
    <div className="relative overflow-hidden rounded-[12px] bg-[#f2f2f2] shadow-[0_10px_22px_rgba(0,0,0,0.14)]">
      {/* Image */}
      <div className="relative aspect-[1/1.1] w-full">
        <Image
          src={m.image}
          alt={m.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 220px"
          unoptimized
        />

        {/* Bottom overlay like screenshot */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

        {/* Text */}
        <div className="absolute inset-x-0 bottom-0 p-2.5">
          <p className="text-[12px] sm:text-[16px] font-[500] font-inter leading-tight text-white line-clamp-2">
            {m.name}
          </p>
          {m.phone ? (
            <p className="mt-1 text-[10px] sm:text-[14px] font-inter text-white/90">
              {m.phone}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function pickGridCols(cols: Props["columns"]) {
  const base = toGridColClass(cols?.base ?? 2, "base");
  const sm = toGridColClass(cols?.sm ?? 3, "sm");
  const md = toGridColClass(cols?.md ?? 4, "md");
  const lg = toGridColClass(cols?.lg ?? 4, "lg");
  return `${base} ${sm} ${md} ${lg}`;
}

function toGridColClass(n: number, bp: "base" | "sm" | "md" | "lg") {
  const allowed = new Set([1, 2, 3, 4, 5, 6]);
  const safe = allowed.has(n) ? n : 4;

  const cls = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }[safe];

  if (bp === "base") return cls;
  return `${bp}:${cls}`;
}
