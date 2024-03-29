"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ReactDom from "react-dom";
import { toast } from "react-toastify";
import { renameCollection, renameFile } from "@/apiCalls/collection";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  setCollection,
  setCollections,
} from "@/redux/reducers/collectionReducer";
import socket from "@/utils/socket";

const Modal = dynamic(() => import("./Modal"), { ssr: false });

type propType = {
  type: string;
  collection?: any;
  show: any;
  setShow: Function;
};

const RenameFile = ({ type, show, setShow, collection }: propType) => {
  const dispatch: any = useDispatch();
  const { profile, theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );
  const [fileName, setFileName] = useState(
    type === "collection"
      ? show
        ? show?.name
        : ""
      : show
      ? show?.filename?.substring(0, show?.filename?.lastIndexOf("."))
      : ""
  );

  const extension =
    type === "collection"
      ? ""
      : show?.filename?.substring(
          show?.filename?.lastIndexOf("."),
          show?.filename?.length
        );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFileName(e.target.value);
  };

  const onRenameFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (show && fileName.replace("/s/g", "").trim().length !== 0) {
        console.log("file id: ", show?._id);
        const res: any = await renameFile({
          collectionId: collection?._id,
          id: show?._id,
          filename: `${fileName}${extension}`,
        });
        if (res.success) {
          dispatch(setCollection({ collection: res.collection }));
          socket.emit("collection-updated", {
            collectionId: collection?._id,
            userId: profile?._id,
          });
          toast.success("File renamed successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setShow(null);
        }
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

  const onRenameCollection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (show && fileName.replace("/s/g", "").trim().length !== 0) {
        const res: any = await renameCollection({
          id: show?._id,
          name: fileName,
        });
        if (res.success) {
          dispatch(setCollections({ collections: res.collections }));
          socket.emit("collection-updated", {
            collectionId: collection?._id,
            userId: profile?._id,
          });
          toast.success("Collection renamed successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setShow(null);
        }
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

  return ReactDom.createPortal(
    <Modal>
      <div
        id="preview"
        className={`h-[220px] w-[90%] xs:w-[80%] sm:w-[450px] md_link:w-[450px] mx-auto rounded-md ${
          theme === "dark"
            ? "shadow-dark-menuShadow"
            : "shadow-light-menuShadow"
        }`}
      >
        <form
          className={`h-full w-full my-20
          ${
            theme === "dark"
              ? "text-dark-primary bg-dark-secondary"
              : "text-dark-secondary bg-slate-400"
          }
             p-4 flex flex-col justify-start items-center gap-4 rounded-md overflow-hidden `}
          onSubmit={type === "file" ? onRenameFile : onRenameCollection}
        >
          <p className={`text-2xl font-bold`}>
            {type === "file" ? `Rename file` : `Rename collection`}
          </p>

          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="name">
              {type === "file" ? `File name` : `Collection name`}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder={type === "file" ? `File name` : `Collection name`}
              value={fileName}
              onChange={onChangeHandler}
              className={`w-full py-2 px-4 rounded-md 
              border border-transparent focus:border-dark-primary
              ${theme === "dark" ? "bg-dark-primary" : "bg-slate-500"}
              outline-none`}
            />
          </div>

          <div className={`w-full grid grid-cols-2 gap-4`}>
            <button
              type="submit"
              className={`w-full py-2 px-4 ${
                theme === "dark"
                  ? "text-dark-secondary bg-dark-primary-btn hover:bg-dark-secondary-btn"
                  : "text-dark-primary bg-dark-primary hover:opacity-[0.85]"
              } rounded-md 
              transition-all duration-300`}
            >
              Rename
            </button>

            <button
              type="button"
              onClick={() => setShow(null)}
              className={`w-full py-2 px-4 ${
                theme === "dark"
                  ? "text-dark-secondary bg-dark-primary-btn hover:bg-dark-secondary-btn"
                  : "text-dark-primary bg-dark-primary hover:opacity-[0.85]"
              } rounded-md 
              transition-all duration-300`}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>,
    document.getElementById("modal")!
  );
};

export default RenameFile;
