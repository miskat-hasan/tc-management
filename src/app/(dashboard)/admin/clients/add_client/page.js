"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";

const RichTextEditor = dynamic(() => import("@/components/shared/RichEditor"), {
  ssr: false,
});
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

    console.log(finalData);
  };
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title={"Add Client"} />
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              name="company"
              label="Company"
              placeholder="User name here"
            />
            <FormInput
              name="abbreviation"
              label="Abbreviation"
              placeholder="Abbreviation"
            />

            <FormInput
              name="contactFirstName"
              label="Contact First Name"
              placeholder="First name here"
            />
            <FormInput
              name="contactLastName"
              label="Contact Last Name"
              placeholder="Last name here"
            />

            <FormInput
              name="emailAddress"
              label="Email Address"
              placeholder="Email here"
            />
            <FormInput
              name="contactDate"
              label="Contact Date"
              placeholder="Date"
            />

            <FormInput name="website" label="Website" placeholder="Website" />
            <FormInput
              name="mainPhone"
              label="Main Phone"
              placeholder="Phone"
            />

            <FormInput
              name="mobilePhone"
              label="Mobile Phone"
              placeholder="Mobile"
            />
            <FormInput name="fax" label="Fax" placeholder="Fax here" />

            <FormInput
              name="address1"
              label="Address 1"
              placeholder="Address"
            />
            <FormInput
              name="address2"
              label="Address 2"
              placeholder="Address"
            />

            <FormInput name="city" label="City" placeholder="City" />
            <FormInput
              name="stateProvince"
              label="State/Province/Region"
              placeholder="State"
            />

            <FormInput
              name="zipPostalCode"
              label="Zip/Postal Code"
              placeholder="Postal code"
            />
            <FormInput name="country" label="Country" placeholder="Choose" />
          </div>

          <FormInput
            name="ccConfirmationsTo"
            label="CC Confirmations To"
            placeholder="CC Confirmations To"
          />

          <div>
            <h6 className="leading-[1.45] mb-2.5 font-medium text-base">
              Shared Notes
            </h6>
            <RichTextEditor ref={sharedNotesRef} />
          </div>
          <div>
            <h6 className="leading-[1.45] mb-2.5 font-medium text-base">
              Internal Notes
            </h6>
            <RichTextEditor ref={internalNotesRef} />
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
                Add Client
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
