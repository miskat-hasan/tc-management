"use client";
import SectionTitle from "@/components/common/SectionTitle";

import { Button } from "@/components/ui/button";
import { instructorData, keycodeData } from "@/data/data";
import { PlusIcon } from "@/svg/SvgContainer";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

import { useRouter } from "next/navigation";
import { getAllKeyCodeBank } from "@/hooks/api/dashboardApi";
import TableSkeleton from "@/components/common/TableSkelation";
import Link from "next/link";

const Page = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [selectedShow, setSelectedShow] = useState(50);
  const router = useRouter();

  const { data: keycodeData, isLoading: keycodeDataLoading } =
    getAllKeyCodeBank(page, perPage);

  const handleNavigate = () => {
    router.push("/admin/settings/add_keycodes_bank");
  };
  return (
    <section className="flex flex-col gap-[12.5px] lg:gap-[25px] ">
      <div className="flex justify-between">
        <SectionTitle title={"Keycode Banks"} />
        <Button
          onClick={handleNavigate}
          className="py-[11px] lg:py-[22px] text-[12px] lg:text-base cursor-pointer bg-brown flex items-center gap-2"
        >
          Add keycode bank <PlusIcon />
        </Button>
      </div>

      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        {keycodeDataLoading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 text-black text-[14px] md:text-[16px] font-semibold">
                <tr>
                  <th className="px-3 md:px-6 py-3 whitespace-nowrap">Name</th>
                  <th className="px-3 md:px-6 py-3 whitespace-nowrap">Total</th>
                  <th className="px-3 md:px-6 py-3 whitespace-nowrap">
                    Unused
                  </th>
                  <th className="px-3 md:px-6 py-3 text-center whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {keycodeData?.data?.data?.length > 0 ? (
                  keycodeData?.data?.data?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-800">
                          {item.name}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                        {item.total}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                        {item.unused}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-center whitespace-nowrap">
                        <Link href={`online_keycodes/${item.id}`}>
                        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                          <CiEdit className="text-gray-600 text-[16px]" />
                        </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex flex-col md:flex-row items-center justify-end mt-3 lg:mt-6 gap-3">
          {/* Show per page */}
          {/* <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Show:</span>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div> */}

          {/* Pagination */}
          <div className="flex items-center gap-2">
            {keycodeData?.data?.data?.links?.map((link, index) => (
              <button
                key={index}
                disabled={link.url === null || link.page === null}
                onClick={() => link.page && setPage(link.page)}
                className={`px-3 py-1 text-sm border rounded-md ${
                  link.active
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "hover:bg-gray-100"
                } ${
                  link.url === null || link.page === null
                    ? "text-gray-400 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
