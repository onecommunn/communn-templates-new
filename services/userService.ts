import { BASE_URL } from "@/configurations/url.config";
import axios from "axios";

export const getUser = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.log("ERR :", err);
    return { status: 500, data: [] };
  }
};

export const updateUser = async (
  token: string,
  id: string,
  data: any,
  avatar: File | null
) => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        formData.append(key, value);
      }
    }
    if (avatar) {
      formData.append("avatar", avatar);
    }
    const response = await axios.put(`${BASE_URL}/users/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "*",
      },
    });
    return response;
  } catch (err) {
    console.log("ERR :", err);
    return { status: 500, data: [] };
  }
};

export const getUserPlans = async (
  token: string,
  userId: string,
  communityId: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/${userId}/community/${communityId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.log("ERR :", err);
    return { status: 500, data: [] };
  }
};
