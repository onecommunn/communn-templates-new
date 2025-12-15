import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

type MartivoCMSBundle = {
  home: any | null;
};

type MartivoServiceCMSBundle = {
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

async function fetchMartivoBundle(
  communityId: string
): Promise<MartivoCMSBundle> {
  const base = `${BASE_URL_V2}/cms/get-section/community`;
  const [home] = await Promise.all([
    fetchJSON(`${base}/${communityId}?templateId=martivo&page=home`),
    // add more pages
  ]);

  return {
    home: home?.data ?? null,
    // add more pages
  };
}

export async function getMartivoCMSBundle(communityId: string) {
  return fetchMartivoBundle(communityId);
}

export async function fetchMartivoServiceBundle(
  communityId: string,
  serviceName: string
): Promise<MartivoServiceCMSBundle> {
  const url = `${BASE_URL_V2}/cms/get-service-detail/community/${communityId}?templateId=martivo&service=${serviceName}`;

  const data = await fetchJSON(url);

  return {
    data: data?.data ?? null,
  };
}
