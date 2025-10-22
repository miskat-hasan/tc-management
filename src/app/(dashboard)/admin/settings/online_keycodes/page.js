"use client";
import SectionTitle from "@/components/common/SectionTitle";

import { Button } from "@/components/ui/button";
import { instructorData, keycodeData } from "@/data/data";
import { PlusIcon } from "@/svg/SvgContainer";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

import { useRouter } from "next/navigation";

const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);
  const router = useRouter();

  const onSubmit = (values) => {
    console.log(values);
  };

  const handleNavigate = () => {
    router.push("/admin/settings/add_keycodes_bank");
  };
  return (
    <section className="flex flex-col gap-[25px] ">
      <div className="flex justify-between">
        <SectionTitle title={"Keycode Banks"} />
        <Button
          onClick={handleNavigate}
          className="py-[22px] cursor-pointer bg-brown flex items-center gap-2"
        >
          Add keycode bank <PlusIcon />
        </Button>
      </div>

      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-black text-[16px] font-semibold">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Total </th>
                <th className="px-6 py-3">Unused</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {keycodeData.length > 0 ? (
                keycodeData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.total}</td>
                    <td className="px-6 py-4">{item.unused}</td>

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
    </section>
  );
};

export default Page;
