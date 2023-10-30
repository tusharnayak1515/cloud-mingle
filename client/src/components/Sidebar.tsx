"use client";

import Link from "next/link";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { MdGridView, MdOutlineShareLocation, MdNotifications } from "react-icons/md";
import { RiUserShared2Line } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div
      className={`h-full col-span-2 p-4 text-dark-primary flex flex-col justify-start items-start gap-4 bg-dark-primary`}
    >
      <div
        className={`w-full flex justify-start items-center cursor-pointer gap-2`}
      >
        <MdOutlineShareLocation className={`text-2xl`} />
        <p className={`text-lg font-bold`}>CloudMingle</p>
      </div>

      <div
        className={`w-full py-2 flex flex-col justify-start items-start border-t border-dark-primary`}
      >
        <Link
          href={`/`}
          className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer hover:bg-dark-hover bg-transparent`}
        >
          <MdGridView className={`text-xl`} />
          <p>Dashboard</p>
        </Link>

        <Link
          href={`/starred`}
          className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer hover:bg-dark-hover bg-transparent`}
        >
          <AiOutlineStar className={`text-xl`} />
          <p>Starred</p>
        </Link>

        <Link
          href={`/shared`}
          className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer hover:bg-dark-hover bg-transparent`}
        >
          <RiUserShared2Line className={`text-xl`} />
          <p>Shared</p>
        </Link>

        <Link
          href={`/invites`}
          className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer hover:bg-dark-hover bg-transparent`}
        >
          <MdNotifications className={`text-xl`} />
          <p>Invites</p>
        </Link>
      </div>
      
      <p className={`px-3 text-[14px] font-semibold`}>© 2023 CloudMingle</p>
    </div>
  );
};

export default Sidebar;
