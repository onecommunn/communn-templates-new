import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

type RestraintCMSBundle = {
  home: any | null;
};

type RestraintServiceCMSBundle = {
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

async function fetchRestraintBundle(
  communityId: string
): Promise<RestraintCMSBundle> {
  const base = `${BASE_URL_V2}/cms/get-section/community`;
  const [home] = await Promise.all([
    fetchJSON(`${base}/${communityId}?templateId=restraint&page=home`),
    // add more pages
  ]);

  return {
    home: home?.data ?? null,
    // add more pages
  };
}

export async function getRestraintCMSBundle(communityId: string) {
  return fetchRestraintBundle(communityId);
}

export async function fetchRestraintServiceBundle(
  communityId: string,
  serviceName: string
): Promise<RestraintServiceCMSBundle> {
  const url = `${BASE_URL_V2}/cms/get-service-detail/community/${communityId}?templateId=restraint&service=${serviceName}`;

  const data = await fetchJSON(url);

  return {
    data: data?.data ?? null,
  };
}
