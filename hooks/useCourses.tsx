import { useContext } from "react";
import {
  fetchCourseByCourseId,
  fetchCourseByCommunityId,
  coursesList,
  courseInitiatePayment,
  NoAuthFetchCourseByCourseId,
} from "../services/courses.service";

import { AuthContext, IAuthContext } from "../contexts/Auth.context";
import { toast } from "sonner";

export const useCourses = () => {
  const { getAccessToken } = useContext<IAuthContext>(AuthContext);

  const courseListByCommunityId = async (id: string) => {
    try {
      const response = await fetchCourseByCommunityId(getAccessToken(), id);
      if (response.status === 200) {
        return response.data;
        // enqueueSnackbar("Course created", { variant: "success", autoHideDuration: 3000 });
      } else {
        // enqueueSnackbar("Couldn't fetch course", { variant: "error", autoHideDuration: 3000 });
      }
      return response;
    } catch (error) {
      toast.error("Couldn't fetch course");
    }
  };

  const getCourseByCourseId = async (id: string) => {
    const response = await fetchCourseByCourseId(getAccessToken(), id);
    return response.data;
  };

  const NoAuthGetCourseByCourseId = async (id: string) => {
    try {
      const response = await NoAuthFetchCourseByCourseId(id);
      if (response && response.status === 200) {
        return response.data;
      } else {
        toast.error("Couldn't get course");
      }
      return response;
    } catch (error) {
      toast.error("Couldn't get course");
    }
  };

  const getCourseList = async (communityId: string) => {
    try {
      const response = await coursesList(getAccessToken(), communityId);
      return response;
    } catch (error) {
      toast.error("Couldn't get course");
    }
  };

  const initiateCoursePayment = async (courseId: string, userId: string) => {
    try {
      const response = await courseInitiatePayment(
        getAccessToken(),
        courseId,
        userId,
      );
      return response;
    } catch (error) {
      toast.error("Couldn't get course");
    }
  };

  return {
    courseListByCommunityId,
    getCourseByCourseId,
    getCourseList,
    initiateCoursePayment,
    NoAuthGetCourseByCourseId,
  };
};
