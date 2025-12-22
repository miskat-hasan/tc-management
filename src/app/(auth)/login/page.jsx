"use client";

import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { Logo } from "@/svg/SvgContainer";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-[600px] w-full p-5 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-1.5 justify-center">
          <Logo />
          <h5 className="font-black text-[14px]">ENROLL NATIONWIDE</h5>
        </div>

        <p className="text-center mt-2 text-[20px]">
          <span className="font-semibold">Welcome back!</span>
          <br />
          <span className="text-[16px] text-gray-500">
            Sign in to access your account
          </span>
        </p>

        <FormContainer form={form} onSubmit={onSubmit}>
          <FormInput
            name="email"
            label="Email"
            placeholder="Enter Your Email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
          />

          <FormInput
            name="password"
            label="Password"
            placeholder="Enter Your Password"
            type="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />

          <Link
            href="/forget-password"
            className="mb-2 inline-block text-brown underline"
          >
            Forget Password?
          </Link>

          <Button
            type="submit"
            className="px-6 h-[40px] border border-brown rounded-md shadow-sm text-sm font-medium cursor-pointer text-white hover:text-brown bg-brown hover:bg-transparent w-full duration-300"
          >
            Login
          </Button>
        </FormContainer>
      </div>
    </div>
  );
};

export default Login;
