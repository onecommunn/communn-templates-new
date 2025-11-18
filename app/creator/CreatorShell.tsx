import { Suspense } from "react";
import CreatorHeader from "@/app/creator/_components/CreatorHeader";
import CreatorFooter from "@/app/creator/_components/CreatorFooter";
import CreatorHeaderSkeleton from "@/app/creator/_components/Skeletons/CreatorHeaderSkeleton";
import CreatorFooterSkeleton from "@/app/creator/_components/Skeletons/CreatorFooterSkeleton";
import { Community } from "@/services/communityService";
import { getCreatorCMSBundle } from "@/lib/Creator/cms";
import { CMSProvider } from "./CMSProvider.client";
import { CreatorHeaderPage } from "@/models/templates/creator/creator-header.model";
import { CreatorFooterPage } from "@/models/templates/creator/creator-footer-model";
import { fetchCreatorContact } from "@/services/creatorService";
import { BASE_URL_V2 } from "@/configurations/url.config";
import { CreatorContactPage } from "@/models/templates/creator/creator-contact.model";
import Link from "next/link";
import PhoneIcon from "@/components/icons/PhoneIcon";
import WhatsappIcon from "@/components/icons/WhatsappIcon";

const dummyHeaderData: CreatorHeaderPage = {
  templateId: "creator",
  pageName: "header",
  color: {
    primary: "#fff",
    secondary: "#000",
  },
  sections: [
    {
      sectionName: "headerSection",
      order: 0,
      isActive: true,
      content: {
        media: [
          "https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2F062e0f3cd667449793b24103817a0704",
        ],
        buttons: [
          {
            label: "Home",
            url: "/",
          },
          {
            label: "About us",
            url: "/about",
          },
          {
            label: "Plans",
            url: "/plans",
          },
          {
            label: "Events",
            url: "/events",
          },
          {
            label: "Contact",
            url: "/contact",
          },
        ],
      },
    },
  ],
  status: "published",
  __v: 2,
};

const dummyFooterData: CreatorFooterPage = {
  templateId: "creator",
  pageName: "footer",
  color: {
    primary: "#fff",
    secondary: "#000",
  },
  sections: [
    {
      content: {
        logo: "https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2F062e0f3cd667449793b24103817a0704",
        navigationColumns: [
          {
            heading: "Company",
            links: [
              {
                label: "Privacy Policy",
                url: "/privacy-policy",
              },
              {
                label: "Terms and conditions",
                url: "/terms-condition",
              },
              {
                label: "Contact",
                url: "/contact",
              },
            ],
          },
          {
            heading: "Navigation",
            links: [
              {
                label: "About us",
                url: "/about",
              },
              {
                label: "Plans",
                url: "/plans",
              },
              {
                label: "Events",
                url: "/events",
              },
            ],
          },
        ],
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram/prachiandharsh",
          },
          {
            platform: "Facebook",
            url: "https://facebook/prachiandharsh",
          },
          {
            platform: "Twitter",
            url: "https://twitter/prachiandharsh",
          },
        ],
        copyrightText: "©nammayoga, All rights reserved",
      },
      sectionName: "footerSection",
      order: 0,
      isActive: true,
    },
  ],
  status: "published",
  __v: 0,
};

const dummyData: CreatorContactPage = {
  templateId: "creator",
  pageName: "contact",
  color: {
    primary: "#fff",
    secondary: "#000",
  },
  sections: [
    {
      sectionName: "contactSection",
      order: 0,
      isActive: true,
      content: {
        title: "We’d love to hear from you",
        description:
          "Ready to start your transformation journey? Have questions about my programs? I'd love to hear from you and help you take the next step.",
        email: {
          heading: "Send us an email",
          subHeading:
            "Our community has been the heart of our journey from the start, their unwavering support means the world to us",
          value: "contact@prachiandharsh.com",
        },
        call: {
          heading: "Give us a call",
          subHeading:
            "The strength of our community has been pivotal since day one, and their encouragement is priceless.",
          value: "+91 7904125027",
        },
        address: {
          heading: "Visit us",
          value:
            "NO.25/1, BDA SITE, NO.735/A, 3rd Main Rd, 2nd Phase, Gokula 1st Stage, MATHIKERE, Yeswanthpur, Bengaluru, Karnataka 560054",
        },
      },
    },
    {
      sectionName: "ctaSection",
      order: 1,
      isActive: true,
      content: {
        title: "Stay Inspired",
        description:
          "Get weekly insights, tips, and exclusive content delivered to your inbox. Join over 10,000 people on their growth journey.",
        buttons: [
          {
            label: "Explore All Activities",
            url: "https://prachiandharsh/courses",
          },
        ],
      },
    },
  ],
  status: "published",
};

/** ---- Async server slots with fetch + "nothing if empty" behavior ---- **/

async function HeaderSlot({
  communityId,
  primaryColor,
  secondaryColor,
}: {
  communityId: string;
  primaryColor: string;
  secondaryColor: string;
}) {
  // fetch just header (cached by fetch); if you prefer, extract a getHeader() cache helper
  const res = await fetch(
    `${BASE_URL_V2}/cms/get-section/community/${communityId}?templateId=creator&page=header`,
    { cache: "no-store" }
  )
    .then((r) => r.json())
    .catch(() => null);

  const section = res?.data?.sections?.[0] || dummyHeaderData.sections[0];
  if (!section) return null; // <-- NO DATA ⇒ render nothing
  return (
    <CreatorHeader
      section={section}
      primaryColor={res?.data?.color?.primary || primaryColor}
      secondaryColor={res?.data?.color?.secondary || secondaryColor}
    />
  );
}

async function FooterSlot({
  communityId,
  primaryColor,
  secondaryColor,
}: {
  communityId: string;
  primaryColor: string;
  secondaryColor: string;
}) {
  const res = await fetch(
    `${BASE_URL_V2}/cms/get-section/community/${communityId}?templateId=creator&page=footer`,
    { cache: "no-store" }
  )
    .then((r) => r.json())
    .catch(() => null);

  const contact: any = await fetchCreatorContact(communityId);
  const address = contact?.data?.sections[0] ?? dummyData?.sections[0];

  const section = res?.data?.sections?.[0] || dummyFooterData.sections[0];
  if (!section) return null; // <-- NO DATA ⇒ render nothing
  return (
    <CreatorFooter
      section={section}
      address={address}
      primaryColor={res?.data?.color?.primary || primaryColor}
      secondaryColor={res?.data?.color?.secondary || secondaryColor}
    />
  );
}

/** --------------------------- Shell --------------------------- **/

export default async function CreatorShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  // Load the bundle for page content (home/about/contact…) once, server-side.
  // This is awaited, but header/footer will stream independently via Suspense.
  const bundle = await getCreatorCMSBundle(community._id);

  // Optional: decide an initial loading state for pages (not for header/footer).
  const initialLoading = !bundle?.home || !bundle?.about || !bundle?.contact;

  const primaryColor = bundle?.header?.color?.primary || "#fff";
  const secondaryColor = bundle?.header?.color?.secondary || "#000";

  const contact: any = await fetchCreatorContact(community._id);
  const address = contact?.data?.sections[0] ?? dummyData?.sections[0];
  return (
    <>
      {/* Header: skeleton while fetching, nothing if API returns empty */}
      {/* Call Button */}
      <Link
        href={`tel:${address?.content?.call?.value}`}
        target="_blank"
        title="Call us"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        className="fixed flex items-center justify-center bottom-[2%] left-[2%]! z-[99] bg-white border-none outline-none cursor-pointer w-[50px] h-[50px] rounded-full"
      >
        <button>
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
        href={`https://api.whatsapp.com/send?phone=${address?.content?.call?.value}&text=Hi`}
        target="_blank"
        data-bs-toggle="tooltip"
        data-bs-html="true"
        title="WhatsApp Us"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          backgroundImage: "linear-gradient(to right, #59ee75, #28d045)",
        }}
        className="fixed flex items-center justify-center bottom-[2%] right-[2%]! z-[99] text-white border-none outline-none cursor-pointer w-[50px] h-[50px] rounded-full"
      >
        <button>
          <WhatsappIcon
            style={{
              color: "#fff",
              width: "40px",
              height: "40px",
            }}
          />
        </button>
      </Link>
      <Suspense
        fallback={
          <CreatorHeaderSkeleton
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        }
      >
        <HeaderSlot
          communityId={community._id}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </Suspense>

      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>

      {/* Footer: skeleton while fetching, nothing if API returns empty */}
      <Suspense
        fallback={
          <CreatorFooterSkeleton
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        }
      >
        <FooterSlot
          communityId={community._id}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </Suspense>
    </>
  );
}
