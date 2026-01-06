"use client";

import SectionTitle from "@/components/common/SectionTitle";
import TableSkeleton from "@/components/common/TableSkelation";
import { Button } from "@/components/ui/button";
import { getAllCertification } from "@/hooks/api/dashboardApi";
import { PlusIcon } from "@/svg/SvgContainer";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";

const page = () => {
  const { data, isLoading } = getAllCertification();

  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      <div className="flex justify-between">
        <SectionTitle title={"Certifications List"} />

        <Button
          asChild={true}
          className="py-[11px] lg:py-[22px] cursor-pointer bg-brown flex items-center gap-2"
        >
          <Link href={"/admin/instructors/certifications/new"}>
            Add Certification <PlusIcon />
          </Link>
        </Button>
      </div>
      {isLoading ? (
        <TableSkeleton rows={6} columns={5} />
      ) : (
        <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-sm sm:text-base text-left text-gray-700">
              <thead className="bg-gray-50 text-black capitalize text-[14px] sm:text-[20px] font-semibold">
                <tr>
                  <th className="px-3 sm:px-6 py-3">Discipline</th>
                  <th className="px-3 sm:px-6 py-3">Initial</th>
                  <th className="px-3 sm:px-6 py-3">Expires</th>
                  <th className="px-3 sm:px-6 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {data?.data?.length > 0 ? (
                  data?.data?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="px-3 sm:px-6 py-3 text-gray-800 whitespace-nowrap">
                        {item?.discipline?.name}
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                        {item?.initial}
                      </td>
                      <td className="px-3 sm:px-6 py-3 truncate max-w-[150px] sm:max-w-[250px]">
                        {item.expires}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-center">
                        <Link
                          href={`/admin/instructors/certifications/${item?.id}`}
                          className="p-1.5 sm:p-2 bg-gray-100 rounded-lg inline-block hover:bg-gray-200 transition"
                        >
                          <CiEdit className="text-gray-600 text-[14px] sm:text-[16px]" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-3 sm:py-6 text-gray-500 italic"
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
                // value={selectedShow}
                // onChange={(e) => setSelectedShow(e.target.value)}
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
      )}
    </div>
  );
};

export default page;
