"use client";
import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { useConnectAccount } from "@/hooks/api/dashboardApi";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Page = () => {
  const form = useForm({
    defaultValues: {
      authorize_api_login_id: "",
      authorize_transaction_key: "",
    },
  });

  const { reset } = form;

  const { mutate, isPending } = useConnectAccount();

  const onSubmit = (data) => {

    mutate(data, {
      onSuccess: (data) => {
        reset();
        Swal.fire({
          text: data?.message,
          icon: "success",
        });
      },
    });
  };

  return (
    <div>
      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <SectionTitle title={"Connect Your Bank Account"} />
        <FormContainer
          className={"flex flex-col  lg:gap-4"}
          form={form}
          onSubmit={onSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2.5 md:gap-x-6 md:gap-y-5">
            <FormInput
              name="authorize_api_login_id"
              label="Authorize ID"
              placeholder="Enter id here"
            />

            <FormInput
              name="authorize_transaction_key"
              label="Authorize Key"
              placeholder="Enter key here"
            />
          </div>
          <div className="flex justify-end gap-4 mt-5 lg:mt-10">
            <Button
              type="submit"
              disabled={isPending}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown hover:bg-brown-hover disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Connecting..." : "Connect Account"}
            </Button>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default Page;
