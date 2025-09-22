// app/(_sites)/[subdomain]/[...page]/page.tsx
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getCommunityData, type Community } from "@/services/communityService";
import { templates } from "@/template-registry";

type RouteParams = {
  subdomain: string;
  page?: string[];
};

export default async function DynamicPage({
  params,
}: {
  params: Promise<RouteParams>; // Next 15 dynamic params are a Promise
}) {
  // Await both dynamic APIs
  const { subdomain: subParam, page = [] } = await params;
  const hdrs = await headers(); // <-- await is required on Next 15
  const rawHost = hdrs.get("host") ?? "";

  // Prefer host-derived subdomain when present
  const subdomain = rawHost.split(".")[0] || subParam;

  const { community }: { community: Community } = await getCommunityData(subdomain);

  // Keep your requested .slice(1)
  const pagePath = page.slice(1).join("/");

  const templateKey = community?.template || "default";
  const TemplateComponent =
    templates[templateKey]?.[pagePath] ?? templates["default"]?.[""];

  if (!TemplateComponent) {
    notFound();
  }

  return <TemplateComponent community={community} />;
}
