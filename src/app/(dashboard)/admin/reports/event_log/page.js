"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import React, { useState } from "react";

const activityLogs = [
  {
    user: "shell",
    timeDate: "10/05/2025 07:00 AM",
    ipAddress: "26.233.10",
    event:
      "Deleted class (American Redcross Course) Adult 1st Aid CPR AED Training Course(277627) on 10/17/2026 AM",
  },
  {
    user: "shell",
    timeDate: "10/05/2025 07:00 AM",
    ipAddress: "26.233.10",
    event:
      "Deleted registrant Dennis Tatum from Redcross Basic Life Support In Person course Sunday, September 21, 2025 at 9:00 AM - Nashville, TN 640 Spence Lane Ste 125 Nashville, TN 37217",
  },
  {
    user: "Caitlynn Myers",
    timeDate: "10/05/2025 07:00 AM",
    ipAddress: "26.233.10",
    event:
      "Deleted class (American Heart Association) AHA Basic Life Support (BLS) Full In-Person Course(425278) on 9/26/2025 3:00:00 PM",
  },
  {
    user: "Caitlynn Myers",
    timeDate: "10/05/2025 07:00 AM",
    ipAddress: "26.233.10",
    event:
      "Deleted class (American Heart Association) Basic Life Support Provider Renewal Course(215376) on 5/26/2025 PM",
  },
  {
    user: "shell",
    timeDate: "10/05/2025 07:00 AM",
    ipAddress: "26.233.10",
    event:
      "Deleted class (American RedCross) Adult and Pediatric First Aid/CPR/AED Blended Learning Course(345029) on 9/24/2025 2:00:00 PM",
  },
];

const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);
  return (
    <div className="flex flex-col gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Event Log"} />
      </div>

      {/* Table */}
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <SubSectionTitle subtitle="All Lists" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50  text-black capitalize text-[16px] font-semibold">
              <tr>
                <th className="px-6 py-3 ">User</th>
                <th className="px-6 py-3">Time/Date</th>
                <th className="px-6 py-3">IP Address</th>
                <th className="px-6 py-3">Event</th>
              </tr>
            </thead>
            <tbody>
              {activityLogs.length > 0 ? (
                activityLogs.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 text-gray-800">{item.user}</td>
                    <td className="px-6 py-4 text-gray-800">{item.timeDate}</td>
                    <td className="px-6 py-4">{item.ipAddress}</td>
                    <td className="px-6 py-4">{item.event}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
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
