"use client";

import { getCommunityData } from "@/services/communityService";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./Auth.context";
import { useEffect, useMemo, useState } from "react";
import { useUsers } from "@/hooks/useUsers";

const AuthProvider = ({ children }: any) => {
  const [communityId, setCommunityId] = useState<string>("");
  const [userData, setUserData] = useState();
  const { loadUserPlans } = useUsers();

  const {
    loading,
    user,
    isAuthenticated,
    getAccessToken,
    autoLogin,
    autoCreate,
    roleType,
  } = useAuth();

  // Memoize everything except communityId
  const contextValue = useMemo(
    () => ({
      loading,
      user,
      isAuthenticated,
      getAccessToken,
      autoLogin,
      autoCreate,
      roleType,
      communityId,
      userData,
    }),
    [
      loading,
      user,
      isAuthenticated,
      getAccessToken,
      autoLogin,
      autoCreate,
      roleType,
      communityId,
      userData,
    ]
  );

  // Fetch communityId once
  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const communityData: any = await getCommunityData(
          window.location.hostname
        );
        if (user) {
          const userPlansResponce = await loadUserPlans(
            user?.id,
            communityData?.community?._id
          );
          setUserData(userPlansResponce)
        }

        setCommunityId(communityData?.community?._id || "");
      } catch (error) {
        console.error("Error fetching community ID:", error);
      }
    };
    fetchCommunity();
  }, [user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
