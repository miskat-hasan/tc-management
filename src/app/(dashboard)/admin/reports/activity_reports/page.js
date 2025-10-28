"use client";

import React from "react";
import { Search, ChevronDown, Download } from "lucide-react";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { SearchIcon } from "@/svg/SvgContainer";
import { Button } from "@/components/ui/button";

const ReportCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg   overflow-hidden">
      {/* Card Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Download size={20} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4">{children}</div>
    </div>
  );
};

const DataRow = ({ label, value1, value2 }) => (
  <div
    className={`grid ${
      value2 !== undefined ? "grid-cols-3" : "grid-cols-2"
    } gap-4 py-3 border-b border-gray-100 last:border-b-0`}
  >
    <span className="text-sm text-gray-700">{label}</span>
    <span className="text-sm text-gray-900 text-right">{value1}</span>
    {value2 !== undefined && (
      <span className="text-sm text-gray-900 text-right">{value2}</span>
    )}
  </div>
);

const instructorData = [
  { discipline: "ACLS", instructors: 1 },
  { discipline: "BLS", instructors: 26 },
  { discipline: "Heart saver", instructors: 1 },
  { discipline: "Other", instructors: 2 },
];

const courseData = [
  {
    name: "Babysitter's Training with Pediatric First Aid/CPR(AED)",
    classes: 1,
    students: 0,
  },
  {
    name: "(AHA) American Heart Association - Heartsaver First Aid CPR AED Certification Course",
    classes: 3,
    students: 0,
  },
  { name: "(AHA) Basic Life Support Provider Course", classes: 2, students: 0 },
  {
    name: "(AHA) Basic Life Support Provider Renewal Course",
    classes: 2,
    students: 3,
  },
  {
    name: "(American Heart Association) AHA Basic Life Support (BLS) Full In-Person Course",
    classes: 23,
    students: 1,
  },
];

const disciplineData = [
  { discipline: "ACLS", classes: 4, students: 4 },
  { discipline: "BLS", classes: 146, students: 38 },
  { discipline: "Heart saver", classes: 55, students: 10 },
  { discipline: "Other", classes: 40, students: 52 },
  { discipline: "Redcross", classes: 52, students: 45 },
];

export default function ActivityReportPage() {
  const grandTotal = courseData.reduce(
    (acc, item) => {
      acc.classes += item.classes;
      acc.students += item.students;
      return acc;
    },
    { classes: 0, students: 0 }
  );

  return (
    <main className="min-h-screen space-y-5 ">
      <h1 className="text-3xl font-bold text-gray-900">Activity Report</h1>
      <div className="px-[32px] py-[32px] bg-white rounded-[16px] flex gap-[24px]">
        <CustomSelect
          id="dates"
          label="Dates"
          placeholder="All dates"
          options={[
            { value: "today", label: "Today" },
            { value: "yesterday", label: "Yesterday" },
            { value: "last7days", label: "Last 7 days" },
          ]}
          // onChange={(val) => handleSelectChange("date", val)}
          className="flex-1"
        />
        <CustomSelect
          id="All Site"
          label="All Site"
          placeholder="All Site"
          options={[
            { value: "ACLS", label: "ACLS" },
            {
              value: "BLS",
              label: "BLS",
            },
          ]}
          // onChange={(val) => handleSelectChange("course", val)}
          className="flex-1"
        />

        <div className="flex justify-end items-end">
          <Button
            // onClick={handleSearch}
            className="py-[24px] cursor-pointer bg-brown flex items-center gap-2"
          >
            <SearchIcon />
            Search
          </Button>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="space-y-6">
        {/* Card 1: Instructor by Discipline */}
        <ReportCard title="Instructor by Discipline">
          {/* Headings */}
          <div className="grid grid-cols-2 gap-4 pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-500">
              Discipline
            </span>
            <span className="text-sm font-semibold text-gray-500 text-right">
              Instructors
            </span>
          </div>
          {/* Rows */}
          <div className="mt-2">
            {instructorData.map((item) => (
              <DataRow
                key={item.discipline}
                label={item.discipline}
                value1={item.instructors}
              />
            ))}
          </div>
        </ReportCard>

        {/* Card 2: Classes and Students */}
        <ReportCard title="Classes and Students">
          {/* Headings */}
          <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-500 col-span-1">
              Course Type
            </span>
            <span className="text-sm font-semibold text-gray-500 text-right">
              Classes
            </span>
            <span className="text-sm font-semibold text-gray-500 text-right">
              Students
            </span>
          </div>
          {/* Rows */}
          <div className="mt-2">
            {courseData.map((item) => (
              <DataRow
                key={item.name}
                label={item.name}
                value1={item.classes}
                value2={item.students}
              />
            ))}
          </div>
          {/* Footer */}
          <div className="grid grid-cols-3 gap-4 pt-3 mt-3 border-t border-gray-200">
            <span className="text-sm font-bold text-gray-900">Grand Total</span>
            <span className="text-sm font-bold text-gray-900 text-right">
              {grandTotal.classes}
            </span>
            <span className="text-sm font-bold text-gray-900 text-right">
              {grandTotal.students}
            </span>
          </div>
        </ReportCard>

        {/* Card 3: Classes and Students by Discipline */}
        <ReportCard title="Classes and Students by Discipline">
          {/* Headings */}
          <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-500">
              Discipline
            </span>
            <span className="text-sm font-semibold text-gray-500 text-right">
              Classes
            </span>
            <span className="text-sm font-semibold text-gray-500 text-right">
              Students
            </span>
          </div>
          {/* Rows */}
          <div className="mt-2">
            {disciplineData.map((item) => (
              <DataRow
                key={item.discipline}
                label={item.discipline}
                value1={item.classes}
                value2={item.students}
              />
            ))}
          </div>
        </ReportCard>
      </div>
    </main>
  );
}
