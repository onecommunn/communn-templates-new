import { IPaymentList } from "@/models/payment.model";
import axios from "axios";


export const getEvents = async (communityId: string) => {
  try {
    const response = await axios.get<Event>(
      `https://communn.io/api/v2.0/builders/community/${communityId}/event`,
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

export const getEventById = async (eventId: string) => {
  try {
    const response = await axios.get<Event>(
      `https://communn.io/api/v2.0/events/${eventId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
    return { status: 500, data: [] };
  }
};

export const freeEventsNoAuth = async (
  eventId: string,
  name: string,
  email: string,
  phoneNumber: string,
  communityId: string
) => {
  try {
    const response = await axios.post(
      `https://communn.io/api/v2.0/events/${eventId}/direct-join`,
      {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        communityId: communityId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || "Unknown error occurred";
    return {
      status: err?.response?.status || 500,
      data: [],
      message: errorMessage,
    };
  }
};

export const paymentEventsNoAuth = async (
  eventId: string,
  name: string,
  email: string,
  phoneNumber: string,
  amount: string,
  commId: string
) => {
  try {
    const response = await axios.post(
      `https://communn.io/api/v1/payments/events/${eventId}`,
      {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        amount: amount,
        commId: commId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log('Response:', response);
    return response;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || "Unknown error occurred";
    return {
      status: err?.response?.status || 500,
      data: [],
      message: errorMessage,
    };
  }
};

export const getPaymentStatusByIdNoAuth = async (id: string) => {
  const response = await getPaymentStatusNoAuth(id);
  if (response?.status === 200) {
    return response?.data as IPaymentList[];
  } else {
    return response?.data as IPaymentList[];
  }
};

export const getPaymentStatusNoAuth = async (id: string) => {
  try {
    const response = await axios.post(
      `https://communn.io/api/v2.0/payments/get-status`,
      { txnid: id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log('Payment-response:', response);
    return response;
  } catch (err) {
    return { status: 500, data: [] };
  }
};
