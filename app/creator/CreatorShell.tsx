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
  ],
  status: "published",
  __v: 2,
};

const dummyFooterData: CreatorFooterPage = {
  templateId: "creator",
  pageName: "footer",
  sections: [
    {
      footer: {
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
    `https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=Header`,
    { cache: "no-store" }
  )
    .then((r) => r.json())
    .catch(() => null);

  const section = res?.data?.sections?.[0] || dummyHeaderData.sections[0];
  if (!section) return null; // <-- NO DATA ⇒ render nothing
  return (
    <CreatorHeader
      section={section}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
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
    `https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=Footer`,
    { cache: "no-store" }
  )
    .then((r) => r.json())
    .catch(() => null);

  const contact: any = await fetchCreatorContact(communityId);
  const address = contact?.data?.sections[0];

  const section = res?.data?.sections?.[0] || dummyFooterData.sections[0];
  if (!section) return null; // <-- NO DATA ⇒ render nothing
  return (
    <CreatorFooter
      section={section}
      address={address}
      secondaryColor={secondaryColor}
      primaryColor={primaryColor}
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

  const primaryColor = "#fff";
  const secondaryColor = "#000";

  return (
    <>
      {/* Header: skeleton while fetching, nothing if API returns empty */}
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
