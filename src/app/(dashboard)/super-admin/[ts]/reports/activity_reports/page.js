"use client";

import React from "react";
import { Search, ChevronDown, Download, Loader2 } from "lucide-react";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { SearchIcon } from "@/svg/SvgContainer";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/common/SectionTitle";
import {
  useExportClassByStudentPDF,
  useExportInstructorByDisciplinePDF,
  useExportStudentDiscipline,
  useGetClassAndStudentByDiscipline,
  useGetClassAndStudentReport,
  useGetInstructorByDiscipline,
} from "@/hooks/api/dashboardApi";

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
    { classes: 0, students: 0 },
  );

  // get Instructor by discipline
  const {
    data: instructorByDisciplineData,
    isLoading: instructorByDisciplineDataLoading,
  } = useGetInstructorByDiscipline();
  const {
    data: classAndStudentReport,
    isLoading: classAndStudentReportLoading,
  } = useGetClassAndStudentReport();

  console.log(classAndStudentReport?.data);

  const {
    data: classAndStudentByDiscipline,
    isLoading: classAndStudentByDisciplineLoading,
  } = useGetClassAndStudentByDiscipline();

  // Instructor By Discipline PDF
  const {
    mutate: instructorByDisciplinePDFMutation,
    isPending: instructorByDisciplinePDFPending,
  } = useExportInstructorByDisciplinePDF();

  const handleInstructorByDisciplineExcel = (slug) => {
    instructorByDisciplinePDFMutation(slug, {
      onSuccess: (blob) => {
        // Create Excel file instead of PDF
        const file = new Blob([blob], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(file);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "instructors-by-discipline.xlsx");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
      },
    });
  };
  
  // download Class by student
  const {
    mutate: classByStudentPDFDownloadMutation,
    isPending: classByStudentPDFDownloadPending,
  } = useExportClassByStudentPDF();

  const handleClassByStudentPDF = (slug) => {
    classByStudentPDFDownloadMutation(slug, {
      onSuccess: (blob) => {
        const file = new Blob([blob], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(file);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "class-by-student.xlsx");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
      },
    });
  };

  // download Class by student
  const {
    mutate: exportStudentDisciplineMutation,
    isPending: exportStudentDisciplinePending,
  } = useExportStudentDiscipline();

  const handleExportStudentDiscipline = (slug) => {
    exportStudentDisciplineMutation(slug, {
      onSuccess: (blob) => {
        const file = new Blob([blob], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(file);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "discipline-by-student.xlsx");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
      },
    });
  };

  return (
    <main className="min-h-screen space-y-2.5 lg:space-y-5 ">
      <SectionTitle title={"Activity Report"} />
      {/* <div className="px-[16px] py-[16px] lg:px-[32px] lg:py-[32px] bg-white rounded-[16px] flex flex-wrap lg:flex-nowrap gap-[10px] xl:gap-[24px]">
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
            className="py-[12px] lg:py-[24px] text-[13px] lg:text-base  cursor-pointer bg-brown flex items-center gap-2"
          >
            <SearchIcon />
            Search
          </Button>
        </div>
      </div> */}

      {/* Report Cards Grid */}
      <div className="space-y-3 lg:space-y-6">
        {/* Card 1: Instructor by Discipline */}
        <div className="bg-white rounded-lg   overflow-hidden">
          {/* Card Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Instructor by Discipline
            </h2>
            <button
              onClick={() =>
                handleInstructorByDisciplineExcel("instructor-by-discipline")
              }
              disabled={instructorByDisciplinePDFPending}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer disabled:opacity-50"
            >
              {instructorByDisciplinePDFPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Download size={20} />
              )}
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4">
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
              {instructorByDisciplineData?.data?.disciplines?.map(
                (item, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-2 gap-4 py-3 border-b border-gray-100 last:border-b-0`}
                  >
                    <span className="text-sm text-gray-700">{item?.name}</span>
                    <span className="text-sm text-gray-900 text-right">
                      {item?.instructors}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Classes and Students */}
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Card Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Classes and Students
            </h2>
            <button
              onClick={() => handleClassByStudentPDF("Class-by-student")}
              disabled={classByStudentPDFDownloadPending}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer disabled:opacity-50"
            >
              {classByStudentPDFDownloadPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Download size={20} />
              )}
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4">
            {/* Headings */}
            <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-500 col-span-1">
                Course Type
              </span>
              <span className="text-sm font-semibold text-gray-500 text-center">
                Classes
              </span>
              <span className="text-sm font-semibold text-gray-500 text-right">
                Students
              </span>
            </div>
            {/* Rows */}
            <div className="mt-2">
              {classAndStudentReport?.data?.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0`}
                >
                  <span className="text-sm text-gray-700">
                    {item?.course_type}
                  </span>
                  <span className="text-sm text-gray-900 text-center">
                    {item?.classes}
                  </span>
                  <span className="text-sm text-gray-900 text-right">
                    {item?.students}
                  </span>
                </div>
              ))}
            </div>
            {/* Footer */}
            {/* <div className="grid grid-cols-3 gap-4 pt-3 mt-3 border-t border-gray-200">
            <span className="text-sm font-bold text-gray-900">Grand Total</span>
            <span className="text-sm font-bold text-gray-900 text-right">
              {grandTotal.classes}
            </span>
            <span className="text-sm font-bold text-gray-900 text-right">
              {grandTotal.students}
            </span>
          </div> */}
          </div>
        </div>

        {/* Card 3: Classes and Students by Discipline */}
        <div className="bg-white rounded-lg   overflow-hidden">
          {/* Card Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Classes and Students by Discipline
            </h2>
            <button
              onClick={() => handleExportStudentDiscipline("student-by-discipline")}
              disabled={exportStudentDisciplinePending}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer disabled:opacity-50"
            >
              {exportStudentDisciplinePending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Download size={20} />
              )}
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4">
            {/* Headings */}
            <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-500">
                Discipline
              </span>
              <span className="text-sm font-semibold text-gray-500 text-center">
                Classes
              </span>
              <span className="text-sm font-semibold text-gray-500 text-right">
                Students
              </span>
            </div>
            {/* Rows */}
            <div className="mt-2">
              {classAndStudentByDiscipline?.data?.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0`}
                >
                  <span className="text-sm text-gray-700">
                    {item?.discipline}
                  </span>
                  <span className="text-sm text-gray-900 text-center">
                    {item?.classes}
                  </span>
                  <span className="text-sm text-gray-900 text-right">
                    {item?.students}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
