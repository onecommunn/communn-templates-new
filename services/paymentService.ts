import { BASE_URL, BASE_URL_V2 } from '@/configurations/url.config';
import axios from 'axios';


export const initiatePayment = async (
  token: string,
  userId: string,
  planId: string,
  sequenceIds: string[],
  amount: string,
  courseId?: string,
) => {
  try {
    console.log("📡 Sending payment request with:", {
      userId,
      planId,
      sequenceIds,
      amount,
      courseId,
    });

    const response = await axios.post(
      `${BASE_URL}/payments/plan/${planId}/user/${userId}`,
      {
        sequenceIds: sequenceIds, 
        amount: amount,
        courseId: courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("✅ initiatePayment response:", response);
    return response;
  } catch (err) {
    console.error("❌ initiatePayment failed:", err);
    return { status: 500, data: [] };
  }
};



export const getPaymentStatus = async (token: string, id: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/payment/${id}`,
      { txnid: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (err) {
    return { status: 500, data: [] };
  }
};

export const updateSequencesStatus = async (
  token: string,
  communityId: string,
  ids: any
) => {
  try {
    const response = await axios.put(
      `${BASE_URL_V2}/subscriptions/${communityId}/update-subscription-sequences`,
      {
        sequences: ids,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response;
  } catch (err) {
    return { status: 500, data: [] };
  }
};