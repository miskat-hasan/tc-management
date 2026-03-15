"use client";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { useVerifyEmail } from "@/hooks/api/authApi";
import { Logo } from "@/svg/SvgContainer";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const ForgetPassword = () => {
  const form = useForm();
  const router = useRouter();

  const { mutate, isPending } = useVerifyEmail();

  const onSubmit = (data) => {
    const encodedEmail = Buffer.from(data?.email).toString("base64");
    mutate(data, {
      onSuccess: () => {
        router.push(`/forget-password/${encodedEmail}`);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-[600px] w-full p-5 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-1.5 justify-center">
          <Logo />
          <h5 className="font-black text-[14px]">ENROLL NATIONWIDE</h5>
        </div>

        <p className="text-center mt-2 text-[20px]">
          <span className="font-semibold"> Forgot Password?</span>
          <br />{" "}
          <span className="text-[16px] text-gray-500">
            Enter your email to get a verification code.
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

          <Button
            type="submit"
            disabled={isPending}
            className="px-6 h-[40px] border border-brown rounded-md shadow-sm text-sm font-medium cursor-pointer text-white hover:text-brown bg-brown hover:bg-transparent w-full duration-300 disabled:opacity-70"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </FormContainer>
      </div>
    </div>
  );
};

export default ForgetPassword;
