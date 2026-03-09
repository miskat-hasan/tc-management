"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { token, user, selectedTrainingSiteId } = useAuth();

  useEffect(() => {
    if (user && token && selectedTrainingSiteId) {
      if (user?.roles?.find((item) => item.role_name === "Super Admin")) {
        return router.push(
          `/super-admin/${selectedTrainingSiteId}/class_and_students/upcoming_classes`,
        );
      }
      if (user?.roles?.find((item) => item.role_name === "Admin")) {
        return router.push(
          `/admin/${selectedTrainingSiteId}/class_and_students/classes`,
        );
      }
      if (user?.roles?.find((item) => item.role_name === "Instructor")) {
        return router.push(
          `/instructor/${selectedTrainingSiteId}/class_and_students/classes`,
        );
      }
    }
  }, [token, user, router, selectedTrainingSiteId]);

  return <>{children}</>;
}
