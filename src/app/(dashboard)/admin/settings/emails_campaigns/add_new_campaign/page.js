"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React from "react";
import CustomSelect from "@/components/shared/form/CustomSelect";

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
      <SectionTitle title="Add Email Campaigns" />

      {/* White Form Card */}
      <div className="bg-white rounded-[14px] p-8 shadow-sm">
        <FormContainer form={form} onSubmit={onSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <FormInput name="Name" label="Name" placeholder="Name here" />

            <FormInput
              name="Mail From Address"
              label="Mail From Address"
              placeholder="Training@Shellcpr.com"
            />
            <FormInput
              name="Mail From Display Name"
              label="Mail From Display Name"
              placeholder="Mail From Display Name here"
            />

            <FormInput
              name="BCC Emails To"
              label="BCC Emails To"
              placeholder="BCC Emails To here"
            />
          </div>

          {/* Options + Roles */}
          <div className="grid grid-cols-2 gap-10 mt-8">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">Options</p>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Active
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Stop this campaign if the customer registers for a renewal class
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[15px] text-gray-700">
              Send to all Course Types
            </p>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-brown" />
              Yes
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-brown" />
              No
            </label>
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
