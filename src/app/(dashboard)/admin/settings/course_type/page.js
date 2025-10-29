"use client";

import SectionTitle from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { coursesType } from "@/data/data";
import { PlusIcon } from "@/svg/SvgContainer";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const Page = () => {
  const router = useRouter();
  const [selectedShow, setSelectedShow] = useState(50);
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === coursesType.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(coursesType.map((_, i) => i));
    }
  };

  const handleNavigation = () => {
    router.push("/admin/settings/add_course_type");
  };
  return (
    <div>
      <SectionTitle title={"Course Type"} />
      <div className="py-[10px] lg:py-[20px]  rounded-[16px] flex flex-col gap-2.5 ">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 text-[#8C8C8C]">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 bg-transparent accent-[#8C8C8C]"
            />
            <label className="text-[12px]">Show Archived Courses</label>
          </div>
          <div className="flex  gap-2.5">
            <Button
              onClick={handleNavigation}
              className="py-[11px] text-[12px] lg:text-base lg:py-[22px] cursor-pointer bg-brown flex items-center gap-2"
            >
              Add Course Type
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-black text-[14px] md:text-[16px] font-semibold">
              <tr>
                <th className="px-3 py-3 md:px-6">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#8C8C8C]"
                    onChange={toggleAllRows}
                    checked={selectedRows.length === coursesType.length}
                  />
                </th>
                <th className="px-3 py-3 md:px-6 whitespace-nowrap">Name</th>
                <th className="px-3 py-3 md:px-6 whitespace-nowrap">
                  Discipline
                </th>
                <th className="px-3 py-3 md:px-6 whitespace-nowrap">Add-ons</th>
                <th className="px-3 py-3 md:px-6 whitespace-nowrap">Price</th>
                <th className="px-3 py-3 md:px-6 whitespace-nowrap">Ship</th>
                <th className="px-3 py-3 md:px-6 whitespace-nowrap">eCard</th>
                <th className="px-3 py-3 md:px-6 text-center whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {coursesType.length > 0 ? (
                coursesType.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-gray-50 transition-all ${
                      selectedRows.includes(index) ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="px-3 py-4 md:px-6">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#8C8C8C]"
                        checked={selectedRows.includes(index)}
                        onChange={() => toggleRow(index)}
                      />
                    </td>
                    <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                      {item.Name}
                    </td>
                    <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                      {item.Discipline}
                    </td>
                    <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                      {item["Add-ons"] || item.Add_ons || "--"}
                    </td>
                    <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                      {item.Price}
                    </td>
                    <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                      {item.Ship}
                    </td>
                    <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                      {item.eCard}
                    </td>
                    <td className="px-3 py-4 md:px-6 text-center whitespace-nowrap">
                      <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        <CiEdit className="text-gray-600 text-[16px]" />
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
