// "use client";

// import CustomSelect from "@/components/shared/form/CustomSelect";
// import { Check, Download, FileText, Plus } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useMemo } from "react";

// const dummyUsers = [
//   {
//     id: "1",
//     name: "Abdul-Majied, Aishah",
//     email: "nurse2jdmc@gmail.com",
//     active: true,
//     username: "Aishah Abdul-Majied",
//     trainingSite: { name: "AHA SHELL CPR, LLC", phone: "815-230-7991" },
//     isAdmin: false,
//     lastActivity: "09/17/2025",
//   },
//   {
//     id: "2",
//     name: "Almusa, Hamza",
//     email: "halmusa@gmail.com",
//     active: true,
//     username: "Hamza Almusa",
//     trainingSite: { name: "AHA SHELL CPR, LLC", phone: "815-230-7991" },
//     isAdmin: false,
//     lastActivity: "09/22/2025",
//   },
//   {
//     id: "3",
//     name: "Baker, James",
//     email: "bakej025@icloud.com",
//     active: false,
//     username: "bakej025@icloud.com",
//     trainingSite: { name: "Training Site 2", phone: "222-222-2222" },
//     isAdmin: false,
//     lastActivity: "07/17/2024",
//   },
//   {
//     id: "4",
//     name: "Blair 2024, James",
//     email: "blairj@mmpl-us.com",
//     active: true,
//     username: "James F. Blair",
//     trainingSite: { name: "Training Site 1", phone: "111-111-1111" },
//     isAdmin: false,
//     lastActivity: "09/02/2025",
//   },
//   {
//     id: "5",
//     name: "Bono, Jennifer",
//     email: "bono.j@rhodes.edu",
//     active: false,
//     username: "Jennifer Bone",
//     trainingSite: { name: "AHA SHELL CPR, LLC", phone: "815-230-7991" },
//     isAdmin: false,
//     lastActivity: "09/22/2025",
//   },
//   {
//     id: "6",
//     name: "Borja, Michael",
//     email: "mborja@jsd.gmail.com",
//     active: true,
//     username: "Michael Borja",
//     trainingSite: { name: "Training Site 2", phone: "222-222-2222" },
//     isAdmin: false,
//     lastActivity: "09/22/2025",
//   },
// ];

// const UserManager = () => {
//   const [trainingFilter, setTrainingFilter] = useState("all site");
//   const [showInactive, setShowInactive] = useState(false);
//   const [selectedShow, setSelectedShow] = useState(50);

//   const filteredUsers = useMemo(() => {
//     return dummyUsers.filter((user) => {
//       const matchTraining =
//         trainingFilter === "all site" ||
//         user.trainingSite.name.toLowerCase() === trainingFilter.toLowerCase();

//       const matchActive = showInactive ? true : user.active;

//       return matchTraining && matchActive;
//     });
//   }, [trainingFilter, showInactive]);

//   return (
//     <div className="w-full mx-auto p-6  bg-white rounded-lg shadow-lg">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex items-center gap-2.5">
//             <label className="block text-sm text-black font-semibold mb-1">
//               Training Site
//             </label>
//             <CustomSelect
//               id="training_site"
//               placeholder="Select Training Site"
//               options={[
//                 { value: "all site", label: "All Sites" },
//                 { value: "AHA SHELL CPR, LLC", label: "AHA SHELL CPR, LLC" },
//                 { value: "Training Site 1", label: "Training Site 1" },
//                 { value: "Training Site 2", label: "Training Site 2" },
//               ]}
//               onChange={(val) => setTrainingFilter(val || "all site")}
//               className="flex-1"
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <input
//               id="show-inactive"
//               type="checkbox"
//               checked={showInactive}
//               onChange={(e) => setShowInactive(e.target.checked)}
//               className="h-4 w-4 rounded border-gray-300 text-brown focus:ring-brown"
//             />
//             <label htmlFor="show-inactive" className="text-sm text-gray-600">
//               Show Inactive Users
//             </label>
//           </div>
//         </div>

//         {/* Right Side Buttons */}
//         <div className="flex items-center gap-3">
//           <button className="p-2.5 border border-brown rounded-md text-brown hover:bg-red-50 transition-colors cursor-pointer">
//             <Download size={20} />
//           </button>
//           <Link
//             href="users/add_user"
//             className="flex items-center gap-2 py-2.5 px-4 bg-brown text-white font-semibold rounded-md hover:bg-brown transition-colors cursor-pointer"
//           >
//             <Plus size={20} />
//             Add User
//           </Link>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
//                 Name
//               </th>
//               <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
//                 Active
//               </th>
//               <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
//                 Username
//               </th>
//               <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
//                 Training Site
//               </th>
//               <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
//                 Admin
//               </th>
//               <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
//                 Last Activity
//               </th>
//               <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredUsers.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-50">
//                 <td className="py-4 px-4 whitespace-nowrap">
//                   <div className="font-semibold text-sm text-gray-900">
//                     {user.name}
//                   </div>
//                   <div className="text-xs text-gray-500">{user.email}</div>
//                 </td>
//                 <td className="py-4 px-4 whitespace-nowrap">
//                   {user.active && (
//                     <Check size={20} className="text-green-600" />
//                   )}
//                 </td>
//                 <td className="py-4 px-4 text-sm text-gray-700">
//                   {user.username}
//                 </td>
//                 <td className="py-4 px-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     {user.trainingSite.name}
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     {user.trainingSite.phone}
//                   </div>
//                 </td>
//                 <td className="py-4 px-4 text-sm text-gray-700">
//                   {user.isAdmin ? "Yes" : "--"}
//                 </td>
//                 <td className="py-4 px-4 text-sm text-gray-700">
//                   {user.lastActivity}
//                 </td>
//                 <td className="py-4 px-4">
//                   <button className="text-gray-400 cursor-pointer hover:text-gray-600 p-1">
//                     <FileText size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={7}
//                   className="py-6 text-center text-gray-500 text-sm"
//                 >
//                   No users found for the selected filters.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Footer */}
//       <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-3">
//         <div className="flex items-center gap-2">
//           <span className="text-gray-600 text-sm">Show:</span>
//           <select
//             value={selectedShow}
//             onChange={(e) => setSelectedShow(e.target.value)}
//             className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none"
//           >
//             <option value="10">10</option>
//             <option value="25">25</option>
//             <option value="50">50</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <button className="px-3 py-1 text-sm text-gray-500 border rounded-md hover:bg-gray-100">
//             Previous
//           </button>
//           <button className="px-3 py-1 text-sm border border-blue-500 rounded-md text-blue-600">
//             1
//           </button>
//           <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
//             2
//           </button>
//           <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
//             3
//           </button>
//           <button className="px-3 py-1 text-sm text-gray-500 border rounded-md hover:bg-gray-100">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserManager;

"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import TableSkeleton from "@/components/common/TableSkelation";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { getAllInstructor } from "@/hooks/api/dashboardApi";
import { SearchIcon } from "@/svg/SvgContainer";
import { Check, FileText } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const Page = () => {
  const form = useForm();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [enableSearch, setEnableSearch] = useState(false);

  const { data: allInstructor, isLoading } = getAllInstructor(page, perPage);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col gap-[13.5px] lg:gap-[25px] ">
      <div className="flex justify-between">
        <SectionTitle title={"Users"} />
      </div>
      <FormContainer form={form} onSubmit={onSubmit}>
        {/* Search filters */}
        <div className="px-[16px] py-[16px] lg:px-[32px] lg:py-[32px] bg-white rounded-[16px]">
          <div className="flex flex-wrap lg:flex-nowrap gap-[10px] xl:gap-[24px]">
            <div className="flex-1 max-w-[400px]">
              <FormInput name="search" className={'w-full'}/>
            </div>
            <div className="flex items-end gap-3">
              <Button
                type="submit"
                className="py-[12px] lg:py-[24px] text-[13px] lg:text-base cursor-pointer bg-brown flex items-center gap-2"
              >
                <SearchIcon />
                Search
              </Button>

              {enableSearch && (
                <button
                  type="button"
                  // onClick={handleClearSearch}
                  className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                >
                  <IoClose size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </FormContainer>

      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <div className="flex items-center justify-between">
          <SubSectionTitle subtitle="All list" />
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                      Active
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                      Username
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                      Training Site
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                      Admin
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                      Last Activity
                    </th>
                    <th className="py-3 px-4 text-xs font-bold uppercase text-gray-500 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading || allInstructor?.data?.data?.length > 0 ? (
                    allInstructor?.data?.data?.map((user, index) => (
                      <tr key={user?.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="font-semibold text-sm text-gray-900">
                            {user?.first_name} {user?.last_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user?.email}
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {user?.active && (
                            <Check size={20} className="text-green-600" />
                          )}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">
                          {user?.username}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user?.trainingSite?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user?.trainingSite?.phone}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">
                          {user?.roles?.find((item) => item?.name === "Admin")
                            ? "TS"
                            : "--"}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">
                          {user?.lastActivity}
                        </td>
                        <td className="px-3 sm:px-6 py-3 text-center">
                          <div>
                            <Link
                              href={`../instructors/instructor_records/${user?.id}`}
                              className="p-1.5 sm:p-2 bg-gray-100 rounded-lg inline-block hover:bg-gray-200 transition"
                            >
                              <FileText className="text-gray-600 size-4" />
                            </Link>
                          </div>
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
          </>
        )}

        {/* Footer controls */}
        <div className="flex flex-col md:flex-row items-center justify-end mt-3 lg:mt-6 gap-3">
          {/* Pagination */}
          <div className="flex items-center gap-2">
            {allInstructor?.data?.links?.map((link, index) => (
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
