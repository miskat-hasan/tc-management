"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return router.replace("/admin/class_and_students/upcoming_classes");
}
