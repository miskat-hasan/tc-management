"use client";

import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  router.push("/admin/class_and_students/upcoming_classes");
  return <div>page</div>;
};

export default page;
