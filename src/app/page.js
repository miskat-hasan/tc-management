"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/common/Loader";

export default function Page() {
  const router = useRouter();
  const { user, token, loading, selectedTrainingSiteId } = useAuth();


  useEffect(() => {
    if (!token && !user) {
      router.replace("/login");
      return;
    }
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
  }, [user, token, router, selectedTrainingSiteId]);

  
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
}
