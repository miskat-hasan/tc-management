"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function Page() {
  const router = useRouter();
  const { selectedTrainingSiteId } = useAuth();

  useEffect(() => {
    return router.push(
      `/super-admin/${selectedTrainingSiteId}/class_and_students/upcoming_classes`,
    );
  }, [selectedTrainingSiteId]);
}
