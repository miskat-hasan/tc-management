"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import FormTextarea from "@/components/shared/form/FormTextarea";
import {
  getSingleKeyCodeBank,
  updateKeyCodeBank,
} from "@/hooks/api/dashboardApi";
import Link from "next/link";
import Swal from "sweetalert2";

const Page = ({ params }) => {
  const { id } = params;

  const form = useForm({
    defaultValues: {
      name: "",
      instructions: "",
      course_link: "",
    },
  });

  const { reset } = form;

  const { mutate, isPending } = updateKeyCodeBank();

  const { data: keyCodeData, isLoading: keyCodeLoading } =
    getSingleKeyCodeBank(id);

  useEffect(() => {
    if (keyCodeData) {
      reset({
        name: keyCodeData?.data?.name || "",
        instructions: keyCodeData?.data?.instructions || "",
        course_link: keyCodeData?.data?.course_link || "",
      });
    }
  }, [keyCodeData, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("name", data?.name);
    formData.append("instructions", data?.instructions);
    formData.append("course_link", data?.course_link);

    mutate(formData, {
      onSuccess: (data) => {
        Swal.fire({
          text: data?.message,
          icon: "success",
        });
      },
      onError: (err) => {
        Swal.fire({
          text: err?.response?.data?.message,
          icon: "error",
        });
      },
    });
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Title */}
      <SectionTitle title="Add Keycode Banks" />

      {/* White Form Card */}
      <div className="bg-white rounded-[14px] p-8 shadow-sm">
        <FormContainer form={form} onSubmit={onSubmit}>
          <FormInput name="name" label="Name" placeholder="Name here" />

          <FormTextarea
            name={"instructions"}
            label={"Instructions"}
            placeholder={"Instructions here"}
          />

          <FormTextarea
            name={"course_link"}
            label={"Add New Keycodes / Course Links"}
            placeholder={"Add New Keycodes / Course Links here"}
          />

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-10">
            <Button
              asChild={true}
              className="px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50"
            >
              <Link href={"/admin/settings/online_keycodes"}>Back</Link>
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown hover:bg-brown-hover"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Keycode Bank"}
            </Button>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
