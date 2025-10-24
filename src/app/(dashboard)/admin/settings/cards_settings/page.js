"use client";

import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";

import React, { useRef } from "react";

import { useForm } from "react-hook-form";

const Page = () => {
  const sharedNotesRef = useRef(null);
  const internalNotesRef = useRef(null);
  const form = useForm({
    defaultValues: {},
  });

  const onSubmit = (values) => {
    const sharedNotes = sharedNotesRef.current?.getContent();
    const internalNotes = internalNotesRef.current?.getContent();

    const finalData = {
      ...values,
      sharedNotes,
      internalNotes,
    };
  };
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title={"Certification Card Settings"} />
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <SubSectionTitle className={"!text-2xl"} subtitle={"Setting Profile"} />
        <FormContainer form={form} onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              name="Profile Name"
              label="Profile Name"
              placeholder="Profile Name Here"
            />

            <CustomSelect
              name="Card Type"
              label="Card Type"
              placeholder="Card Type here"
              options={[
                {
                  label: "Card Type 1",
                  value: "Card Type 1",
                },
              ]}
            />
            <FormInput
              name="Training Ctr"
              label="Training Ctr"
              placeholder="Training Ctr here"
            />

            <FormInput
              name="TC Info"
              label="TC Info"
              placeholder="TC Info here"
            />
          </div>

          <div className="mt-6">
            <FormInput
              name="Course Location"
              label="Course Location"
              placeholder="Course Location here"
            />
          </div>

          <div className="grid grid-cols-3 gap-6 mt-6">
            <CustomSelect
              name="Card Type"
              label="Card Type"
              placeholder="Card Type here"
              options={[
                {
                  label: "Card Type 1",
                  value: "Card Type 1",
                },
              ]}
            />

            <CustomSelect
              name="Card Type"
              label="Card Type"
              placeholder="Card Type here"
              options={[
                {
                  label: "Card Type 1",
                  value: "Card Type 1",
                },
              ]}
            />

            <CustomSelect
              name="Card Type"
              label="Card Type"
              placeholder="Card Type here"
              options={[
                {
                  label: "Card Type 1",
                  value: "Card Type 1",
                },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2 my-6">
            <p className="font-semibold text-[15px] text-gray-700">Options</p>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-brown" />
              This is the default card printing profile
            </label>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex justify-end gap-4 mt-8">
              <Button
                type="button"
                className="px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50 focus:outline-none"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown cursor hover:bg-brown-hover focus:outline-none"
              >
                Update Settings
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
