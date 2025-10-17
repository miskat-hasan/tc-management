"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";

import { useForm } from "react-hook-form";

const page = () => {
  const form = useForm({
    defaultValues: {},
  });

  const onSubmit = (values) => {};
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
        </FormContainer>
      </div>
    </section>
  );
};

export default page;
