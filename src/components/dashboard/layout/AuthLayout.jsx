// src/components/dashboard/layout/AuthLayout.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/common/Loader";

const roleSegment = {
  "Super Admin":           "super-admin",
  "Training Center Admin": "admin",
  "Training Site Admin":   "admin",
  "Instructor":            "instructor",
  "Student":               "student",
  "Client":                "client",
};

const roleDefaultPage = {
  "Super Admin":           "class_and_students/upcoming_classes",
  "Training Center Admin": "class_and_students/classes",
  "Training Site Admin":   "class_and_students/classes",
  "Instructor":            "class_and_students/classes",
  "Student":               "class_and_students/classes",
  "Client":                "class_and_students/classes",
};

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { token, user, loading, selectedTrainingSiteId } = useAuth();

  useEffect(() => {
    if (!token || !user || !selectedTrainingSiteId) return;

    const roleName = user?.roles?.[0]?.role_name;
    const segment  = roleSegment[roleName];
    const page     = roleDefaultPage[roleName];

    if (segment && page) {
      router.replace(`/dashboard/${segment}/${selectedTrainingSiteId}/${page}`);
    }
  }, [token, user, selectedTrainingSiteId, router]);

  // Token exists but user data still loading → show loader instead of login page
  if (token && (loading || !user || !selectedTrainingSiteId)) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // No token → show login page normally
  return <>{children}</>;
}