import SectionTitle from "@/components/common/SectionTitle";
import NotFound from "@/components/shared/NotFound";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      <SectionTitle title={"Service Due Report"} />
      <div className="px-[12px] py-[12px] lg:px-[24px] lg:py-[24px] bg-white rounded-[16px] flex  w-full">
        <NotFound />
      </div>
    </div>
  );
};

export default page;
