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
      `https://communn.io/api/v1/payments/plan/${planId}/user/${userId}`,
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
    return { status: 500, data: [] }; // still returns something
  }
};



export const getPaymentStatus = async (token: string, id: string) => {
  try {
    const response = await axios.post(
      `https://communn.io/api/v1/payment/${id}`,
      { txnid: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // console.log('Payment-response:', response);
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
      `https://communn.io/api/v2.0/subscriptions/${communityId}/update-subscription-sequences`,
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