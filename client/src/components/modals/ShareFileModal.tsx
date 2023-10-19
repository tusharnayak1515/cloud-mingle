"use client";

import React from "react";
import dynamic from "next/dynamic";
import ReactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
const Modal = dynamic(() => import("./Modal"), { ssr: false });

const ShareFileModal = ({ show, setShow }: any) => {
  const ImagePreview = ({ file }: any) => {
    return <img src={URL.createObjectURL(file)} className={`h-full w-full`} />;
  };

  const previewFile = () => {
    return <ImagePreview file={show} />;
  };

  return ReactDom.createPortal(
    <Modal>
      <div id="preview" className={`h-[400px] w-[40%] mx-auto`}>
        <div
          className={`relative h-full w-full my-[20%] 
          text-dark-primary p-4 flex flex-col justify-start items-center gap-4 
          rounded-md bg-dark-secondary`}
        >
          <h1 className={`text-xl text-dark-primary font-bold`}>Share File</h1>
          <form
            className={`h-full w-full flex flex-col justify-start items-center gap-4 overflow-y-scroll`}
          >
            <div className={`h-[100px] w-[100px]`}>{previewFile()}</div>
            <p>{show?.name}</p>
          </form>
          <AiOutlineClose
            onClick={() => setShow(null)}
            className={`absolute left-[101%] top-[2%] text-3xl text-dark-primary cursor-pointer`}
          />
        </div>
      </div>
    </Modal>,
    document.getElementById("modal")!
  );
};

export default ShareFileModal;
