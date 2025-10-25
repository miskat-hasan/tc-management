"use client";

import { useForm } from "react-hook-form";

import { useRef, useState } from "react";

import dynamic from "next/dynamic";

import FormContainer from "@/components/shared/form/FormContainer";
import SectionTitle from "@/components/common/SectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import FormTextarea from "@/components/shared/form/FormTextarea";

export default function Page() {
  const form = useForm({
    defaultValues: {},
  });

  const onSubmit = (values) => {};
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6  ">
        <SectionTitle title={"Add New Message"} />
      </div>
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[15px] text-gray-700">Options</p>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-brown" />
              Yes
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-brown" />
              No
            </label>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <FormInput
              name="Phone Number"
              label="Phone Number"
              placeholder="Phone Number here"
            />

            <FormInput
              name="Message Counts"
              label="Message Counts"
              placeholder="Message Counts here"
            />
          </div>

          <FormTextarea
            name={"Message"}
            label={"Message"}
            placeholder={"Message here"}
          />

          {/* Supported Tokens */}
          <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Supported Tokens
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
              <div>
                <span className="font-semibold text-gray-800">[FIRSTNAME]</span>{" "}
                - The student's first name.
              </div>
              <div>
                <span className="font-semibold text-gray-800">[CLASSNAME]</span>{" "}
                - The name of the course.
              </div>
              <div>
                <span className="font-semibold text-gray-800">[CLASSINFO]</span>{" "}
                - This token is replaced by a block of information including the
                class location, instructor, directions and date/times.
              </div>
              <div>
                <span className="font-semibold text-gray-800">[DESCPLINE]</span>{" "}
                - The discipline name associated with the course.
              </div>
              <div>
                <span className="font-semibold text-gray-800">[CLASSID]</span> -
                The ID number of the scheduled class.
              </div>
              <div>
                <span className="font-semibold text-gray-800">
                  [CONFIRMATIONURL]
                </span>{" "}
                - A hyperlink to the registrant's confirmation information.
              </div>
              <div>
                <span className="font-semibold text-gray-800">
                  [PAYMENTORNURL]
                </span>{" "}
                - A hyperlink to the registrant's payment form - used to pay any
                balance due.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[15px] text-gray-700">Options</p>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-brown" />
              No
            </label>
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
          {/* Send  Email Section */}

          <div className="send-email-container flex items-end gap-3.5 w-full">
            <FormInput
              name="Test"
              label={"Test"}
              placeholder="Test Mail Here "
              className={"w-[1400px] h-[48px]"}
            />
            <Button type="button" className={"bg-brown "}>
              Go
            </Button>
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
                Add Email
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
    </div>
  );
}
