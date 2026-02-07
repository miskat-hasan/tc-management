"use client";
import { useGetUserData } from "@/hooks/api/authApi";
import { getallTrainingsite } from "@/hooks/api/dashboardApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useEffect, useState } from "react";

export const AuthContextProvider = createContext(null);

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken, clearToken] = useLocalStorage("token", null);
  const { data: userData, isLoading: loadingUserData } = useGetUserData(token);

  const { data: trainingSiteData, isLoading: trainingSiteDataLoading } =
    getallTrainingsite();

  const [selectedTrainingSiteId, setSelectedTrainingSiteId] = useState(null);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (loadingUserData) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (userData?.status) {
      setUser(userData?.data);
    } else {
      setUser(null);
    }

    if(trainingSiteData?.data){
      setSelectedTrainingSiteId(trainingSiteData?.data[0]?.id)
    }
  }, [token, userData, loadingUserData, trainingSiteData]);

  const contextValue = {
    loading,
    user,
    token,
    setToken,
    clearToken,
    userData,
    loadingUserData,
    selectedTrainingSiteId,
    setSelectedTrainingSiteId,
    trainingSiteData,
    trainingSiteDataLoading,
  };

  return (
    <AuthContextProvider.Provider value={contextValue}>
      {children}
    </AuthContextProvider.Provider>
  );
}
