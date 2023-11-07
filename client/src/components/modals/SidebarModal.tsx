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

const SidebarModal = ({ setShowSidebar }: any) => {
  return ReactDom.createPortal(
    <div className={`h-full w-full md_link:hidden`}>
      <Modal>
        <div className={`h-full w-full flex justify-start items-start`}>
          <div
            className={`relative h-full w-[250px] p-4 text-dark-primary 
            flex flex-col justify-start items-start gap-4 
            bg-dark-primary`}
          >
            <IoClose
              className={`absolute top-[10px] left-[260px] text-4xl text-dark-primary cursor-pointer`}
              onClick={() => setShowSidebar(false)}
            />

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
                onClick={() => setShowSidebar(false)}
              >
                <MdGridView className={`text-xl`} />
                <p>Dashboard</p>
              </Link>

              <Link
                href={`/starred`}
                className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer hover:bg-dark-hover bg-transparent`}
                onClick={() => setShowSidebar(false)}
              >
                <AiOutlineStar className={`text-xl`} />
                <p>Starred</p>
              </Link>

              <Link
                href={`/shared`}
                className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer hover:bg-dark-hover bg-transparent`}
                onClick={() => setShowSidebar(false)}
              >
                <RiUserShared2Line className={`text-xl`} />
                <p>Shared</p>
              </Link>

              <Link
                href={`/invites`}
                className={`w-full p-3 
          flex justify-start items-center gap-2 rounded-md 
          cursor-pointer hover:bg-dark-hover bg-transparent`}
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
