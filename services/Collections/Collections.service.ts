import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

type CollectionsCMSBundle = {
  home: any | null;
  aboutUs: any | null;
  contact: any | null;
  collections: any | null;
};

async function fetchJSON(url: string) {
  try {
    const r = await axios.get(url);
    return r.data;
  } catch {
    return null;
  }
}

async function fetchCollectionsBundle(
  communityId: string
): Promise<CollectionsCMSBundle> {
  const base = `${BASE_URL_V2}/cms/get-section/community`;
  const [home, aboutUs, contact, collections] = await Promise.all([
    fetchJSON(`${base}/${communityId}?templateId=collections&page=home`),
    fetchJSON(`${base}/${communityId}?templateId=collections&page=aboutUs`),
    fetchJSON(`${base}/${communityId}?templateId=collections&page=contact`),
    fetchJSON(`${base}/${communityId}?templateId=collections&page=collections`),
    // add more pages
  ]);

  return {
    home: home?.data ?? null,
    aboutUs: aboutUs?.data ?? null,
    contact: contact?.data ?? null,
    collections: collections?.data ?? null,
    // add more pages
  };
}

export async function getCollectionsCMSBundle(communityId: string) {
  return fetchCollectionsBundle(communityId);
}
