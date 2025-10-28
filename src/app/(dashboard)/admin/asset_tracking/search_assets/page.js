"use client";
import SectionTitle from "@/components/common/SectionTitle";
import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/button";
import { assestsInstallation } from "@/data/data";
import { SearchIcon } from "@/svg/SvgContainer";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import CustomSelect from "@/components/shared/form/CustomSelect";

const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);

  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Asset Search"} />
      </div>
      <div className="lg:px-[26px] px-[13px] py-[13px] lg:py-[32px] bg-white rounded-[16px] flex flex-col gap-1 lg:gap-2.5 ">
        <div className="flex w-full justify-between">
          <SectionTitle
            className={"!text-[16px] lg:!text-[20px]"}
            title={"Search for"}
          />
        </div>
        <div className="flex justify-center items-center gap-1 lg:gap-2.5">
          <CustomSelect
            id="name"
            placeholder="All Name"
            options={[
              { value: "course_syllabus", label: "Course Syllabus (PDF)" },
              {
                value: "training_video_cpr",
                label: "Training Video: CPR Steps",
              },
              { value: "anatomy_diagrams", label: "Anatomy Diagrams (ZIP)" },
              {
                value: "pharma_quiz",
                label: "Practice Quiz – Pharmacology Basics",
              },
              {
                value: "reference_guide",
                label: "Medical Imaging Reference Guide",
              },
              { value: "case_study", label: "Emergency Medicine Case Studies" },
            ]}
            // onChange={(val) => handleSelectChange("course", val)}
            className="flex-1"
          />
          <Button className="py-[11px] lg:py-[22px] cursor-pointer bg-brown flex items-center gap-2">
            <SearchIcon />
            Search
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <div className="overflow-x-auto">
          <table className="min-w-[500px] w-full text-sm sm:text-base text-left text-gray-700">
            <thead className="bg-gray-50 text-black capitalize text-[14px] sm:text-[20px] font-semibold">
              <tr>
                <th className="px-3 sm:px-6 py-3">Name</th>
                <th className="px-3 sm:px-6 py-3">Contact</th>
                <th className="px-3 sm:px-6 py-3">Email</th>
                <th className="px-3 sm:px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {assestsInstallation.length > 0 ? (
                assestsInstallation.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-3 sm:px-6 py-3 text-gray-800 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                      {item.contact}
                    </td>
                    <td className="px-3 sm:px-6 py-3 truncate max-w-[150px] sm:max-w-[200px]">
                      {item.email}
                    </td>
                    <td className="px-3 sm:px-6 py-3 text-center">
                      <button className="p-1.5 sm:p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        <CiEdit className="text-gray-600 text-[14px] sm:text-[16px]" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-3 lg:py-6 text-gray-500 italic"
                  >
                    <NotFound title={"No Record Found"} />
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
