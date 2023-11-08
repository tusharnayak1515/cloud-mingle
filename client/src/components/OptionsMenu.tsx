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
  const { profile, theme } = useSelector(
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
      const buffer: Buffer = Buffer.from(file?.data?.data, "base64url");
      const blob = new Blob([buffer], { type: file.contentType });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", file.filename);
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
      className={`absolute right-[0px] md_link:right-[70px] top-[0px]
  h-auto w-[180px] xs:w-[200px] md_link:w-[300px] py-3 flex flex-col justify-start items-start 
  rounded-md ${
    theme === "dark"
      ? "bg-dark-primary shadow-dark-menuShadow"
      : "bg-slate-400 shadow-light-menuShadow"
  } z-[200]`}
    >
      {(file?.contentType.startsWith("image/") ||
        file?.contentType === "application/pdf") && (
        <div
          onClick={() => setShow(file)}
          className={`w-full p-2 flex justify-start items-center gap-4 
          ${
            theme === "dark"
              ? "hover:bg-dark-secondary"
              : "hover:bg-dark-primary-btn"
          } 
          cursor-pointer transition-all duration-300`}
        >
          <HiViewfinderCircle className={`text-xl`} />
          <p>Open</p>
        </div>
      )}

      <div
        onClick={onDownloadFile}
        className={`w-full p-2 flex justify-start items-center gap-4 
          ${
            theme === "dark"
              ? "hover:bg-dark-secondary"
              : "hover:bg-dark-primary-btn"
          } 
          cursor-pointer transition-all duration-300`}
      >
        <FiDownload className={`text-xl`} />
        <p>Download</p>
      </div>

      {(collection?.owner?._id === profile?._id ||
        memberObj?.role === "full-access" ||
        (file?.addedBy?._id === profile?._id &&
          memberObj?.role === "full-access")) && (
        <div
          onClick={onRenameClick}
          className={`w-full p-2 flex justify-start items-center gap-4 
          ${
            theme === "dark"
              ? "hover:bg-dark-secondary"
              : "hover:bg-dark-primary-btn"
          } 
          cursor-pointer transition-all duration-300`}
        >
          <MdOutlineDriveFileRenameOutline className={`text-xl`} />
          <p>Rename</p>
        </div>
      )}

      {(collection?.owner?._id === profile?._id ||
        memberObj?.role === "full-access" ||
        (file?.addedBy?._id === profile?._id &&
          memberObj?.role === "full-access")) && (
        <div
          onClick={onDeleteClick}
          className={`w-full p-2 flex justify-start items-center gap-4 
        ${
          theme === "dark"
            ? "hover:bg-dark-secondary"
            : "hover:bg-dark-primary-btn"
        } 
        cursor-pointer transition-all duration-300`}
        >
          <MdDelete className={`text-xl`} />
          <p>Delete</p>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
