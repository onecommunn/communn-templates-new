import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

type PhotographyCMSBundle = {
  home: any | null;
  about: any | null;
  services: any | null;
  packages: any | null;
  portfolio: any | null;
  contact: any | null;
};

async function fetchJSON(url: string) {
  try {
    const r = await axios.get(url);
    return r.data;
  } catch {
    return null;
  }
}

async function fetchPhotographyBundle(
  communityId: string,
): Promise<PhotographyCMSBundle> {
  const base = `${BASE_URL_V2}/cms/get-section/community`;
  const [home, about, services, packages, portfolio, contact] =
    await Promise.all([
      fetchJSON(`${base}/${communityId}?templateId=photography&page=home`),
      fetchJSON(`${base}/${communityId}?templateId=photography&page=about`),
      fetchJSON(`${base}/${communityId}?templateId=photography&page=services`),
      fetchJSON(`${base}/${communityId}?templateId=photography&page=packages`),
      fetchJSON(`${base}/${communityId}?templateId=photography&page=portfolio`),
      fetchJSON(`${base}/${communityId}?templateId=photography&page=contact`),
      // add more pages
    ]);

  return {
    home: home?.data ?? null,
    about: about?.data ?? null,
    services: services?.data ?? null,
    packages: packages?.data ?? null,
    portfolio: portfolio?.data ?? null,
    contact: contact?.data ?? null,
    // add more pages
  };
}


export async function getPhotographyCMSBundle(communityId: string) {
  return fetchPhotographyBundle(communityId);
}
