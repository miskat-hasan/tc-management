// src/components/dashboard/layout/AuthLayout.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/common/Loader";
import { roleDefaultPage, roleSegment } from "@/config";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { token, user, loading, selectedTrainingSiteId } = useAuth();

  useEffect(() => {
    if (!token || !user || !selectedTrainingSiteId) return;

    const roleName = user?.roles?.[0]?.role_name;
    const segment = roleSegment[roleName];
    const page = roleDefaultPage[roleName];

    if (segment && page) {
      if (segment === "student" || segment === "client") {
        router.replace(`/dashboard/${segment}/${page}`);
      } else {
        router.replace(
          `/dashboard/${segment}/${selectedTrainingSiteId}/${page}`,
        );
      }
    }
  }, [token, user, selectedTrainingSiteId, router]);

  if (token && (loading || !user || !selectedTrainingSiteId)) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
