import CreatorHeader from "@/app/creator/_components/CreatorHeader";
import CreatorFooter from "@/app/creator/_components/CreatorFooter";
import CreatorHeaderSkeleton from "@/app/creator/_components/Skeletons/CreatorHeaderSkeleton";
import CreatorFooterSkeleton from "@/app/creator/_components/Skeletons/CreatorFooterSkeleton";
import { CreatorHeaderPage } from "@/models/templates/creator/creator-header.model";
import { CreatorFooterPage } from "@/models/templates/creator/creator-footer-model";
import { Community } from "@/services/communityService";

/** Use native fetch + caching on the server */
async function fetchHeaderFooter(communityId: string) {
  const [h, f] = await Promise.all([
    fetch(`https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=Header`, { cache: "force-cache" }).then(r => r.json()).catch(() => null),
    fetch(`https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=Footer`, { cache: "force-cache" }).then(r => r.json()).catch(() => null),
  ]);
  return {
    header: (h?.data ?? null) as CreatorHeaderPage | null,
    footer: (f?.data ?? null) as CreatorFooterPage | null,
  };
}

export default async function CreatorShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const communityId = community._id;
  const { header, footer } = await fetchHeaderFooter(communityId);

  const headerSection = header?.sections?.[0];
  const footerSection = footer?.sections?.[0];

  return (
    <>
      {headerSection ? <CreatorHeader section={headerSection} /> : <CreatorHeaderSkeleton />}
      <main>{children}</main>
      {footerSection ? <CreatorFooter section={footerSection} /> : <CreatorFooterSkeleton />}
    </>
  );
}
