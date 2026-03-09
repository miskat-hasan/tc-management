"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/common/Loader";

const PrivateLayout = ({ children }) => {
  const router = useRouter();
  const { user, token, loading, trainingSiteData } = useAuth();

  useEffect(() => {
    if (!token && !user) {
      router.push("/login");
    }
  }, [token, user, router]);

  if (loading && !trainingSiteData) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (token && user && trainingSiteData && user?.roles?.find((item) => item.role_name === "Super Admin")) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateLayout;
