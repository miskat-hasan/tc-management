// src/Provider/AuthProvider/AuthProvider.jsx
"use client";
import { useGetUserData } from "@/hooks/api/authApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContextProvider = createContext(null);
const ensureArray = (val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }
  return [];
};

export default function AuthProvider({ children }) {
  const [token, setToken, clearToken] = useLocalStorage("token", null);
  const [_siteRoles, setSiteRoles] = useLocalStorage("site_roles", []);
  const [activeRole, setActiveRole] = useLocalStorage("active_role", null);

  // Always guaranteed to be an array
  const siteRoles = ensureArray(_siteRoles);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const { data: userData, isLoading: loadingUserData } = useGetUserData(token);

  const [selectedTrainingSiteId, setSelectedTrainingSiteId] = useState(null);

  // Sites accessible under the currently active role
  const accessibleSites = siteRoles?.filter(
    (sr) => sr.role_name === activeRole?.role_name,
  );

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("allowed_sites");
      return;
    }

    setLoading(loadingUserData);

    if (userData?.status) {
      setUser(userData.data);
      Cookies.set("token", token, { sameSite: "strict" });
    } else {
      setUser(null);
    }
  }, [token, userData, loadingUserData]);

  // Sync role + allowed_sites cookies from persisted activeRole
  useEffect(() => {
    if (!activeRole) return;

    const allowedSites = accessibleSites
      .map((sr) => sr.training_site_id)
      .join(",");

    Cookies.set("role", activeRole.role_name, { sameSite: "strict" });
    Cookies.set("allowed_sites", allowedSites, { sameSite: "strict" });

    if (accessibleSites.length) {
      setSelectedTrainingSiteId(accessibleSites[0].training_site_id);
    }
  }, [activeRole?.role_name, accessibleSites.length]);

  const clearAll = () => {
    clearToken();
    setSiteRoles([]);
    setActiveRole(null);
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("allowed_sites");
  };

  const contextValue = {
    loading,
    user,
    token,
    setToken,
    clearToken: clearAll,
    siteRoles,
    setSiteRoles,
    activeRole,
    setActiveRole,
    accessibleSites,
    selectedTrainingSiteId,
    setSelectedTrainingSiteId,
  };

  return (
    <AuthContextProvider.Provider value={contextValue}>
      {children}
    </AuthContextProvider.Provider>
  );
}
