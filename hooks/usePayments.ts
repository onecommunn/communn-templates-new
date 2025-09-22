import { useContext, useState } from "react";
import { AuthContext, IAuthContext } from "../contexts/Auth.context";
import { useSnackbar } from "notistack";
import { getPaymentStatus, initiatePayment, updateSequencesStatus } from "../services/paymentService";
import { IPaymentList } from "../models/payment.model";




export const usePayment = () => {
  const { getAccessToken } = useContext<IAuthContext>(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //// Payment Details/////


const initiatePaymentByIds = async (
  userId: string,
  planId: string,
  sequenceIdsOrDueDate: string[] | string,
  amount: string,
  courseId?: string
) => {
  setIsLoading(true);
  try {
    console.log("📥 initiatePaymentByIds called with:", {
      userId,
      planId,
      sequenceIdsOrDueDate,
      amount,
      courseId,
    });

    const sequenceIds =
      typeof sequenceIdsOrDueDate === 'string'
        ? [sequenceIdsOrDueDate]
        : sequenceIdsOrDueDate;

    const token = await getAccessToken();
    console.log("🔐 Access Token:", token);

    if (!token) {
      console.warn("❗ No token, cannot initiate payment");
      return null;
    }

    const response = await initiatePayment(
      token,
      userId,
      planId,
      sequenceIds,
      amount,
      courseId
    );

    console.log("🧾 Raw API Response:", response);

    if (response?.status === 200) {
      console.log("✅ Returning response.data:", response.data);
      return response.data;
    } else {
      console.error("❌ Non-200 status from API:", response?.status);
      return null;
    }
  } catch (error) {
    console.error("🔥 Error in initiatePaymentByIds:", error);
    return null;
  } finally {
    setIsLoading(false);
  }
};


   const getPaymentStatusById = async (id: string) => {
    const response = await getPaymentStatus(getAccessToken(), id);
    if (response?.status === 200) {
      return response?.data as IPaymentList[];
    } else {
      return response?.data as IPaymentList[];
    }
  };


  const updateSequencesPaymentStatus = async (
    communityId: string,
    ids: any
  ) => {
    const response = await updateSequencesStatus(
      getAccessToken(),
      communityId,
      ids
    );
    return response?.data;
  };
  

  
 return {
    isLoading,
    initiatePaymentByIds,
    getPaymentStatusById,
    updateSequencesPaymentStatus

  };
};