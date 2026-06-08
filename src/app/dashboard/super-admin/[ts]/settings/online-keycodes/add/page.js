"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React from "react";
import FormTextarea from "@/components/shared/form/FormTextarea";
import { addKeyCodeBank } from "@/hooks/api/dashboardApi";
import Link from "next/link";
import Swal from "sweetalert2";
import { toast } from "sonner";
import BackButton from "@/components/common/BackButton";

const Page = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      instructions: "",
      course_link: "",
    },
  });
  const { reset } = form;

  const { mutate, isPending } = addKeyCodeBank();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data?.name);
    formData.append("instructions", data?.instructions);
    formData.append("course_link", data?.course_link);

    mutate(formData, {
      onSuccess: (data) => {
        reset();
        toast.success(data?.message || "Keycode Bank added successfully");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Something went wrong!");
      },
    });
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Title */}
      <SectionTitle title="Add Keycode Banks" />

      {/* White Form Card */}
      <div className="bg-white dark:bg-black rounded-[14px] p-8 shadow-sm">
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
            <BackButton />
            <Button
              type="submit"
              className="primary-btn"
              disabled={isPending}
            >
              {isPending ? "Adding ..." : "Add Keycode Bank"}
            </Button>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
