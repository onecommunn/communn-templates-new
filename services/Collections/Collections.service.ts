import { BASE_URL_V2 } from "@/configurations/url.config";
import { AuthContext, IAuthContext } from "@/contexts/Auth.context";
import axios from "axios";
import { useContext } from "react";

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
  communityId: string,
): Promise<CollectionsCMSBundle> {
  const base = `${BASE_URL_V2}/cms/get-section/community`;
  const [home, aboutUs, contact, collections] = await Promise.all([
    fetchJSON(`${base}/${communityId}?templateId=collections&page=home`),
    fetchJSON(`${base}/${communityId}?templateId=collections&page=aboutUs`),
    fetchJSON(`${base}/${communityId}?templateId=collections&page=contactUs`),
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

export const fetchProductsCategory = async (
  communityId: string,
) => {
  const response = await axios.get(
    `${BASE_URL_V2}/product-category/category/community/${communityId}`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTYzZTI0NjdjN2I5NTdkZjQ4MDYwYSIsImlhdCI6MTc2OTY4NDk2NSwiZXhwIjoxNzcyMjc2OTY1fQ.Dcdis7-Yl1U1aoD6ujFOOS8iCz53EfVtizCJYgdcSgE`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};
