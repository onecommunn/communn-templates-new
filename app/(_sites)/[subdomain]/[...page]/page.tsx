// app/(_sites)/[subdomain]/[...page]/page.tsx
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getCommunityData, type Community } from "@/services/communityService";
import { templates } from "@/template-registry";
import { templatePageMeta } from "@/template-meta";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = (h.get("host") || "").split(":")[0];
  const pathname = h.get("x-pathname") || "/";

  const { community } = await getCommunityData(host);
  const templateKey = community?.template || "default";

  const metaFn = templatePageMeta[templateKey]?.[pathname];
  if (metaFn) {
    // MetadataBase is already set in subdomain layout; child can override pieces
    return await metaFn({ community });
  }

  // Fallback
  return { title: community?.name || "Page" };
}

export default async function DynamicPage() {
  const headersList = headers();
  const rawHost = (await headersList).get("host") || "";
  const pathname = (await headersList).get("x-pathname") || "";

  const host = rawHost.split(":")[0];

  const response = await getCommunityData(host);
  const community: Community = response.community;

  const templateKey = community?.template || "default";
  const TemplateComponent =
    templates[templateKey]?.[pathname] ?? templates["default"]?.[""];

  if (!TemplateComponent) {
    notFound();
  }

  return <TemplateComponent community={community} />;
}
