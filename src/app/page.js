"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { token, user } = useAuth();

  if (!token && !user) {
    return router.push("/login");
  }

  if (user?.role_name === "Admin") {
    router.push("/admin/class_and_students/upcoming_classes");
  } else {
    router.push("/admin/class_and_students/classes");
  }
}
