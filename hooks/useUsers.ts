import { AuthContext, IAuthContext } from "@/contexts/Auth.context";
import { getUser, getUserPlans, updateUser } from "@/services/userService";
import { useContext } from "react";
import { toast } from "sonner";

export interface IEditUser {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
  isPhoneVerified: boolean;
  description: string;
  pincode: string;
  city: string;
  address: string;
  aadhar: string;
  pan: string;
  userName: string;
  avatar: string;
  about: string;
}

export const useUsers = () => {
  const { getAccessToken } = useContext<IAuthContext>(AuthContext);

  const loadUser = async (id: string) => {
    try {
      const response = await getUser(getAccessToken(), id);

      if (response.status === 200) {
        return response.data;
      }

      toast.error("Failed to fetch user details");
      return null;
    } catch (error) {
      toast.error("Something went wrong while fetching the user");
      return null;
    }
  };

  const editUsers = async (
    id: string,
    user: IEditUser,
    avatar: File | null
  ) => {
    try {
      const response = await updateUser(getAccessToken(), id, user, avatar);

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        return response.data;
      }

      toast.error("Profile update failed");
      return null;
    } catch (error) {
      toast.error("Something went wrong while updating profile");
      return null;
    }
  };

  const loadUserPlans = async (userId: string, communityId: string) => {
    try {
      const response = await getUserPlans(
        getAccessToken(),
        userId,
        communityId
      );

      if (response.status === 200) {
        return response.data;
      }

      toast.error("Failed to fetch user plans");
      return null;
    } catch (error) {
      toast.error("Something went wrong while fetching the user plans");
      return null;
    }
  };

  return {
    loadUser,
    editUsers,
    loadUserPlans,
  };
};
