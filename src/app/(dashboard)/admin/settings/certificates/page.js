"use client";
import SectionTitle from "@/components/common/SectionTitle";

import { Button } from "@/components/ui/button";
import { keycodeSales } from "@/data/data";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { HiOutlineDownload } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";

const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);
  const router = useRouter();
  const handleNavigation = () => {
    router.push("/admin/settings/upload_certificate");
  };
  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Certificates"} />
        <Button
          onClick={handleNavigation}
          className="py-[11px] lg:py-[22px] cursor-pointer bg-brown flex items-center gap-2"
        >
          Upload Certificate
        </Button>
      </div>

      {/* Table */}
      <div className="p-[11px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-black capitalize text-[16px] md:text-[20px] font-semibold">
              <tr>
                <th className="px-3 md:px-6 py-3 whitespace-nowrap">Name</th>
                <th className="px-3 md:px-6 py-3 text-right whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {keycodeSales.length > 0 ? (
                keycodeSales.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-3 md:px-6 py-4 text-gray-800 whitespace-nowrap">
                      {item.name}
                    </td>

                    <td className="px-3 md:px-6 py-4 flex gap-2.5 justify-end">
                      <button className="p-2 cursor-pointer bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        <HiOutlineDownload className="text-gray-600 text-[16px]" />
                      </button>
                      <button className="p-2 bg-gray-100 cursor-pointer rounded-lg hover:bg-red-300 transition">
                        <HiOutlineTrash className="text-gray-600 text-[16px]" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
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
    </div>
  );
};

export default Page;
