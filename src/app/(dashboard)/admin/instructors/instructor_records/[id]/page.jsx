"use client";
import AddEditInstructor from "@/components/dashboard/Instructors/AddEditInstructor";
import { getSingleInstructor } from "@/hooks/api/dashboardApi";

const page = ({ params }) => {
  const { id } = params;
  const { data, isLoading } = getSingleInstructor(id);
  return (
    <div>
      {isLoading ? (
        "Loading Data ..."
      ) : (
        <AddEditInstructor type={"edit"} instructorData={data?.data} />
      )}
    </div>
  );
};

export default page;
