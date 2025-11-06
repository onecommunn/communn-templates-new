// utils/api.ts or services/plans.ts
import { BASE_URL, BASE_URL_V2 } from '@/configurations/url.config';
import { TrainingPlan } from '@/models/plan.model';
import axios from 'axios';


type PlansCommunityResponse = {
  myPlans: TrainingPlan[];
  isSubscribedCommunity: boolean;
  [key: string]: any;
};

export const getPlansCommunityAuth = async (token: string, id: string) => {
  try {
    const response = await axios.get<PlansCommunityResponse>(
      `${BASE_URL}/plans/community/${id}/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response?.data, "response");
    return response?.data; 
  } catch (err) {
    console.error('Error fetching plans:', err);
    return { myPlans: [], isSubscribedCommunity: false, status: 500 };
  }
};



export const getPlansCommunity = async (token: string, id: string) => {
  try {
    const response = await axios.get<PlansCommunityResponse>(`${BASE_URL_V2}/builders/community/${id}/user-plan`, {});
    return response?.data?.myPlans;
  } catch (err) {
    console.error('Error fetching plans:', err);
    return { status: 500, data: [] };
  }
};

export const getPlanById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/plan/${id}`, {
    });
    return response;
  } catch (err) {
    console.log('ERR :', err);
    return { status: 500, data: [] };
  }
};

export const createSubscriptionSequences = async (
  userId: string,
  communityId: string,
  planId: string,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL_V2}/subscription/user/${userId}/create-fetch-subscription`,
      {
        communityId,
        planId,
      },
    );
    return response?.data;
  } catch (err) {
    
    return { status: 500, data: [] };
  }
};


export const getSequencesBySubscriptionId = async (
  subscriptionId: string,
  userId: string,
  courseId?:string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL_V2}/subscription/${subscriptionId}/user/${userId}/get-all-sequences`,
      {
        courseId:courseId
      }
    );
    return response?.data;
  } catch (err) {
    
    return { status: 500, data: [] };
  }
};


export const joinCommunity = async (token: string, community_id: string) => {
  try {
    const formData = JSON.stringify({ community_id: community_id });
    // console.log(formData);
    const response = await axios.post(
      `${BASE_URL}/community/${community_id}/join`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (err) {
    return { status: 500, data: [], message: 'Failed to join community' };
  }
};