"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/class_and_students/upcoming_classes");
  }, [router]);
  return <div>page</div>;
};

export default Page;
