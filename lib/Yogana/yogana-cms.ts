type YoganaCMSBundle = {
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

async function fetchCreatorBundle(
  communityId: string
): Promise<YoganaCMSBundle> {
  const base = "https://communn.io/api/v2.0/cms/get-section/community";
  const [home] = await Promise.all([
    fetchJSON(`${base}/${communityId}?templateId=yogana&page=home`),
    // add more pages
  ]);

  return {
    home: home?.data ?? null,
    // add more pages
  };
}

export async function getYoganaCMSBundle(communityId: string) {
  return fetchCreatorBundle(communityId);
}