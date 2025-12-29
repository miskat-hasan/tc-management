import TrainingSiteEdit from "@/components/dashboard/trainingsite/TrainingSiteEdit";
import React from "react";

const page = async ({ params }) => {
  const { ts } = await params;

  return (
    <div>
      <TrainingSiteEdit slug={ts} />
    </div>
  );
};

export default page;
