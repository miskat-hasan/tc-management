"use client";
import { useGetUserData } from "@/hooks/api/authApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { setItem } from "@/lib/localStorage";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContextProvider = createContext(null);

const ensureArray = (val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return []; }
  }
  return [];
};

export default function AuthProvider({ children }) {
  const [hydrated, setHydrated]                    = useState(false);
  const [user, setUser]                            = useState(null);
  const [token, setToken, clearToken]              = useLocalStorage("token", null);
  const [_siteRoles, setSiteRoles]                 = useLocalStorage("site_roles", []);
  const [activeRole, setActiveRole]                = useLocalStorage("active_role", null);
  const [selectedTrainingSiteId, _setSelectedSite] = useLocalStorage("selected_site_id", null);

  const siteRoles      = ensureArray(_siteRoles);
  const accessibleSites = siteRoles.filter(
    (sr) => sr.role_name === activeRole?.role_name
  );

  const { data: userData, isLoading: loadingUserData } = useGetUserData(token);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!token) {
      setUser(null);
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("allowed_sites");
      return;
    }
    if (userData?.status) {
      setUser(userData.data);
      Cookies.set("token", token, { sameSite: "strict" });
    } else if (userData && !userData.status) {
      setUser(null);
    }
  }, [token, userData]);

  useEffect(() => {
    if (!activeRole) return;
    const allowedSites = accessibleSites
      .map((sr) => sr.training_site_id ?? sr.id)
      .join(",");
    Cookies.set("role",          activeRole.role_name, { sameSite: "strict" });
    Cookies.set("allowed_sites", allowedSites,         { sameSite: "strict" });
  }, [activeRole?.role_name, accessibleSites.length]);

  const setSelectedTrainingSiteId = (id) => {
    _setSelectedSite(id);
    setItem("selected_site_id", id);
  };

  const clearAll = () => {
    clearToken();
    setSiteRoles([]);
    setActiveRole(null);
    setSelectedTrainingSiteId(null);
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("allowed_sites");
  };

  return (
    <AuthContextProvider.Provider value={{
      hydrated,
      loading: loadingUserData,
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
    }}>
      {children}
    </AuthContextProvider.Provider>
  );
}