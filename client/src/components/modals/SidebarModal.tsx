"use client";

import React, { Fragment } from "react";
import ReactDom from "react-dom";
import Modal from "./Modal";

import { IoClose } from "react-icons/io5";
import {
  MdGridView,
  MdNotifications,
  MdOutlineShareLocation,
} from "react-icons/md";
import Link from "next/link";
import { AiOutlineStar } from "react-icons/ai";
import { RiUserShared2Line } from "react-icons/ri";
import { shallowEqual, useSelector } from "react-redux";

const SidebarModal = ({ showSidebar, setShowSidebar }: any) => {
  const { theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );
  return ReactDom.createPortal(
    <div className={`h-full w-full md_link:hidden`}>
      <Modal
        className={`fixed ${
          showSidebar ? "inset-0" : "left-[-10000px]"
        } z-[500] bg-[#00000091] transition-all duration-300`}
      >
        <div className={`h-full w-full flex justify-start items-start`}>
          <div
            className={`relative h-full w-[250px] p-4 ${
              theme === "dark"
                ? "text-dark-primary bg-dark-primary"
                : "text-dark-secondary bg-slate-400"
            } 
            flex flex-col justify-start items-start gap-4`}
          >
            <IoClose
              className={`absolute top-[10px] left-[260px] text-4xl ${
                theme === "dark" ? "text-dark-primary" : "text-slate-300"
              } cursor-pointer`}
              onClick={() => setShowSidebar(false)}
            />

            <div
              className={`w-full flex justify-start items-center cursor-pointer gap-2`}
            >
              <MdOutlineShareLocation className={`text-2xl`} />
              <p className={`text-lg font-bold`}>CloudMingle</p>
            </div>

            <div
              className={`w-full py-2 flex flex-col justify-start items-start border-t ${
                theme === "dark"
                  ? "border-dark-primary"
                  : "border-dark-secondary"
              }`}
            >
              <Link
                href={`/`}
                className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer ${theme === "dark" ? 'hover:bg-dark-hover' : 'hover:bg-dark-primary-btn'} bg-transparent`}
                onClick={() => setShowSidebar(false)}
              >
                <MdGridView className={`text-xl`} />
                <p>Dashboard</p>
              </Link>

              <Link
                href={`/starred`}
                className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer ${theme === "dark" ? 'hover:bg-dark-hover' : 'hover:bg-dark-primary-btn'} bg-transparent`}
                onClick={() => setShowSidebar(false)}
              >
                <AiOutlineStar className={`text-xl`} />
                <p>Starred</p>
              </Link>

              <Link
                href={`/shared`}
                className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer ${theme === "dark" ? 'hover:bg-dark-hover' : 'hover:bg-dark-primary-btn'} bg-transparent`}
                onClick={() => setShowSidebar(false)}
              >
                <RiUserShared2Line className={`text-xl`} />
                <p>Shared</p>
              </Link>

              <Link
                href={`/invites`}
                className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer ${theme === "dark" ? 'hover:bg-dark-hover' : 'hover:bg-dark-primary-btn'} bg-transparent`}
                onClick={() => setShowSidebar(false)}
              >
                <MdNotifications className={`text-xl`} />
                <p>Invites</p>
              </Link>
            </div>

            <p className={`px-3 text-[14px] font-semibold`}>
              © 2023 CloudMingle
            </p>
          </div>

          <div
            className={`h-full w-[calc(100%-250px)]`}
            onClick={() => setShowSidebar(false)}
          ></div>
        </div>
      </Modal>
    </div>,
    document.getElementById("modal")!
  );
};

export default SidebarModal;
