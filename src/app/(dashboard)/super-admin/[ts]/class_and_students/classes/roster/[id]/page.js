"use client";

import SubSectionTitle from "@/components/common/SubSectionTitle";
import TableSkeleton from "@/components/common/TableSkelation";
import { Button } from "@/components/ui/button";
import { useGetStudentByClassId } from "@/hooks/api/dashboardApi";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";

const Page = ({ params }) => {
  const { id } = params;

  // get student data
  const { data: studentData, isLoading: studentDataLoading } =
    useGetStudentByClassId(id);

  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        {/* <SectionTitle title={"Classes"} /> */}
      </div>

      {/* Table */}
      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <div className="flex sm:justify-end flex-wrap gap-2">
          <Button className="h-8 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown cursor hover:bg-brown-hover focus:outline-none">
            Add Student
          </Button>
          <Button className="h-8 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown cursor hover:bg-brown-hover focus:outline-none">
            Edit Scores
          </Button>
          <Button className="h-8 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown cursor hover:bg-brown-hover focus:outline-none">
            View Roster
          </Button>
          <Button className="h-8 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown cursor hover:bg-brown-hover focus:outline-none">
            Student List
          </Button>
        </div>
        <SubSectionTitle subtitle="Student Lists" />
        {studentDataLoading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full  text-sm sm:text-base text-left text-gray-700 min-w-[800px]">
              <thead className="bg-gray-50 text-black capitalize text-[16px] sm:text-[18px] font-semibold">
                <tr>
                  <th className="px-3 sm:px-6 py-3">Student</th>
                  <th className="px-3 sm:px-6 py-3">Status</th>
                  <th className="px-3 sm:px-6 py-3">Codes</th>
                  <th className="px-3 sm:px-6 py-3">Phone</th>
                  <th className="px-3 sm:px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentData?.data?.students?.length > 0 ? (
                  studentData?.data?.students?.map((item) => (
                    <tr
                      key={item?.id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                        {item?.first_name} {item?.last_name}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-gray-800 whitespace-nowrap">
                        {item?.course?.course_name}
                      </td>

                      <td className="px-3 sm:px-6 py-3 truncate max-w-[160px] sm:max-w-[220px]">
                        {item?.code}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-gray-600">
                        {item?.student}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-center space-x-2">
                        <Link href={`classes/${item.id}`}>
                          <button className="p-1.5 sm:p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                            <CiEdit className="text-gray-600 text-[14px] sm:text-[16px]" />
                          </button>
                        </Link>
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
        )}
      </div>
    </div>
  );
};

export default Page;
