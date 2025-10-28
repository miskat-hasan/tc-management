import React from "react";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import { StudentSearchResultsdemoone } from "@/data/data";

const Page = () => {
  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Event Log"} />
      </div>

      {/* Table */}
      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <SubSectionTitle subtitle="All List" />
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-black capitalize text-[16px] sm:text-[20px] font-semibold">
              <tr>
                <th className="px-3 sm:px-6 py-3 w-[40px] whitespace-nowrap">
                  User
                </th>
                <th className="px-3 sm:px-6 py-3 whitespace-nowrap">
                  Time/Date
                </th>
                <th className="px-3 sm:px-6 py-3 whitespace-nowrap">
                  IP Address
                </th>
                <th className="px-3 sm:px-6 py-3 whitespace-nowrap">Event</th>
                <th className="px-3 sm:px-6 py-3 whitespace-nowrap">Class</th>
              </tr>
            </thead>
            <tbody>
              {StudentSearchResultsdemoone.length > 0 ? (
                StudentSearchResultsdemoone.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-3 sm:px-6 py-4 text-gray-800 whitespace-nowrap">
                      <div>
                        <p className="font-medium">{item.user}</p>
                        <p className="text-xs text-gray-500">
                          User ID: {item.id || "-"}
                        </p>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {item.timeDate}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {item.ipAddress}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {item.event}
                    </td>
                    <td className="px-3 sm:px-6 py-4 truncate max-w-[250px]">
                      {item.class}
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
      </div>
    </div>
  );
};

export default Page;
