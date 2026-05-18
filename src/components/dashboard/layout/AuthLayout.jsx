// src/components/dashboard/layout/AuthLayout.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/common/Loader";
import { roleDefaultPage, roleSegment } from "@/config";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { token, user, loading, siteRoles, selectedTrainingSiteId } = useAuth();

  useEffect(() => {
    if (!token || !user) return;
    
    // Multiple roles → select-role page (useLogin handles this)
    // Single role → go straight to dashboard
    if (siteRoles.length === 1) {
      const { role_name, training_site_id } = siteRoles[0];
      const segment = roleSegment[role_name];
      const page    = roleDefaultPage[role_name];
      if (segment && page) {
        router.replace(`/dashboard/${segment}/${training_site_id}/${page}`);
      }
    }
  }, [token, user, siteRoles, router]);

  if (token && (loading || !user)) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}