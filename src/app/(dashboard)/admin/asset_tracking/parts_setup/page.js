"use client";
import SectionTitle from "@/components/common/SectionTitle";
import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/svg/SvgContainer";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const handleNavigation = () => {
    router.push("/admin/asset_tracking/add_part");
  };
  return (
    <div className="flex flex-col gap-[25px]">
      <div className="flex justify-between items-center">
        <SectionTitle title={"Parts List"} />
        <Button
          onClick={handleNavigation}
          className="py-[22px] cursor-pointer bg-brown flex items-center gap-2"
        >
          Add Part <PlusIcon />
        </Button>
      </div>

      <div className="px-[24px] py-[24px] bg-white rounded-[16px] flex gap-[24px] w-full">
        <NotFound />
      </div>
    </div>
  );
};

export default page;
