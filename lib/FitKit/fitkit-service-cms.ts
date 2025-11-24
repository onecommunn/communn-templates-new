import { BASE_URL_V2 } from "@/configurations/url.config";

type FitKitServiceCMSBundle = {
  data: any | null;
};

async function fetchJSON(url: string) {
  try {
    const r = await fetch(url, { cache: "no-store" });
    return await r.json();
  } catch {
    return null;
  }
}

export async function fetchFitKitServiceBundle(
  communityId: string,
  serviceName: string
): Promise<FitKitServiceCMSBundle> {
  const url = `${BASE_URL_V2}/cms/get-service-detail/community/${communityId}?templateId=fitkit&service=${serviceName}`;

  const data = await fetchJSON(url);

  return {
    data: data?.data ?? null,
  };
}

