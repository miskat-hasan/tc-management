"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React from "react";
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
      <SectionTitle title="New Asset Location" />
      <div className="bg-white rounded-[14px] p-4 lg:p-8 shadow-sm">
        <p className="text-gray-500">
          Have a te&lical issue or an enhancement request? You can send an emai
          to <b className="text-black">support@enrolhvare.com</b> or fill out
          the form below We will be in touch as soon as possible.
        </p>
      </div>
      {/* White Form Card */}
      <div className="bg-white rounded-[14px] p-4 lg:p-8 shadow-sm">
        <FormContainer form={form} onSubmit={onSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-5">
            <FormInput name="name" label="Name" placeholder="Name here" />

            <FormInput
              name="mobilePhone"
              label="Mobile Phone"
              placeholder="Mobile"
            />

            <div className="col-span-full w-full flex flex-col gap-2 lg:gap-5">
              <FormInput
                name="emailAddress"
                label="Email Address"
                placeholder="Email"
              />
              <FormTextarea
                name={"note"}
                label={"Note"}
                placeholder={"Note here"}
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-5 lg:mt-10">
            <Button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown hover:bg-brown-hover"
            >
              Send Message
            </Button>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
