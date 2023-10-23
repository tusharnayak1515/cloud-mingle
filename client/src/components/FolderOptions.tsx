"use client";

import React from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const FolderOptions = ({ setIsCreateCollection }: any) => {
  const onAddClick = () => {
    setIsCreateCollection(true);
  };

  return (
    <div
      id="menu"
      className={`absolute bottom-[50px]
  h-auto w-[100px] flex flex-col justify-start items-start 
  rounded-md overflow-hidden bg-dark-primary shadow-dark-menuShadow z-[200]`}
    >
      <div
        onClick={onAddClick}
        className={`w-full py-3 px-2 flex justify-start items-center gap-4  hover:bg-dark-secondary cursor-pointer`}
      >
        <MdOutlineDriveFileRenameOutline className={`text-xl`} />
        <p>New</p>
      </div>
    </div>
  );
};

export default FolderOptions;
