import React from "react";

const ForgetPassword = ({ slug }) => {
  console.log(slug);
  const decodedEmail = Buffer.from(slug, "base64").toString("utf-8");
  console.log(decodedEmail);

  return <div className="">ForgetPassword</div>;
};

export default ForgetPassword;
