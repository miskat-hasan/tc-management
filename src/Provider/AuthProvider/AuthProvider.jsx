"use client";

import { useGetUserData } from "@/hooks/api/authApi";
import { createContext, useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

export const AuthContextProvider = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Get initial token from cookies
  const [token, _setTokenState] = useState(() => getCookie("token"));

  const { data: userData, isLoading: loadingUserData } = useGetUserData(token);

  // 2. Helper function to update cookie and state simultaneously
  const setToken = (newToken) => {
    setCookie("token", newToken, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
    _setTokenState(newToken);
  };

  const clearToken = () => {
    deleteCookie("token");
    _setTokenState(null);
    setUser(null);
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (!loadingUserData) {
      if (userData?.success) {
        setUser(userData?.data);
      } else if (userData === null || userData?.error) {
        clearToken();
      }
      setLoading(false);
    }
  }, [token, userData, loadingUserData]);

  const contextValue = {
    loading: loading || loadingUserData,
    user,
    token,
    setToken,
    clearToken,
    userData,
  };

  return (
    <AuthContextProvider.Provider value={contextValue}>
      {children}
    </AuthContextProvider.Provider>
  );
}
