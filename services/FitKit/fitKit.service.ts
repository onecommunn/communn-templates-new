import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

type FitKitCMSBundle = {
  home: any | null;
};

type FitKitServiceCMSBundle = {
  data: any | null;
};

async function fetchJSON(url: string) {
  try {
    const r = await axios.get(url);
    return r.data;
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
