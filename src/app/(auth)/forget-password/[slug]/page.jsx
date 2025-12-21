import ForgetPassword from "@/components/auth/ForgetPassword";
import React from "react";

const page = async ({ params }) => {
  const { slug } = await params;

  return <ForgetPassword slug={slug} />;
};

export default page;
