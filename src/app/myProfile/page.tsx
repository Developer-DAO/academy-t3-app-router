import React from "react";
import Image from "next/image";
import { Link, Link2 } from "lucide-react";

const MyProfile = () => {
  return (
    <div className=" flex flex-col md:mx-[90px] md:mt-[120px]">
      <div className=" text-bttf text-[32px] text-white md:mb-[40px]">
        My Profile
      </div>

      <div className=" flex flex-col items-center justify-center rounded-[40px] bg-[#1C1C1C] text-white md:h-[400px] md:w-[400px] md:px-[80px] md:pb-[31px] md:pt-[50px]">
        <Image
          src={"/avatar.png"}
          alt="account avatar"
          width={50}
          height={50}
          className="border-3 w-auto rounded-full border-black object-cover p-0 opacity-80 shadow-sm hover:border-amber-400 md:h-[216px]"
        />
        <p className="  mb-[15px] mt-[30px] font-medium md:text-[32px]">
          John Smith
        </p>
        <p className=" flex items-center gap-x-2 text-sm">
          Share
          <Link size={16} />
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
