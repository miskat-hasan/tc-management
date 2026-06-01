import React from "react";

const SubSectionTitle = ({ subtitle, className }) => {
  return (
    <div
      className={`text-black dark:text-gray text-[16px] font-semibold leading-[20.8px] ${className}`}
    >
      {subtitle}
    </div>
  );
};

export default SubSectionTitle;
