import { headers } from "next/headers";
import { getCommunityData, Community } from "@/services/communityService";
import { templates } from "@/template-registry";

export default async function DynamicPage({ params }: { params: { subdomain: string; page: string[] } }) {
  const rawHost = (await headers()).get("host") || "";
  const subdomain = rawHost.split(".")[0];
  const response = await getCommunityData(subdomain);
  const community: Community = response.community;
  const path = await params

  const pagePath = path.page.slice(1).join("/");

  const template = community?.template || "default";

  const TemplateComponent =
    templates[template]?.[pagePath] || templates["default"][""];

  if (!TemplateComponent) {
    return <div>404 – Page not found</div>;
  }

  return <TemplateComponent community={community} />;
}
