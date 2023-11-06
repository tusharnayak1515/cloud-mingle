"use client";

import React from "react";
import dynamic from "next/dynamic";
import ReactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import ReactPlayer from "react-player";
const Modal = dynamic(() => import("./Modal"), { ssr: false });

type propType = {
  show: any;
  setShow: Function;
};

const OpenFile = ({ show, setShow }: propType) => {

  const ImagePreview = () => {
    const buffer: Buffer = Buffer.from(show?.data?.data, "base64url");
    const blob = new Blob([buffer], { type: show.contentType });
    const blobUrl = URL.createObjectURL(blob);
    return <img src={blobUrl} className={`h-full w-full`} />;
  };

  const DocumentPreview = ({ file }: any) => {
    const fileType = file?.contentType;

    if (fileType === "application/pdf") {
      const buffer: Buffer = Buffer.from(show?.data?.data, "base64url");
      const blob = new Blob([buffer], { type: show.contentType });
      const blobUrl = URL.createObjectURL(blob);
      return <iframe src={blobUrl} className={`h-full w-full`} />;
    } else {
      return <p>Preview not available for this file type</p>;
    }
  };

  const VideoPreview = () => {
    const buffer: Buffer = Buffer.from(show?.data?.data, "base64url");
    const blob = new Blob([buffer], { type: show.contentType });
    const blobUrl = URL.createObjectURL(blob);
    return (
      <ReactPlayer
        url={blobUrl}
        controls={true}
        width="100%"
        height="100%"
        className={`h-full w-full`}
      />
    );
  };

  const renderPreview = () => {
    const file: any = show!;
    const fileType = file?.contentType;
    try {
      if (fileType?.startsWith("image/")) {
        return <ImagePreview />;
      } else if (fileType === "application/pdf") {
        return <DocumentPreview file={file} />;
      } else if (
        fileType?.startsWith("application/vnd.openxmlformats-officedocument")
      ) {
        return <DocumentPreview file={file} />;
      } else if (fileType?.startsWith("video/")) {
        return <VideoPreview />;
      } else {
        return <p>Preview not available for this file type</p>;
      }
    } catch (error: any) {
      console.log("Error in render preview: ", error);
    }
  };

  return ReactDom.createPortal(
    <Modal
      className={`fixed ${
        show ? "left-0 right-0 top-0 bottom-0" : "left-[-10000px]"
      } z-[500] bg-[#0000005a] transition-all duration-300`}
    >
      <div
        id="preview"
        className={`relative h-[80%] ${show ? "w-[60%]" : "w-0"} mx-auto`}
      >
        <div className={`h-full w-full my-[5%] rounded-md overflow-hidden`}>
          {renderPreview()}
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

export default OpenFile;
