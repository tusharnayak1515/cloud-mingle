"use client";

import React from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { shallowEqual, useSelector } from "react-redux";

const FolderOptions = ({ setIsCreateCollection }: any) => {
  const onAddClick = () => {
    setIsCreateCollection(true);
  };

  const { theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  return (
    <div
      id="menu"
      className={`absolute top-[-20px] right-[20px]
  h-auto w-[100px] flex flex-col justify-start items-start 
  rounded-md overflow-hidden 
  ${theme === "dark" ? "bg-dark-primary shadow-dark-menuShadow" : "bg-slate-400 shadow-light-menuShadow"} 
  z-[200]`}
    >
      <div
        onClick={onAddClick}
        className={`w-full py-3 px-2 flex justify-start items-center gap-4 
        ${
          theme === "dark"
            ? "hover:bg-dark-secondary"
            : "hover:bg-dark-primary-btn"
        } 
        cursor-pointer`}
      >
        <MdOutlineDriveFileRenameOutline className={`text-xl`} />
        <p>New</p>
      </div>
    </div>
  );
};

export default FolderOptions;
