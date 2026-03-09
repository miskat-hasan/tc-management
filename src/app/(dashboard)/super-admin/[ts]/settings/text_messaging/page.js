"use client";
import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import { PlusIcon } from "@/svg/SvgContainer";
import { useRouter } from "next/navigation";
import { scheduledTextMessages } from "@/data/data";
import { CiEdit } from "react-icons/ci";

const Page = () => {
  const form = useForm({
    defaultValues: {},
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const [selectedShow, setSelectedShow] = useState(50);
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/admin/settings/text_messaging/add_new_message");
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Title */}
      <SectionTitle title="Text Messaging Settings" />

      {/* White Form Card */}
      <div className="bg-white rounded-[14px] p-8 shadow-sm flex flex-col gap-5">
        <SubSectionTitle className={"text-[20px]"} subtitle="Basic Settings" />
        <FormContainer form={form} onSubmit={onSubmit}>
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
            <FormInput
              name="Auto Reply"
              label="Auto Reply"
              placeholder="Auto Reply here"
            />

            <FormInput
              name="Forward Email"
              label="Forward Email"
              placeholder="Forward Email here"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-10">
            <Button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown hover:bg-brown-hover"
            >
              Save Changes
            </Button>
          </div>
        </FormContainer>
      </div>

      <div className="bg-white rounded-[14px] p-8 shadow-sm flex flex-col gap-5">
        <div className="flex justify-between">
          <SectionTitle title={"Scheduled Text Messages"} />
          <Button
            onClick={handleNavigate}
            className="py-[22px] cursor-pointer bg-brown flex items-center gap-2"
          >
            Add New Message <PlusIcon />
          </Button>
        </div>

        <div className="bg-white rounded-[14px] flex flex-col gap-[24px]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 text-black text-[16px] font-semibold">
                <tr>
                  <th className="px-6 py-3">Day to Send </th>
                  <th className="px-6 py-3">Name </th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {scheduledTextMessages.length > 0 ? (
                  scheduledTextMessages.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="px-6 py-4">{item.dayToSend}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.message}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                          <CiEdit className="text-gray-600 text-[16px]" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer controls */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">Show:</span>
              <select
                value={selectedShow}
                onChange={(e) => setSelectedShow(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm text-gray-500 border rounded-md hover:bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1 text-sm border border-blue-500 rounded-md text-blue-600">
                1
              </button>
              <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
                3
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 border rounded-md hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
