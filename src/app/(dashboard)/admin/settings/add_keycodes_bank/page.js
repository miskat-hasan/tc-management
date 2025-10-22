"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React from "react";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormTextarea from "@/components/shared/form/FormTextarea";

const Page = () => {
  const form = useForm({
    defaultValues: {},
  });

  const onSubmit = (values) => {
    console.log(values);
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
            name={"Instructions"}
            label={"Instructions"}
            placeholder={"Instructions here"}
          />

          <FormTextarea
            name={"add_new_keycodes"}
            label={"Add New Keycodes / Course Links"}
            placeholder={"Add New Keycodes / Course Links here"}
          />

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-10">
            <Button
              type="button"
              className="px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown hover:bg-brown-hover"
            >
              Update Keycode Bank
            </Button>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
