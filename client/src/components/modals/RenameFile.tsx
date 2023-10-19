"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import ReactDom from "react-dom";
const Modal = dynamic(()=> import("./Modal"),{ssr: false});

type propType = {
  show: File | null;
  setShow: Function;
  onRename: Function;
};

const RenameFile = ({ show, setShow, onRename }: propType) => {
  const [fileName, setFileName] = useState(
    show ? show?.name.substring(0, show?.name.lastIndexOf(".")) : ""
  );
  const extension: string = show
    ? show?.name.substring(show?.name.lastIndexOf("."))
    : "";

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFileName(e.target.value);
  };

  const onRenameFile = () => {
    if (show && fileName.replace("/s/g", "").trim().length !== 0) {
      onRename(show, fileName, extension);
      setShow(null);
    }
  };

  return ReactDom.createPortal(
    <Modal
    >
      <div id="preview" className={`h-[220px] w-[30%] mx-auto `}>
        <form
          className={`h-full w-full my-[20%] 
            text-dark-primary p-4 flex flex-col justify-start items-center gap-4 rounded-md overflow-hidden bg-dark-secondary`}
          onSubmit={onRenameFile}
        >
          <p className={`text-2xl font-bold`}>Rename file</p>

          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="name">File Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="File name"
              value={fileName}
              onChange={onChangeHandler}
              className={`w-full py-2 px-4 bg-dark-primary rounded-md outline-none`}
            />
          </div>

          <div className={`w-full grid grid-cols-2 gap-4`}>
            <button
              type="submit"
              className={`py-2 px-4 text-dark-secondary rounded-md 
              hover:bg-dark-secondary-btn bg-dark-primary-btn transition-all duration-300`}
            >
              Rename
            </button>

            <button
              type="button"
              onClick={() => setShow(null)}
              className={`py-2 px-4 text-dark-secondary rounded-md 
              hover:bg-dark-secondary-btn bg-dark-primary-btn transition-all duration-300`}
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
