import Link from "next/link";
import React from "react";

const FitkitServiceHero = ({
  primaryColor,
  secondaryColor,
}: {
  secondaryColor: string;
  primaryColor: string;
}) => {
  return (
    <section
      className="relative w-full md:h-[90vh] overflow-hidden text-white bg-[#F41E1E] "
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 bg-white w-[40%]" />

      {/* Background image */}
      <div className="absolute inset-0 service-clip">
        <img
          key={"fitkit-hero-bg-image02.png"}
          src={"/assets/fitkit-hero-bg-image02.png"}
          alt="fitkit-hero-bg-image02"
          className="h-full w-full object-cover brightness-50"          
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-[var(--pri)]/30" />
      </div>

      <div className="relative container px-6 md:px-20 mx-auto py-20 md:py-0 z-10 font-kanit h-full">
        <div className="grid items-center gap-6 md:grid-cols-[1.05fr_.95fr] h-full">
          <div className="text-white md:ml-2">
            <h1 className="leading-[0.95] text-[42px] font-bold uppercase md:text-[70px]">
              <span className="block">Unlock your potential</span>
              <span className="block text-white">with out peoaching</span>
            </h1>
            <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/85 md:text-[16px] font-archivo">
              Gym workouts are structured exercise sessions conducted in a
              fitness facility equipped with various machines.
            </p>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <Link href={"/"}>
                <button className="bg-[var(--sec)] px-8 py-4 text-sm font-bold font-archivo tracking-wide text-white shadow-[0_10px_30px_rgba(220,38,38,0.35)] transition hover:bg-red-500">
                  join now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitkitServiceHero;
