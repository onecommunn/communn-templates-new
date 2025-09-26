import { Suspense } from "react";
import CreatorHeader from "@/app/creator/_components/CreatorHeader";
import CreatorFooter from "@/app/creator/_components/CreatorFooter";
import CreatorHeaderSkeleton from "@/app/creator/_components/Skeletons/CreatorHeaderSkeleton";
import CreatorFooterSkeleton from "@/app/creator/_components/Skeletons/CreatorFooterSkeleton";
import { Community } from "@/services/communityService";
import { getCreatorCMSBundle } from "@/lib/Creator/cms";
import { CMSProvider } from "./CMSProvider.client";

/** ---- Async server slots with fetch + "nothing if empty" behavior ---- **/

async function HeaderSlot({ communityId }: { communityId: string }) {
  // fetch just header (cached by fetch); if you prefer, extract a getHeader() cache helper
  const res = await fetch(
    `https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=Header`,
    { cache: "force-cache" }
  )
    .then((r) => r.json())
    .catch(() => null);

  const section = res?.data?.sections?.[0];
  if (!section) return null; // <-- NO DATA ⇒ render nothing
  return <CreatorHeader section={section} />;
}

async function FooterSlot({ communityId }: { communityId: string }) {
  const res = await fetch(
    `https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=Footer`,
    { cache: "force-cache" }
  )
    .then((r) => r.json())
    .catch(() => null);

  const section = res?.data?.sections?.[0];
  if (!section) return null; // <-- NO DATA ⇒ render nothing
  return <CreatorFooter section={section} />;
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

  return (
    <>
      {/* Header: skeleton while fetching, nothing if API returns empty */}
      <Suspense fallback={<CreatorHeaderSkeleton />}>
        <HeaderSlot communityId={community._id} />
      </Suspense>

      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>

      {/* Footer: skeleton while fetching, nothing if API returns empty */}
      <Suspense fallback={<CreatorFooterSkeleton />}>
        <FooterSlot communityId={community._id} />
      </Suspense>
    </>
  );
}
