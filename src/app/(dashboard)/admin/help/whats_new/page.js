"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/button";
import { assestsInstallation, whatsnewData } from "@/data/data";
import { PlusIcon } from "@/svg/SvgContainer";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";

const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);

  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"What’s New"} />
      </div>

      {/* Table */}
      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <div className="flex items-center justify-between">
          <SubSectionTitle subtitle="All Lists" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-black capitalize text-[16px] md:text-[20px] font-semibold">
              <tr>
                <th className="px-3 py-3 md:px-6 w-[150px] md:w-[200px] whitespace-nowrap">
                  Date
                </th>
                <th className="px-3 py-3 md:px-6 whitespace-nowrap">Update</th>
              </tr>
            </thead>

            <tbody>
              {whatsnewData.length > 0 ? (
                whatsnewData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-3 py-3 md:px-6 text-gray-800 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-3 py-3 md:px-6 text-gray-800">
                      {item.update}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center py-3 lg:py-6 text-gray-500 italic"
                  >
                    <NotFound title="No Record Found" />
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
