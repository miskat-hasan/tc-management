"use client";
import SectionTitle from "@/components/common/SectionTitle";

import { Button } from "@/components/ui/button";
import { instructorData } from "@/data/data";
import { PlusIcon } from "@/svg/SvgContainer";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);
  const router = useRouter();
  const form = useForm({
    defaultValues: {},
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const handleNavigate = () => {
    router.push("/admin/settings/add_product_ons");
  };
  return (
    <section className="flex flex-col gap-[12.5px] lg:gap-[25px] ">
      <div className="flex justify-between">
        <SectionTitle title={"Product Add-ons"} />
        <Button
          onClick={handleNavigate}
          className="py-[11px] lg:py-[22px] cursor-pointer bg-brown flex items-center gap-2"
        >
          New Add on
          <PlusIcon />
        </Button>
      </div>

      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-black text-[14px] md:text-[16px] font-semibold">
              <tr>
                <th className="px-3 md:px-6 py-3 whitespace-nowrap">
                  Product Code
                </th>
                <th className="px-3 md:px-6 py-3 whitespace-nowrap">Name</th>
                <th className="px-3 md:px-6 py-3 whitespace-nowrap">
                  Display Order
                </th>
                <th className="px-3 md:px-6 py-3 whitespace-nowrap">Price</th>
                <th className="px-3 md:px-6 py-3 text-center whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {instructorData.length > 0 ? (
                instructorData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {item.name}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {item.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      {item.ahaId}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      {item.certification}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      {item.expires}
                    </td>
                    <td className="px-3 md:px-6 py-4 text-center whitespace-nowrap">
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
        <div className="flex flex-col md:flex-row items-center justify-between mt-3 lg:mt-6 gap-3">
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

      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2.5 lg:gap-x-6 lg:gap-y-5">
            <FormInput
              name="Pickup Text"
              label="Pickup Text"
              placeholder="Pickup text here"
            />

            <FormInput
              name="Shipping Days"
              label="Shipping Days"
              placeholder="Shipping Days here"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-5 lg:mt-10">
            <Button
              type="button"
              className="px-3 md:px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="px-3 md:px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown hover:bg-brown-hover"
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
