"use client";

import React, { useState } from "react";
import { HiViewfinderCircle } from "react-icons/hi2";
import { MdDelete, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { BsShareFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteCollection } from "@/apiCalls/collection";
import { setCollections } from "@/redux/reducers/collectionReducer";

const CollectionsMenu = ({ collection, setRenameFile }: any) => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const onDeleteClick = async () => {
    // onDeleteFile(index);
    // setShowMenu(null);
    try {
      const res: any = await deleteCollection(collection?._id);
      if (res.success) {
        dispatch(setCollections({ collections: res.collections }));
        toast.success("Collection deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
    setRenameFile(collection);
  };

  const onOpen = () => {
    router.push(`/collections/${collection?._id}`);
  };

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

      {profile?._id === collection?.owner?._id && (
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

export default CollectionsMenu;
