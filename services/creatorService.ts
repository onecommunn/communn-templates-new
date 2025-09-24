import axios from "axios";




export const fetchAboutCreator = async (communityId: string) => {
    try {
      const response = await axios.get(
        `https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=about`
      );
      console.log("Fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching community ID:", error);
      return null;
    }
  };