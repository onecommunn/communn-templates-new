"use client";

import { getCommunityData } from "@/services/communityService";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./Auth.context";
import { useEffect, useMemo, useState } from "react";

const AuthProvider = ({ children }: any) => {
  const [communityId, setCommunityId] = useState<string>("");

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
      communityId, // 👈 include here
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
    ]
  );

  // Fetch communityId once
  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const communityData: any = await getCommunityData(
          window.location.hostname
        );
        setCommunityId(communityData?.community?._id || "");
      } catch (error) {
        console.error("Error fetching community ID:", error);
      }
    };
    fetchCommunity();
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
