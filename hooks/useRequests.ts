import { AuthContext, IAuthContext } from "@/contexts/Auth.context";
import { ICommunity } from "@/models/community.model";
import { IUserInfo } from "@/models/user.model";
import { sendRequestToJoin } from "@/services/requestsService";

import { useContext, useState } from "react";
import { toast } from "sonner";

export interface IMemberCommunity {
  [x: string]: any;
  _id: string;
  community: ICommunity;
  createdAt: string;
  isDefault: boolean;
  slug: string;
  status: string;
  type: string;
  updatedAt: string;
  subscriptionStatus: string;
  dueDate: string;
}

export interface IMemberCommunity extends ICommunity {
  isDefault: boolean;
  slug: string;
  status: string;
  type: string;
  updatedAt: string;
  subscriptionStatus: string;
  dueDate: string;
}

export interface Invitations {
  role: string;
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  emailId: string;
  community: ICommunity;
  createdBy: IUserInfo;
  status: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: IUserInfo;
  message: string;
  invitesId: string;
  subscribeData: IMemberCommunity;
}

export const useRequests = () => {
  const { getAccessToken } = useContext<IAuthContext>(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requests, setRequests] = useState<Invitations[]>([]);

  const SendCommunityRequest = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const response = await sendRequestToJoin(getAccessToken(), formData);

      if (response.status === 201) {
        setRequests((prevInvitation) => [
          ...prevInvitation,
          response.data.data,
        ]);
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
      setIsLoading(false);
      return response;
    } catch (error) {
      toast.error("Failed to send request");
    }
  };

  return {
    isLoading,
    SendCommunityRequest,
    requests,
  };
};
