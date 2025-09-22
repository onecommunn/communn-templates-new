// app/(_sites)/[subdomain]/[...page]/page.tsx
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getCommunityData, type Community } from "@/services/communityService";
import { templates } from "@/template-registry";

export default async function DynamicPage() {
  const headersList = headers();
  const rawHost = (await headersList).get("host") || "";
  const pathname = (await headersList).get("x-pathname") || "";

  console.log('pathname')

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
