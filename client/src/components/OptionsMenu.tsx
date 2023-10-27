"use client";

import React from "react";
import { HiViewfinderCircle } from "react-icons/hi2";
import { MdDelete, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { shallowEqual, useSelector } from "react-redux";

const OptionsMenu = ({
  file,
  onDeleteFile,
  setShowMenu,
  setShow,
  setRename,
}: any) => {
  const { profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const { collection } = useSelector(
    (state: any) => state.collectionReducer,
    shallowEqual
  );

  const memberObj: any = collection?.members?.find(
    (obj: any) => obj?.member?._id === profile?._id
  );

  const onDeleteClick = () => {
    onDeleteFile(file?._id);
    setShowMenu(null);
  };

  const onDownloadFile = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name);
      link.style.display = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const onRenameClick = () => {
    setRename(file);
  };

  return (
    <div
      id="menu"
      className={`absolute right-[70px] bottom-0
  h-auto w-[300px] py-3 flex flex-col justify-start items-start 
  rounded-md bg-dark-primary shadow-dark-menuShadow z-[200]`}
    >
      {(file?.contentType.startsWith("image/") ||
        file?.contentType === "application/pdf") && (
        <div
          onClick={() => setShow(file)}
          className={`w-full p-2 flex justify-start items-center gap-4  hover:bg-dark-secondary cursor-pointer`}
        >
          <HiViewfinderCircle className={`text-xl`} />
          <p>Open</p>
        </div>
      )}

      <div
        onClick={onDownloadFile}
        className={`w-full p-2 flex justify-start items-center gap-4  hover:bg-dark-secondary cursor-pointer`}
      >
        <FiDownload className={`text-xl`} />
        <p>Download</p>
      </div>

      {(collection?.owner?._id === profile?._id ||
        memberObj?.role === "full-access" ||
        file?.addedBy?._id === profile?._id) && (
        <div
          onClick={onRenameClick}
          className={`w-full p-2 flex justify-start items-center gap-4  hover:bg-dark-secondary cursor-pointer`}
        >
          <MdOutlineDriveFileRenameOutline className={`text-xl`} />
          <p>Rename</p>
        </div>
      )}

      {(collection?.owner?._id === profile?._id ||
        memberObj?.role === "full-access" ||
        file?.addedBy?._id === profile?._id) && (
        <div
          className={`w-full p-2 flex justify-start items-center gap-4  hover:bg-dark-secondary cursor-pointer`}
          onClick={onDeleteClick}
        >
          <MdDelete className={`text-xl`} />
          <p>Delete</p>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
