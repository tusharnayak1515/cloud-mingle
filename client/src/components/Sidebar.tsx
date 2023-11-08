"use client";

import Link from "next/link";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import {
  MdGridView,
  MdOutlineShareLocation,
  MdNotifications,
} from "react-icons/md";
import { RiUserShared2Line } from "react-icons/ri";
import { shallowEqual, useSelector } from "react-redux";

const Sidebar = () => {
  const { theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );
  return (
    <div
      className={`h-full md_link:col-span-3 xl:col-span-2 p-4 
      ${theme === "dark" ? "text-dark-primary" : "text-dark-secondary"} 
      hidden md_link:flex flex-col justify-start items-start gap-4 
      ${theme === "dark" ? "bg-dark-primary" : "bg-slate-400"}`}
    >
      <div
        className={`w-full flex justify-start items-center cursor-pointer gap-2`}
      >
        <MdOutlineShareLocation className={`text-2xl`} />
        <p className={`text-lg font-bold`}>CloudMingle</p>
      </div>

      <div
        className={`w-full py-2 flex flex-col justify-start items-start border-t ${
          theme === "dark" ? "border-dark-primary" : "border-dark-secondary"
        }`}
      >
        <Link
          href={`/`}
          className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer 
          ${
            theme === "dark"
              ? "hover:bg-dark-hover"
              : "hover:bg-dark-primary-btn"
          } 
          bg-transparent transition-all duration-300`}
        >
          <MdGridView className={`text-xl`} />
          <p>Dashboard</p>
        </Link>

        <Link
          href={`/starred`}
          className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer 
          ${
            theme === "dark"
              ? "hover:bg-dark-hover"
              : "hover:bg-dark-primary-btn"
          } 
          bg-transparent transition-all duration-300`}
        >
          <AiOutlineStar className={`text-xl`} />
          <p>Starred</p>
        </Link>

        <Link
          href={`/shared`}
          className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer 
          ${
            theme === "dark"
              ? "hover:bg-dark-hover"
              : "hover:bg-dark-primary-btn"
          } 
          bg-transparent transition-all duration-300`}
        >
          <RiUserShared2Line className={`text-xl`} />
          <p>Shared</p>
        </Link>

        <Link
          href={`/invites`}
          className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer 
          ${
            theme === "dark"
              ? "hover:bg-dark-hover"
              : "hover:bg-dark-primary-btn"
          } 
          bg-transparent transition-all duration-300`}
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
