import React from "react";
import Image from "next/image";
import { Link } from "lucide-react";
import ProfileComponentContainer from "@/components/ProfileComponentContainer";
import { Icons } from "@/components/Icons";

const MyProfile = () => {
  return (
    <div className=" flex flex-col  md:mx-[90px] md:mt-[120px]">
      <div className=" text-bttf text-[32px] text-white">My Profile</div>
      <ProfileComponentContainer style="md:mt-[40px] md:mb-[30px] flex flex-col items-center justify-center">
        <Image
          src={"/avatar.png"}
          alt="account avatar"
          width={50}
          height={50}
          className="border-3 w-auto rounded-full border-black object-cover p-0 opacity-80 shadow-sm hover:border-amber-400 md:h-[210px]"
        />
        <p className="  mb-[5px] mt-[25px] font-bold md:text-[32px]">
          John Smith
        </p>
        <p className=" flex items-center gap-x-2 text-sm">
          Share
          <Link size={16} />
        </p>
      </ProfileComponentContainer>
      <ProfileComponentContainer style="font-bold flex flex-col gap-y-[44px]">
        <div className=" text-[32px]">Stats</div>

        <div className=" flex flex-col gap-y-[25px] font-medium md:text-[20px]">
          <div className=" flex items-center justify-between">
            <div className=" flex items-center gap-x-[25px]">
              <Icons.progress className=" h-[30px] w-[30px]" /> In Progress
            </div>
            <p>0</p>
          </div>
          <div className=" flex items-center justify-between">
            <div className=" flex items-center gap-x-[25px]">
              <Icons.completed className=" h-[30px] w-[30px]" /> Completed
            </div>
            <p>0</p>
          </div>
          <div className=" flex items-center justify-between">
            <div className=" flex items-center gap-x-[25px]">
              <Icons.nftminted className=" h-[30px] w-[30px]" /> NFTs Minted
            </div>
            <p>0</p>
          </div>
        </div>
      </ProfileComponentContainer>
    </div>
  );
};

export default MyProfile;
