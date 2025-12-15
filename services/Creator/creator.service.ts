import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

type CreatorCMSBundle = {
  header: any | null;
  footer: any | null;
  home: any | null;
  about: any | null;
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

async function fetchCreatorBundle(
  communityId: string
): Promise<CreatorCMSBundle> {
  const base = `${BASE_URL_V2}/cms/get-section/community`;
  const [header, footer, home, about, contact] = await Promise.all([
    fetchJSON(`${base}/${communityId}?templateId=creator&page=header`),
    fetchJSON(`${base}/${communityId}?templateId=creator&page=footer`),
    fetchJSON(`${base}/${communityId}?templateId=creator&page=home`),
    fetchJSON(`${base}/${communityId}?templateId=creator&page=about`),
    fetchJSON(`${base}/${communityId}?templateId=creator&page=contact`),
    // add more pages
  ]);

  return {
    header: header?.data ?? null,
    footer: footer?.data ?? null,
    home: home?.data ?? null,
    about: about?.data ?? null,
    contact: contact?.data ?? null,
    // add more pages
  };
}

export async function getCreatorCMSBundle(communityId: string) {
  return fetchCreatorBundle(communityId);
}
