"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const PrivateLayout = ({ children }) => {
  const router = useRouter();
  const { user, token, loading } = useAuth();

  useEffect(() => {
    if (!token && !user) {
      router.push("/login");
    }
  }, [token, user, router]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        loading....
      </div>
    );
  }

  if (token && user) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateLayout;
