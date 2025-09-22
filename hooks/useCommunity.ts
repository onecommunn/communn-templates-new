import { useEffect, useState } from "react";
import { getCommunityData } from "../services/communityService";

export const useCommunity = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [communityId, setCommunityId] = useState<string>("");

  useEffect(() => {
    const fetchCommunityId = async () => {
      try {
        // You can replace `window.location.hostname` with a specific domain or logic
        const hostOrSubdomain = window.location.hostname;
        setIsLoading(true);
        const response = await getCommunityData(hostOrSubdomain);

        if (response?.community?._id) {
          setCommunityId(response.community._id);
        }
      } catch (err) {
        console.error("Error in fetching community data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunityId();
  }, []);

  const getSocialLinks = async (hostOrSubdomain: string) => {
    try {
      setIsLoading(true);
      const response = await getCommunityData(hostOrSubdomain);
      return response.community.socialLinks;
    } catch (err) {
      console.log("error in fetching social links");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getSocialLinks,
    communityId
  };
};
