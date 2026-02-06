import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

type ConsultingoCMSBundle = {
  home: any | null;
  aboutUs: any | null;
  contact: any | null;
};

type ConsultingoServiceCMSBundle = {
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

async function fetchConsultingoBundle(
  communityId: string
): Promise<ConsultingoCMSBundle> {
  const base = `${BASE_URL_V2}/cms/get-section/community`;
  const [home, aboutUs, contact] = await Promise.all([
    fetchJSON(`${base}/${communityId}?templateId=consultingo&page=home`),
    fetchJSON(`${base}/${communityId}?templateId=consultingo&page=aboutUs`),
    fetchJSON(`${base}/${communityId}?templateId=consultingo&page=contact`),
    // add more pages
  ]);

  return {
    home: home?.data ?? null,
    aboutUs: aboutUs?.data ?? null,
    contact: contact?.data ?? null,
    // add more pages
  };
}

export async function getConsultingoCMSBundle(communityId: string) {
  return fetchConsultingoBundle(communityId);
}

export async function fetchConsultingoServiceBundle(
  communityId: string,
  serviceName: string
): Promise<ConsultingoServiceCMSBundle> {
  const url = `${BASE_URL_V2}/cms/get-service-detail/community/${communityId}?templateId=consultingo&service=${serviceName}`;

  const data = await fetchJSON(url);

  return {
    data: data?.data ?? null,
  };
}