import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

export const getInfluencerCategories = async (communityId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL_V2}/cms/recommandation-category/${communityId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (err) {
    console.log("ERR :", err);
    return { status: 500, data: [] };
  }
};

export const getInfluencerRecommendations = async (
  communityId: string,
  category?: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL_V2}/cms/recommandations/${communityId}`,
      {
        params: category ? { category } : undefined,
      }
    );

    return response.data;
  } catch (error) {
    return {
      status: 500,
      data: [],
    };
  }
};
