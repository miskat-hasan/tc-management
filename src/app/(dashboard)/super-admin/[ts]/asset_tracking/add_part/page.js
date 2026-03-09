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
    <section className="flex flex-col gap-2 lg:gap-4">
      {/* Title */}
      <SectionTitle title="New Asset Tracking Part" />

      {/* White Form Card */}
      <div className="bg-white rounded-[14px] p-4 lg:p-8 shadow-sm">
        <FormContainer form={form} onSubmit={onSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 md:gap-y-5">
            <FormInput name="name" label="Name" placeholder="Name here" />
            <FormInput
              name="part"
              label="Part #"
              placeholder="Part Name here"
            />
            <FormInput
              name="Manufacturer"
              label="Manufacturer"
              placeholder="Manufacturer name here"
            />
            <FormInput
              name="manufacturer_part"
              label="Manufacturer Part"
              placeholder="Manufacturer Parts name here"
            />

            <div className="col-span-full w-full">
              <FormTextarea
                name={"note"}
                label={"Note"}
                placeholder={"Note here"}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">Options</p>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Has Serial Number
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Track Expiration Date
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Track Purchase Date
              </label>
            </div>
          </div>

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
              Save Changes
            </Button>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
