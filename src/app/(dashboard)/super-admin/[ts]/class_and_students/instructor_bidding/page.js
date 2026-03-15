import SectionTitle from "@/components/common/SectionTitle";
import NotFound from "@/components/shared/NotFound";

import React from "react";

const page = () => {
  return (
    <section className="w-full flex flex-col gap-[12.5px] lg:gap-[25px]">
      <SectionTitle title={"Instructor Bidding"} />

      <div className="px-[12px] lg:px-[24px] py-[12px] lg:py-[24px] bg-white rounded-[16px] flex gap-[24px] w-full">
        <NotFound title={"No classes are current open for bidding"} />
      </div>
    </section>
  );
};

export default page;
