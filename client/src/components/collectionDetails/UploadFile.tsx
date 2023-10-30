"use client";

import React from "react";
import { FaUpload } from "react-icons/fa";
import { shallowEqual, useSelector } from "react-redux";

const UploadFile = ({
  handleFileDrop,
  selectedFile,
  previewFile,
  handleFileInputChange,
  onAddFile,
}: any) => {
  const { profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );
  const { collection } = useSelector(
    (state: any) => state.collectionReducer,
    shallowEqual
  );
  const memberUser = collection?.members?.find(
    (item: any) => item?.member?._id === profile?._id
  );

  console.log("memberUser: ",memberUser);

  return (
    <>
      {(collection?.owner?._id === profile?._id ||
        (memberUser &&
          ["full-access", "write-only"].indexOf(memberUser?.role) !== -1)) && (
        <>
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`h-[200px] w-[350px] flex justify-center items-center
      border-2 border-dashed border-dark-primary rounded-md self-center`}
          >
            <label
              htmlFor="file"
              className={`h-full w-full flex justify-center items-center`}
            >
              {selectedFile ? (
                <>{previewFile(selectedFile)}</>
              ) : (
                <FaUpload
                  className={`text-[4rem] text-dark-primary cursor-pointer`}
                />
              )}
            </label>
            <input
              type="file"
              name="file"
              id="file"
              className={`hidden`}
              onChange={handleFileInputChange}
            />
          </div>
          <button
            className={`py-2 px-4 text-dark-secondary rounded-md hover:bg-dark-secondary-btn 
        bg-dark-primary-btn transition-all duration-300 self-center`}
            onClick={onAddFile}
          >
            Upload
          </button>
        </>
      )}
    </>
  );
};

export default UploadFile;
