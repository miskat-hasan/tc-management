"use client";

import SectionTitle from "@/components/common/SectionTitle";
import CreditCardSettings from "@/components/dashboard/CreditCardSettings";
import RegistrationSettings from "@/components/dashboard/RegistrationSettings";
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
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <SectionTitle title={"Basic Site Settings"} />
        <FormContainer form={form} onSubmit={onSubmit}>
          <FormInput
            name="company"
            label="Company"
            placeholder="Company name here"
          />
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              name="Tag Line"
              label="Tag Line"
              placeholder="Tag Line Here"
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

            <FormInput name="website" label="Website" placeholder="Website" />
            <FormInput name="Phone" label="Phone" placeholder="Phone" />
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
            <FormInput
              name="timezone"
              label="Time Zone"
              placeholder="Time Zone Here"
            />
            <FormInput
              name="Training Center Name"
              label="Training Center Name"
              placeholder="Training Center Name Here"
            />
            <FormInput
              name="Training Center ID"
              label="Training Center ID"
              placeholder="Training Center ID Here"
            />
            <FormInput
              name="HSI API Key"
              label="HSI API Key"
              placeholder="HSI API Key Here"
            />
            <FormInput
              name="AHA eCard API"
              label="AHA eCard API"
              placeholder="AHA eCard API Here"
            />
            <FormInput
              name="Training Site ID"
              label="Training Site ID"
              placeholder="Training Site ID Here"
            />
            <FormInput
              name="American Red Cross CRE API"
              label="American Red Cross CRE API"
              placeholder="American Red Cross CRE API Here"
            />
            <FormInput
              name="American Red Cross Account ID"
              label="American Red Cross Account ID"
              placeholder="American Red Cross Account ID Here"
            />
            <FormInput
              name="Zapier Class Webhook"
              label="Zapier Class Webhook"
              placeholder="Zapier Class Webhook Here"
            />
            <FormInput
              name="Zapier Registration Webhook"
              label="Zapier Registration Webhook"
              placeholder="Zapier Registration Webhook Here"
            />
            <FormInput
              name="Zapier Registration Status Change Webhook"
              label="Zapier Registration Status Change Webhook"
              placeholder="Zapier Registration Status Change Webhook Here"
            />
          </div>
          <FormInput
            name="Zapier TC Product Order Webhook"
            label="Zapier TC Product Order Webhook"
            placeholder="Zapier TC Product Order Webhook Here"
          />
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
                Update setting
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
      <CreditCardSettings />
      <RegistrationSettings />
    </section>
  );
};

export default Page;
