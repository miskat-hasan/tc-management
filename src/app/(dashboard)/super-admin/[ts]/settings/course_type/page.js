"use client";

import SectionTitle from "@/components/common/SectionTitle";
import TableSkeleton from "@/components/common/TableSkelation";
import { Button } from "@/components/ui/button";
import { getAllCourses } from "@/hooks/api/dashboardApi";
import { PlusIcon } from "@/svg/SvgContainer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const Page = () => {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data: coursesTypeData, isLoading: coursesTypeLoading } =
    getAllCourses(page, perPage);

  const toggleRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === coursesTypeData?.data?.data?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(coursesTypeData?.data?.data?.map((_, i) => i));
    }
  };

  return (
    <div>
      <SectionTitle title={"Course Type"} />
      <div className="py-[10px] lg:py-[20px] rounded-[16px] flex flex-col gap-2.5">
        <div className="flex w-full items-center justify-between">
          {/* <div className="flex items-center gap-2 text-[#8C8C8C]">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 bg-transparent accent-[#8C8C8C]"
            />
            <label className="text-[12px]">Show Archived Courses</label>
          </div> */}
          <div className="flex gap-2.5">
            <Button
              onClick={() => router.push("add_course_type")}
              className="py-[11px] text-[12px] lg:text-base lg:py-[22px] cursor-pointer bg-brown flex items-center gap-2"
            >
              Add Course Type
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        {coursesTypeLoading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 text-black text-[14px] md:text-[16px] font-semibold">
                <tr>
                  <th className="px-3 py-3 md:px-6">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#8C8C8C]"
                      onChange={toggleAllRows}
                      checked={
                        selectedRows.length ===
                        coursesTypeData?.data?.data?.length
                      }
                    />
                  </th>
                  <th className="px-3 py-3 md:px-6 whitespace-nowrap">Name</th>
                  <th className="px-3 py-3 md:px-6 whitespace-nowrap">
                    Discipline
                  </th>
                  <th className="px-3 py-3 md:px-6 whitespace-nowrap">
                    Add-ons
                  </th>
                  <th className="px-3 py-3 md:px-6 whitespace-nowrap">Price</th>
                  <th className="px-3 py-3 md:px-6 whitespace-nowrap">Ship</th>
                  <th className="px-3 py-3 md:px-6 whitespace-nowrap">eCard</th>
                  <th className="px-3 py-3 md:px-6 text-center whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {coursesTypeData?.data?.data?.length > 0 ? (
                  coursesTypeData?.data?.data?.map((item, index) => (
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
                        {item.course_name}
                      </td>
                      <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                        {item.discipline}
                      </td>
                      <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                        {/* {item.addons.length > 0 ? item.addons?.product_code : "--"} */}
                      </td>
                      <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                        $ {item.shipping_price}
                      </td>
                      <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                        {item.eCard}
                      </td>
                      <td className="px-3 py-4 md:px-6 text-center whitespace-nowrap">
                        <Link href={`course_type/${item.id}`}>
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
            {coursesTypeData?.data?.links?.map((link, index) => (
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
    </div>
  );
};

export default Page;
