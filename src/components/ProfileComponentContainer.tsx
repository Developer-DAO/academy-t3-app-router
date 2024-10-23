import React from "react";

const ProfileComponentContainer = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: string;
}) => {
  return (
    <div
      className={`${style}  rounded-[40px] bg-[#1C1C1C] text-white md:h-[350px] md:w-[370px] md:px-[50px] md:pb-[31px] md:pt-[40px]`}
    >
      {children}
    </div>
  );
};

export default ProfileComponentContainer;
