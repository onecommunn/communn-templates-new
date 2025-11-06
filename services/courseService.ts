import axios from "axios";
import { Course } from "../models/course.mode";
import { BASE_URL_V2 } from "@/configurations/url.config";

export const getCourses = async (communityId: string) => {
  try {
    const response = await axios.get<Course>(
      `${BASE_URL_V2}/builders/community/${communityId}/course`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (err) {
    console.error("Error fetching plans:", err);
    return { status: 500, data: [] };
  }
};
