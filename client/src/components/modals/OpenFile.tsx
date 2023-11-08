"use client";

import React from "react";
import dynamic from "next/dynamic";
import ReactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import ReactPlayer from "react-player";
import { shallowEqual, useSelector } from "react-redux";
const Modal = dynamic(() => import("./Modal"), { ssr: false });

type propType = {
  show: any;
  setShow: Function;
};

const OpenFile = ({ show, setShow }: propType) => {
  const { theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

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
        className={`relative h-[300px] xxxs:h-[70vh] sm:h-[60vh] md_link:h-[80%] ${
          show ? "w-[85%] xxxs:w-[420px] sm:w-[450px] md_link:w-[600px]" : "w-0"
        } mx-auto`}
      >
        <div className={`h-full w-full my-[3rem] rounded-md overflow-hidden`}>
          {renderPreview()}
          <AiOutlineClose
            onClick={() => setShow(null)}
            className={`absolute left-[95%] sm:left-[101%] top-[-10%] xxxs:top-[-7%] sm:top-[2%] 
            text-3xl ${
              theme === "dark" ? "text-dark-primary" : "text-dark-secondary"
            } 
            cursor-pointer`}
          />
        </div>
      </div>
    </Modal>,
    document.getElementById("modal")!
  );
};

export default OpenFile;
