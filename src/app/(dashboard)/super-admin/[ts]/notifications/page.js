"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";

import { notifications } from "@/data/data";

const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);

  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Notifications"} />
      </div>

      {/* Table */}
      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <div>
          <SubSectionTitle subtitle="Total Notifications : 5" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            {/* Table Header — hidden on mobile */}
            <thead className="hidden md:table-header-group bg-gray-50 text-black capitalize text-[16px] md:text-[20px] font-semibold">
              <tr>
                <th className="px-4 md:px-6 py-3">Unread</th>
                <th className="px-4 md:px-6 py-3">Message</th>
                <th className="px-4 md:px-6 py-3">Notification Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {notifications?.length > 0 ? (
                notifications.map((item, index) => (
                  <tr
                    key={index}
                    className="block md:table-row border-b md:border-0 hover:bg-gray-50 transition-all"
                  >
                    {/* Mobile Card Layout */}
                    <td className="block md:table-cell px-4 md:px-6 py-3 text-gray-800 md:flex md:flex-col border-b md:border-none">
                      <div className="md:hidden mb-1 font-semibold text-gray-500">
                        Unread
                      </div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-xs">{item.email}</p>
                    </td>

                    <td className="block md:table-cell px-4 md:px-6 py-3 border-b md:border-none">
                      <div className="md:hidden mb-1 font-semibold text-gray-500">
                        Message
                      </div>
                      {item.message}
                    </td>

                    <td className="block md:table-cell px-4 md:px-6 py-3 border-b md:border-none">
                      <div className="md:hidden mb-1 font-semibold text-gray-500">
                        Notification Date
                      </div>
                      {item.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
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
