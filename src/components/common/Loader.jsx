"use client";
import Lottie from "lottie-react";
import React from "react";
import loaderAnimation from "@/Assets/LoaderAnimation.json";

const Loader = () => {
  return <Lottie animationData={loaderAnimation} loop={true} />;
};

export default Loader;
