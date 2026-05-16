// src/Provider/AuthProvider/AuthProvider.jsx
"use client";
import { useGetUserData } from "@/hooks/api/authApi";
import { getallTrainingsite } from "@/hooks/api/dashboardApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContextProvider = createContext(null);

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken, clearToken] = useLocalStorage("token", null);

  const { data: userData, isLoading: loadingUserData } = useGetUserData(token);
  const { data: trainingSiteData, isLoading: trainingSiteDataLoading } =
    getallTrainingsite(token);

  const [selectedTrainingSiteId, setSelectedTrainingSiteId] = useState(null);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);

      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("allowed_sites");
      return;
    }

    if (loadingUserData) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (userData?.status) {
      const currentUser = userData.data;
      setUser(currentUser);
      
      const role = currentUser?.roles?.[0]?.role_name ?? "";
      Cookies.set("token", token, { sameSite: "strict" });
      Cookies.set("role", role, { sameSite: "strict" });
    } else {
      setUser(null);
    }
  }, [token, userData, loadingUserData]);

  useEffect(() => {
    if (!trainingSiteData?.data) return;

    const siteData = trainingSiteData.data;

    const allowedSites = Array.isArray(siteData)
      ? siteData.map((ts) => ts.id).join(",")
      : String(siteData?.id ?? "");

    Cookies.set("allowed_sites", allowedSites, { sameSite: "strict" });

    const firstId = Array.isArray(siteData) ? siteData[0]?.id : siteData?.id;
    setSelectedTrainingSiteId(firstId ?? null);
  }, [trainingSiteData]);

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
