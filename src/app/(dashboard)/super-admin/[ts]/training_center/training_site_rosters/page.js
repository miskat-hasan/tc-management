"use client";
import SectionTitle from "@/components/common/SectionTitle";
import TableSkeleton from "@/components/common/TableSkelation";
import { useGetAllRosters } from "@/hooks/api/dashboardApi";

const Page = () => {
  const { data, isLoading } = useGetAllRosters();

  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      <SectionTitle title={"Training Site Rosters"} />

      {/* Table */}
      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-sm sm:text-base text-left text-gray-700">
              <thead className="bg-gray-50 text-black capitalize text-[14px] sm:text-[20px] font-semibold">
                <tr>
                  <th className="px-3 sm:px-6 py-3 w-[40px]">Finalized</th>
                  <th className="px-3 sm:px-6 py-3">Training Site</th>
                  <th className="px-3 sm:px-6 py-3">Class</th>
                  <th className="px-3 sm:px-6 py-3">Instructor</th>
                  <th className="px-3 sm:px-6 py-3 text-center">Student</th>
                  {/* <th className="px-3 sm:px-6 py-3 text-center">Action</th> */}
                </tr>
              </thead>

              <tbody>
                {data?.data?.length > 0 ? (
                  data?.data?.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="px-3 sm:px-6 py-3 text-gray-800 whitespace-nowrap">
                        {/* {item?.} */}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-gray-800">
                        {item.training_site?.training_center_name}
                      </td>
                      <td className="px-3 sm:px-6 py-3">
                        {/* {item?.instructor?.first_name} */}
                      </td>
                      <td className="px-3 sm:px-6 py-3">
                        {item?.instructor?.first_name}{" "}
                        {item?.instructor?.last_name}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-gray-600 whitespace-nowrap text-center">
                        0/{item.max_student}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-3 sm:py-6 text-gray-500 italic"
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
