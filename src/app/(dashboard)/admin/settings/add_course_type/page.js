"use client";

import SectionTitle from "@/components/common/SectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

const RichTextEditor = dynamic(() => import("@/components/shared/RichEditor"), {
  ssr: false,
});

const Page = () => {
  // Renamed refs to match the fields in the image
  const descriptionRef = useRef(null);
  const emailBodyRef = useRef(null);

  const form = useForm({
    defaultValues: {},
  });

  const onSubmit = (values) => {
    // Get content from the new refs
    const description = descriptionRef.current?.getContent();
    const emailBody = emailBodyRef.current?.getContent();

    const finalData = {
      ...values,
      description,
      emailBody,
    };

    console.log("Form Data:", finalData);
  };

  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title={"Add / Edit Course Type"} />
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
            <FormInput
              name="courseName"
              label="Course Name"
              placeholder="Course name here"
            />

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">Mode</p>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                On-site: The course is taught in person at a physical location.
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Blended: The course has both online and in-person components.
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Online: All class instruction, assignments, and tests are
                asynchronous and can be completed virtually.
              </label>
            </div>

            <FormInput
              name="Discipline"
              label="Discipline"
              placeholder="Discipline"
            />

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">
                Price Options
              </p>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Allow registrations with a deposit
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Allow multiple pricing levels
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Online: All class instruction, assignments, and tests are
                asynchronous and can be completed virtually.
              </label>
            </div>

            <FormInput name="price" label="Price" placeholder="Price" />

            <div className="grid grid-cols-2 gap-6">
              <FormInput
                name="addonPrompt"
                label="Add-on Prompt"
                placeholder="Prompt"
              />
              <CustomSelect
                id="addon"
                label="Add Ons"
                placeholder="Click to select"
                options={[
                  {
                    value: "addon 1",
                    label: "addon 1",
                  },
                  {
                    value: "addon 2",
                    label: "addon 2",
                  },
                ]}
                // onChange={(val) => handleSelectChange("instructor", val)}
                className="flex-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormInput
                name="Shipping Price"
                label="Shipping Price"
                placeholder="Shipping Price"
              />

              <CustomSelect
                id="UseKeycodeBank"
                label="Use Keycode Bank"
                placeholder="Click to select"
                options={[
                  {
                    value: "Use Keycode Bank 1",
                    label: "Use Keycode Bank 1",
                  },
                  {
                    value: "Use Keycode Bank 2",
                    label: "Use Keycode Bank 2",
                  },
                ]}
                // onChange={(val) => handleSelectChange("instructor", val)}
                className="flex-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <CustomSelect
                id="courseCertifyingBody"
                label="Course Certifying Body"
                placeholder="Choose body"
                options={[
                  {
                    value: "Course Certifying Body 1",
                    label: "Course Certifying Body 1",
                  },
                  {
                    value: "Course Certifying Body 2",
                    label: "Course Certifying Body 2",
                  },
                ]}
              />

              <CustomSelect
                id="cardType"
                label="Card Type"
                placeholder="Choose type"
                options={[
                  {
                    value: "Choose type 1",
                    label: "Choose type 1",
                  },
                  {
                    value: "Choose type 2",
                    label: "Choose type 2",
                  },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <CustomSelect
                id="secondCardType"
                label="Second Card Type"
                placeholder="Choose type"
                options={[
                  {
                    value: "Choose type 1",
                    label: "Choose type 1",
                  },
                  {
                    value: "Choose type 2",
                    label: "Choose type 2",
                  },
                ]}
              />
              <CustomSelect
                id="image"
                label="Image"
                placeholder="Image URL or upload"
                options={[
                  {
                    value: "Choose image 1",
                    label: "Choose image 1",
                  },
                  {
                    value: "Choose image 2",
                    label: "Choose image 2",
                  },
                ]}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">Options</p>
              <div className="flex  items-center gap-2 text-gray-400 max-w-[1400px] flex-wrap">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Prompt for certification / recertification during registration
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Include student to instructor ratio on roster
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Include student to manikin ratio on roster
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Include electronic signature for AHA roster
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Use certificate number instead of test score (online course)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Show the number of seats remaining on the schedule page
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Allow students to select "will call to schedule"
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Prompt for license number during registration
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Require license number during registration
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Allow an alternate date/time description{" "}
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Enable Registration Waitlist
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Enable Class Roster Expirations
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-brown" />
                  Automatic Waitlist
                </label>
              </div>
            </div>

            <FormInput
              name="ceucredits"
              label="CEU Credits"
              placeholder="Choose user"
            />

            <div>
              <h6 className="leading-[1.45] mb-2.5 font-medium text-base">
                Description
              </h6>
              <RichTextEditor ref={descriptionRef} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormInput
                name="courseConfirmationEmailCCS"
                label="Course Confirmation Email CCS"
                placeholder="Email addresses"
              />
              <FormInput
                name="courseConfirmationEmailSubject"
                label="Course Confirmation Email Subject"
                placeholder="Subject line"
              />
            </div>

            <FormInput
              name="payloadConfirmationEmailSubject"
              label="Payload Confirmation Email Subject"
              placeholder="Subject line"
            />

            <div>
              <h6 className="leading-[1.45] mb-2.5 font-medium text-base">
                Course Confirmation Email Body
              </h6>
              <RichTextEditor ref={emailBodyRef} />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input type="checkbox" className="accent-brown" />
              Use the above email body for class regstrations and general
              payments
            </label>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">
                SEO & Rich Results
              </p>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Enable
              </label>
            </div>

            <FormInput
              name="seoDescription"
              label="An SEO-friendly description of the course. Recommended length: 240 characters. Maximum length: 500 characters"
              placeholder="An SEO-friendly description..."
            />
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
                Save Course Type
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
