import { Community, getCommunityData } from "@/services/communityService";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const headersList = headers();
  const rawHost = (await headersList).get("host") || "";
  const pathname = (await headersList).get("x-pathname") || "";

  const host = rawHost.split(":")[0];
  const response = await getCommunityData(host);
  const community: Community = response.community;

  // fallback if not found
  const logoUrl = community?.logo || "/app/default-favicon.ico";

  // simplest: redirect browser to the logo
  return NextResponse.redirect(logoUrl, 302);
}
