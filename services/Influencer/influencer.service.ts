import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

type InfluencerCMSBundle = {
  recommendations: any | null;
  categories: any | null;
};

async function fetchJSON(url: string) {
  try {
    const r = await axios.get(url);
    return r.data;
  } catch {
    return null;
  }
}

async function fetchInfluencerBundle(
  communityId: string,
): Promise<InfluencerCMSBundle> {
  const [recommendations, categories] = await Promise.all([
    fetchJSON(`${BASE_URL_V2}/cms/recommandations/${communityId}`),
    fetchJSON(`${BASE_URL_V2}/cms/recommandation-category/${communityId}`),
  ]);

  return {
    recommendations: recommendations?.data ?? null,
    categories: categories?.data ?? null,
  };
}

export async function getInfluencerCMSBundle(communityId: string) {
  return fetchInfluencerBundle(communityId);
}

export const getInfluencerCategories = async (communityId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL_V2}/cms/recommandation-category/${communityId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response?.data ?? null;
  } catch (err) {
    console.log("ERR :", err);
    return { status: 500, data: [] };
  }
};

export const getInfluencerRecommendations = async (
  communityId: string,
  category?: string,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL_V2}/cms/recommandations/${communityId}`,
      {
        params: category ? { category } : undefined,
      },
    );

    return response.data;
  } catch (error) {
    return {
      status: 500,
      data: [],
    };
  }
};

export const getByIdInfluencerRecommendations = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL_V2}/cms/specific-recommandation/${id}`,
  );

  return response;
};

export const getInfluencerAdminProfile = async (communityId: string) => {
  const response = await axios.get(
    `${BASE_URL_V2}/cms/${communityId}/recommandation-admin-profile`,
  );

  return response.data;
};
