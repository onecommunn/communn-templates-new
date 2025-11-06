import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

export const fetchCreatorHeader = async (communityId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL_V2}/cms/get-section/community/${communityId}?templateId=creator&page=header`
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
      `${BASE_URL_V2}/cms/get-section/community/${communityId}?templateId=creator&page=about`
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
      `${BASE_URL_V2}/cms/get-section/community/${communityId}?templateId=creator&page=home`
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
      `${BASE_URL_V2}/cms/get-section/community/${communityId}?templateId=creator&page=contact`
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
      `${BASE_URL_V2}/cms/get-section/community/${communityId}?templateId=creator&page=footer`
    );
    console.log("Fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    // toast.error("Something wrong please try again later")
    return null;
  }
};