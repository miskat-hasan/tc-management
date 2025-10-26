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
    <div className="flex flex-col gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"What’s New"} />
      </div>

      {/* Table */}
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <div className="flex items-center justify-between">
          <SubSectionTitle subtitle="All Lists" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-black capitalize text-[20px] font-semibold">
              <tr>
                <th className=" py-3 w-[200px] ">Date</th>
                <th className=" py-3 grow">Update</th>
              </tr>
            </thead>
            <tbody>
              {whatsnewData.length > 0 ? (
                whatsnewData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className=" py-4  ">{item.date}</td>
                    <td className=" py-4  ">{item.update}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    <NotFound title={"No Record Found"} />
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
  );
};

export default Page;
