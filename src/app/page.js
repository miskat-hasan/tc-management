"use client";

import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function Home() {
  const { userData } = useAuth();
  if (userData) {
    redirect("/admin/class_and_students/upcoming_classes");
  } else {
    redirect("/login");
  }
}
