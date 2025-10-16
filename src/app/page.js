"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/class_and_students/upcoming_classes");
  }, [router]);
  return <></>;
}
