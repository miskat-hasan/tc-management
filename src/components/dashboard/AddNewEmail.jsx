"use client";
import FormContainer from "../shared/form/FormContainer";
import SectionTitle from "../common/SectionTitle";
import { useForm } from "react-hook-form";
import FormInput from "../shared/form/FormInput";
import { useRef, useState } from "react";
import CustomSelect from "../shared/form/CustomSelect";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
const RichTextEditor = dynamic(() => import("@/components/shared/RichEditor"), {
  ssr: false,
});
export default function AddEditEmailCampaignPage({ id }) {
  const [timingDays, setTimingDays] = useState("90");
  const form = useForm({
    defaultValues: {},
  });
  const emailBodyRef = useRef(null);
  const onSubmit = (values) => {};
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6  ">
        <SectionTitle title={"Add Email Campaign"} />
      </div>
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          <div className="flex items-center gap-2.5">
            <div className="flex justify-center items-center mt-2 space-x-2  ">
              <FormInput
                name="Timing"
                value={timingDays}
                label={"Send email"}
                placeholder="eg:90"
                className={"!h-[48px] bg-white"}
                onChange={(e) => setTimingDays(e.target.value)}
              />
              <span className="text-gray-700 mt-5">day(s)</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <CustomSelect
                name="Timing"
                label="Timing"
                placeholder="Timing is here"
                options={[
                  {
                    label: "before",
                    value: "before",
                  },
                  {
                    label: "after",
                    value: "after",
                  },
                ]}
              />
              <span className="text-gray-700 mt-8">the class</span>
            </div>
          </div>
          <div>
            <h6 className="leading-[1.45] mb-2.5 font-medium text-base">
              Email Body
            </h6>
            <RichTextEditor ref={emailBodyRef} />
          </div>
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
