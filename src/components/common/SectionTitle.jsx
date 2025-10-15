import React from "react";

const SectionTitle = ({ className, title }) => {
  return (
    <div className={`text-black text-[24px] font-semibold leading-[32.5px]`}>
      {title}
    </div>
  );
};

export default SectionTitle;
