import axios from "axios";
import { BASE_URL, BASE_URL_V2 } from "../configurations/url.config";

export const fetchCourseByCommunityId = async (token: string, id: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL_V2}/communities/${id}/courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (err) {
    return { status: 500, data: [] };
  }
};

export const fetchCourseByCourseId = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${BASE_URL_V2}/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return { status: 500, data: [] };
  }
};

export const NoAuthFetchCourseByCourseId = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL_V2}/courses/${id}`);
    return response;
  } catch (err) {
    return { status: 500, data: [] };
  }
};

export const coursesList = async (token: string, communityId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL_V2}/course/community/${communityId}/user-subscribed-courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response?.data?.courses;
  } catch (err) {
    console.log("ERR :", err);
    return { status: 500, data: [] };
  }
};

export const courseInitiatePayment = async (
  token: string,
  courseId: string,
  userId: string,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/payment/course/${courseId}/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response;
  } catch (err) {
    return { status: 500, data: [] };
  }
};
