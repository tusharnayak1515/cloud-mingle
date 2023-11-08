"use client";

import React from "react";
import { HiViewfinderCircle } from "react-icons/hi2";
import { MdDelete, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BsShareFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteCollection } from "@/apiCalls/collection";
import { setCollections } from "@/redux/reducers/collectionReducer";
import socket from "@/utils/socket";

const CollectionsMenu = ({
  collection,
  setRenameFile,
  setShareCollection,
}: any) => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { profile, theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const onDeleteClick = async () => {
    try {
      const res: any = await deleteCollection(collection?._id);
      if (res.success) {
        dispatch(setCollections({ collections: res.collections }));
        socket.emit("collection-updated", {
          collectionId: collection?._id,
          userId: profile?._id,
        });
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
      console.log("error: ", error);
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

  const onRenameClick = () => {
    setRenameFile(collection);
  };

  const onOpen = () => {
    router.push(`/collections/${collection?._id}`);
  };

  return (
    <div
      id="collectionMenu"
      className={`absolute right-[0px] md_link:right-[70px] top-[0px]
  h-auto w-[180px] xs:w-[200px] md_link:w-[300px] py-3 flex flex-col justify-start items-start 
  rounded-md ${
    theme === "dark" ? "bg-dark-primary shadow-dark-menuShadow" : "bg-slate-400 shadow-light-menuShadow"
  } z-[200]`}
    >
      <div
        onClick={onOpen}
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

      {setRenameFile && profile?._id === collection?.owner?._id && (
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

      {setShareCollection && profile?._id === collection?.owner?._id && (
        <div
          onClick={() => setShareCollection(collection)}
          className={`w-full p-2 flex justify-start items-center gap-4 
          ${
            theme === "dark"
              ? "hover:bg-dark-secondary"
              : "hover:bg-dark-primary-btn"
          } 
          cursor-pointer transition-all duration-300`}
        >
          <BsShareFill className={`text-xl`} />
          <p>Share</p>
        </div>
      )}

      {profile?._id === collection?.owner?._id && (
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

export default CollectionsMenu;
