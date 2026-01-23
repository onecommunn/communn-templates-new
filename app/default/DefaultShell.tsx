import React from "react";
import { Community } from "@/services/communityService";
import DefaultHeader from "./_components/DefaultHeader";
import DefaultFooter from "./_components/DefaultFooter";
import { CMSProvider } from "./CMSProvider.client";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import Link from "next/link";
import PhoneIcon from "@/components/icons/PhoneIcon";

export default async function DefaultShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = { community: community };
  const source = bundle?.community;
  const initialLoading = !bundle?.community;

  const creatorMember = source.members.find(
    (member) => member.user?._id === source.createdBy,
  );

  const adminName = creatorMember?.user?.firstName;

  const pramodcolors = {
    primaryColor: "#ef3340",
    secondaryColor: "#d2d6c0",
    textcolor: "#000",
  };

  const defaultColors = {
    primaryColor: "#2952A2",
    secondaryColor: "#2952A2",
    textcolor: "#fff",
  };

  const color =
    community?._id === "692c12e23571140d3e5d3ab0"
      ? pramodcolors
      : defaultColors;

  return (
    <>
      <Link
        href={`tel:${source?.phoneNumber}`}
        target="_blank"
        title="Call us"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        className="fixed flex items-center justify-center bottom-[7%] left-[2%]! z-[99] bg-white border-none outline-none cursor-pointer w-[50px] h-[50px] rounded-full"
      >
        <button className="cursor-pointer">
          <PhoneIcon
            style={{
              color: "#000",
              width: "30px",
              height: "30px",
            }}
          />
        </button>
      </Link>

      {/* whatsapp Button */}
      <Link
        href={`https://api.whatsapp.com/send?phone=${source?.phoneNumber}&text=${"Hi"}`}
        target="_blank"
        data-bs-toggle="tooltip"
        data-bs-html="true"
        title="WhatsApp Us"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          backgroundImage: "linear-gradient(to right, #59ee75, #28d045)",
        }}
        className="fixed flex items-center justify-center bottom-[7%] right-[2%]! z-[99] text-white border-none outline-none cursor-pointer w-[50px] h-[50px] rounded-full"
      >
        <button className="cursor-pointer">
          <WhatsappIcon
            style={{
              color: "#fff",
              width: "40px",
              height: "40px",
            }}
          />
        </button>
      </Link>
      <DefaultHeader name={source?.name} logo={source?.logo} colors={color} />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>

      <DefaultFooter
        name={source?.name}
        logo={source?.logo}
        socialLinks={source?.socialLinks}
        adminName={adminName}
        fullAddress={source?.fullAddress}
        zipCode={source?.zipCode || ""}
      />
    </>
  );
}
