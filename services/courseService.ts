import axios from "axios";
import { Course } from "../models/course.mode";

export const getCourses = async (communityId: string) => {
  try {
    const response = await axios.get<Course>(
      `https://communn.io/api/v2.0/builders/community/${communityId}/course`,
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
