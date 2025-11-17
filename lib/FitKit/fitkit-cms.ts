import { BASE_URL_V2 } from "@/configurations/url.config";

type FitKitCMSBundle = {
  home: any | null;
};

async function fetchJSON(url: string) {
  try {
    const r = await fetch(url, { cache: "no-store" });
    return await r.json();
  } catch {
    return null;
  }
}

async function fetchFitKitBundle(
  communityId: string
): Promise<FitKitCMSBundle> {
  const base = `${BASE_URL_V2}/cms/get-section/community`;
  const [home] = await Promise.all([
    fetchJSON(`${base}/${communityId}?templateId=fitkit&page=home`),
    // add more pages
  ]);

  return {
    home: home?.data ?? null,
    // add more pages
  };
}

export async function getFitKitCMSBundle(communityId: string) {
  return fetchFitKitBundle(communityId);
}