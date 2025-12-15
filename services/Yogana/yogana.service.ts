import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

type YoganaCMSBundle = {
  home: any | null;
};

type YoganaServiceCMSBundle = {
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

async function fetchYoganaBundle(
  communityId: string
): Promise<YoganaCMSBundle> {
  const base = `${BASE_URL_V2}/cms/get-section/community`;
  const [home] = await Promise.all([
    fetchJSON(`${base}/${communityId}?templateId=yogana&page=home`),
  ]);

  return {
    home: home?.data ?? null,
  };
}

export async function getYoganaCMSBundle(communityId: string) {
  return fetchYoganaBundle(communityId);
}

export async function fetchYoganaServiceBundle(
  communityId: string,
  serviceName: string
): Promise<YoganaServiceCMSBundle> {
  const url = `${BASE_URL_V2}/cms/get-service-detail/community/${communityId}?templateId=yogana&service=${serviceName}`;

  const data = await fetchJSON(url);

  return {
    data: data?.data ?? null,
  };
}
