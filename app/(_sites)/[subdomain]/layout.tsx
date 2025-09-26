import { headers } from "next/headers";
import { ReactNode } from "react";
import { getCommunityData, type Community } from "@/services/communityService";
import { templateLayouts } from "@/template-registry";

export default async function SitesLayout({ children }: { children: ReactNode }) {
  const h = await headers();
  const host = (h.get("host") || "").split(":")[0];

  const { community } = await getCommunityData(host);
  const templateKey = community?.template || "default";

  const Layout = templateLayouts[templateKey] ?? templateLayouts["default"];
  return <Layout community={community}>{children}</Layout>;
}
