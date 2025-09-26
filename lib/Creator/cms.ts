// lib/cms.ts (server)
import { unstable_cache } from "next/cache";

type CreatorCMSBundle = {
  header: any | null;
  footer: any | null;
  home: any | null;
  about: any | null;
  contact: any | null;
  // add more pages as needed: events, plans, contact...
};

async function fetchJSON(url: string) {
  try {
    const r = await fetch(url, { cache: "force-cache" });
    return await r.json();
  } catch {
    return null;
  }
}

async function fetchCreatorBundle(
  communityId: string
): Promise<CreatorCMSBundle> {
  const base = "https://communn.io/api/v2.0/cms/get-section/community";
  const [header, footer, home, about, contact] = await Promise.all([
    fetchJSON(`${base}/${communityId}?templateId=creator&page=Header`),
    fetchJSON(`${base}/${communityId}?templateId=creator&page=Footer`),
    fetchJSON(`${base}/${communityId}?templateId=creator&page=Home`),
    fetchJSON(`${base}/${communityId}?templateId=creator&page=about`),
    fetchJSON(`${base}/${communityId}?templateId=creator&page=Contact`),
    // add more pages
  ]);

  return {
    header: header?.data ?? null,
    footer: footer?.data ?? null,
    home: home?.data ?? null,
    about: about?.data ?? null,
    contact: contact?.data ?? null,
    // add more pages
  };
}

// Cache by community, revalidate every 5 minutes (tune as you like)
export const getCreatorCMSBundle = unstable_cache(
  async (communityId: string) => fetchCreatorBundle(communityId),
  ["creator-cms-bundle"],
  { revalidate: 300 }
);
