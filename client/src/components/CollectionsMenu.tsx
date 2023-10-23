"use client";

import React, { useState } from "react";
import { HiViewfinderCircle } from "react-icons/hi2";
import { MdDelete, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { BsShareFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const CollectionsMenu = ({ collection, setShow }: any) => {
  const router = useRouter();
  const dispatch:any = useDispatch();

  const onDeleteClick = async () => {
    // onDeleteFile(index);
    // setShowMenu(null);
  };

  const onDownloadFile = () => {
    // if (file) {
    //   const url = URL.createObjectURL(file);
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", file.name);
    //   link.style.display = "hidden";
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // }
  };

  const onRenameClick = () => {
    // setRename(file);
  };

  const onOpen = ()=> {
    router.push(`/collections/${collection?._id}`)
  }

  return (
    <div
      id="collectionMenu"
      className={`absolute right-[70px] bottom-0
  h-auto w-[300px] py-3 flex flex-col justify-start items-start 
  rounded-md bg-dark-primary shadow-dark-menuShadow z-[200]`}
    >
      <div
        onClick={onOpen}
        className={`w-full p-2 flex justify-start items-center gap-4  hover:bg-dark-secondary cursor-pointer`}
      >
        <HiViewfinderCircle className={`text-xl`} />
        <p>Open</p>
      </div>

      <div
        onClick={onDownloadFile}
        className={`w-full p-2 flex justify-start items-center gap-4  hover:bg-dark-secondary cursor-pointer`}
      >
        <FiDownload className={`text-xl`} />
        <p>Download</p>
      </div>

      <div
        onClick={onRenameClick}
        className={`w-full p-2 flex justify-start items-center gap-4  hover:bg-dark-secondary cursor-pointer`}
      >
        <MdOutlineDriveFileRenameOutline className={`text-xl`} />
        <p>Rename</p>
      </div>

      <div
        onClick={() => {}}
        className={`w-full p-2 flex justify-start items-center gap-4  hover:bg-dark-secondary cursor-pointer`}
      >
        <BsShareFill className={`text-xl`} />
        <p>Share</p>
      </div>

      <div
        className={`w-full p-2 flex justify-start items-center gap-4  hover:bg-dark-secondary cursor-pointer`}
        onClick={onDeleteClick}
      >
        <MdDelete className={`text-xl`} />
        <p>Delete</p>
      </div>
    </div>
  );
};

export default CollectionsMenu;