"use client";

import React, { useRef } from "react";
import FormContainer from "../shared/form/FormContainer";
import SectionTitle from "../common/SectionTitle";
import FormInput from "../shared/form/FormInput";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

const CreditCardSettings = () => {
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
    <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
      <SectionTitle title={"Credit Card Services Settings"} />
      <FormContainer form={form} onSubmit={onSubmit}>
        <FormInput
          name="Merchant ID"
          label="Merchant ID"
          placeholder="Merchant ID here"
        />
        <FormInput
          name="Payment Notifications To"
          label="Payment Notifications To"
          placeholder="Payment Notifications To Here"
        />
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-[15px] text-gray-700">Options</p>
          <label className="flex items-center gap-2 text-[12px] sm:text-sm">
            <input type="checkbox" className="accent-brown" />
            Enable QuickBooks sync (more info)
          </label>
          <label className="flex items-center gap-2 text-[12px] sm:text-sm">
            <input type="checkbox" className="accent-brown" />
            Include a payment form link in the receipt for registrations with a
            balance due (more info)
          </label>
          <label className="flex items-center gap-2 text-[12px] sm:text-sm">
            <input type="checkbox" className="accent-brown" />
            Strict AVS
          </label>
        </div>

        <FormInput
          name="Merchant Capital Advance"
          label="Merchant Capital Advance"
          placeholder="Merchant Capital Advance Here"
        />
        <div className="flex items-center justify-end">
          <div className="flex justify-end gap-4 mt-4 lg:mt-8">
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
              Update setting
            </Button>
          </div>
        </div>
      </FormContainer>
    </div>
  );
};

export default CreditCardSettings;
