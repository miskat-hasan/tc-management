import React from "react";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import { StudentSearchResultsdemoone } from "@/data/data";

const Page = () => {
  return (
    <div className="flex flex-col gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Event Log"} />
      </div>

      {/* Table */}
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <SubSectionTitle subtitle="All List" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-black capitalize text-[20px] font-semibold">
              <tr>
                <th className="px-6 py-3 w-[40px]">User</th>
                <th className="px-6 py-3">Time/Date</th>
                <th className="px-6 py-3">IP Address</th>
                <th className="px-6 py-3">Event</th>
              </tr>
            </thead>
            <tbody>
              {StudentSearchResultsdemoone.length > 0 ? (
                StudentSearchResultsdemoone.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 text-gray-800">
                      <div>
                        <p>{item.user}</p>
                        <p className="text-xs text-gray-500"></p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.timeDate}</td>
                    <td className="px-6 py-4">{item.ipAddress}</td>
                    <td className="px-6 py-4">{item.event}</td>
                    <td className="px-6 py-4 truncate max-w-[250px]">
                      {item.class}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
