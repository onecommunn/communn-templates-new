import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

type SpawellCMSBundle = {
  home: any | null;
};

type SpawellServiceCMSBundle = {
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

async function fetchSpawellBundle(
  communityId: string
): Promise<SpawellCMSBundle> {
  const base = `${BASE_URL_V2}/cms/get-section/community`;
  const [home] = await Promise.all([
    fetchJSON(`${base}/${communityId}?templateId=spawell&page=home`),
    // add more pages
  ]);

  return {
    home: home?.data ?? null,
    // add more pages
  };
}

export async function getSpawellCMSBundle(communityId: string) {
  return fetchSpawellBundle(communityId);
}

export async function fetchSpawellServiceBundle(
  communityId: string,
  serviceName: string
): Promise<SpawellServiceCMSBundle> {
  const url = `${BASE_URL_V2}/cms/get-service-detail/community/${communityId}?templateId=spawell&service=${serviceName}`;

  const data = await fetchJSON(url);

  return {
    data: data?.data ?? null,
  };
}
