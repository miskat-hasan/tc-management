"use client";

import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return router.replace("/admin/class_and_students/upcoming_classes");
};

export default Page;
