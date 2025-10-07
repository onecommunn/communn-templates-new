import axios from "axios";
import { toast } from "sonner";

export const fetchCreatorHeader = async (communityId: string) => {
  try {
    const response = await axios.get(
      `https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=header`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    // toast.error("Something wrong please try again later")
    return null;
  }
};

export const fetchCreatorAbout = async (communityId: string) => {
  try {
    const response = await axios.get(
      `https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=about`
    );
    console.log("Fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    // toast.error("Something wrong please try again later")
    return null;
  }
};

export const fetchCreatorHome = async (communityId: string) => {
  try {
    const response = await axios.get(
      `https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=home`
    );
    console.log("Fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    // toast.error("Something wrong please try again later")
    return null;
  }
};

export const fetchCreatorContact = async (communityId: string) => {
  try {
    const response = await axios.get(
      `https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=contact`
    );
    // console.log("Fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    // toast.error("Something wrong please try again later")
    return null;
  }
};

export const fetchCreatorFooter = async (communityId: string) => {
  try {
    const response = await axios.get(
      `https://communn.io/api/v2.0/cms/get-section/community/${communityId}?templateId=creator&page=footer`
    );
    console.log("Fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    // toast.error("Something wrong please try again later")
    return null;
  }
};