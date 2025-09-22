import { useContext, useEffect, useState } from "react";
import { AuthContext, IAuthContext } from "../contexts/Auth.context";
import { useSnackbar } from "notistack";
// import store from "../store";
// import { useSelector } from "react-redux";
import { TrainingPlan } from "../models/plan.model";
import { createSubscriptionSequences, getPlansCommunity, getPlansCommunityAuth, getSequencesBySubscriptionId, joinCommunity } from "../services/plansService";
// import { deletePost } from "../services/post.service";

export const usePlans = () => {
  const { getAccessToken } = useContext<IAuthContext>(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<TrainingPlan[]>([]);

//   const state = store.getState();
//   const community = useSelector(() => {
//     return state?.selectedCommunity;
//   });
//   useEffect(() => {
//     const communityId = community?.selectedCommunity?._id ?? ""
//     if (communityId)
//       getCommunityPlansList(communityId)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [community?.selectedCommunity?._id]);



  const getCommunityPlansListAuth = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getPlansCommunityAuth(getAccessToken(), id);
      return response;
    } catch (error) {
      console.error("Error fetching community plans:", error);
      enqueueSnackbar("An error occurred while loading plans", { variant: "error", autoHideDuration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const getPlansList = async (id: string) => {
    try {
      const response = await getPlansCommunity(getAccessToken(), id);
      return response;
    } catch (err) {
      enqueueSnackbar('Failed to fetch plans', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  const joinToPublicCommunity = async (community_id: string) => {
    setIsLoading(true);
    try {
      const response = await joinCommunity(getAccessToken(), community_id);
      if (response === 'success') {
        enqueueSnackbar('You have successfully joined!', {
          variant: 'success',
          autoHideDuration: 3000,
        });
      } else {
        enqueueSnackbar('Error while joining to public community!', {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }
      return response;
    } catch (error) {
      enqueueSnackbar(
        'An error occurred while joining to Community, Please try again.',
        { variant: 'error', autoHideDuration: 3000 }
      );
    }
    setIsLoading(false);
  };


//   const getPlansById = async (id: string) => {
//     try {
//       setIsLoading(true);
//       const response = await getPlanById(id);
//       return response;
//     } catch (error) {
//       enqueueSnackbar('Failed to fetch plan details', { variant: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };


const createSubscriptionSequencesByPlanAndCommunityId = async (
    userId:string,
    communityId: string,
    planId: string,
  ) => {
    setIsLoading(true);
    try {
      const response = await createSubscriptionSequences(
        userId,
        communityId,
        planId,
      );
      // console.log("response", response);
      return response;
    } catch (err) {
      enqueueSnackbar("Couldn't create Subscription", {
        variant: 'error',
        autoHideDuration: 3000,
      });
      return err;
    } finally {
      setIsLoading(false);
    }
  };

const getSequencesById = async (subscriptionId: string, planId: string, courseId?:string) => {
    setIsLoading(true);
    try {
      const response = await getSequencesBySubscriptionId(
        subscriptionId,
        planId,
        courseId
      );
      // console.log("response", response);
      return response;
    } catch (err) {
      enqueueSnackbar("Couldn't create Subscription", {
        variant: 'error',
        autoHideDuration: 3000,
      });
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    plans,
    getPlansList,
    getCommunityPlansListAuth,
    getSequencesById,
    createSubscriptionSequencesByPlanAndCommunityId,
    joinToPublicCommunity
  };
};
