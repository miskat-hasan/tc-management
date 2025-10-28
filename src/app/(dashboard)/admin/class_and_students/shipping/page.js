import SectionTitle from "@/components/common/SectionTitle";
import NotFound from "@/components/shared/NotFound";
import React from "react";

const page = () => {
  return (
    <section className="w-full flex flex-col gap-[12.5px] lg:gap-[25px]">
      <SectionTitle title={"Shipping"} />
      <div className="px-[16px] py-[16px] lg:px-[32px] lg:py-[32px] bg-white rounded-[16px] flex gap-[12px] lg:gap-[24px] w-full">
        <NotFound title={"No item require shipping at this time"} />
      </div>
    </section>
  );
};

export default page;
