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
  const { profile, theme } = useSelector(
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

  return (
    <>
      {(collection?.owner?._id === profile?._id ||
        (memberUser &&
          ["full-access", "write-only"].indexOf(memberUser?.role) !== -1)) && (
        <>
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`h-[150px] xxxs:h-[200px] w-[300px] xxxs:w-[350px] flex justify-center items-center
            border-2 border-dashed 
            ${
              theme === "dark" ? "border-dark-primary" : "border-dark-secondary"
            } 
            rounded-md self-center`}
          >
            <label
              htmlFor="file"
              className={`h-full w-full flex justify-center items-center`}
            >
              {selectedFile ? (
                <>{previewFile(selectedFile)}</>
              ) : (
                <FaUpload
                  className={`text-[4rem] 
                  ${
                    theme === "dark"
                      ? "text-dark-primary"
                      : "text-dark-secondary"
                  } 
                  cursor-pointer`}
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
            className={`py-2 px-4 ${!selectedFile ? 'cursor-not-allowed' : ''} ${
              theme === "dark"
                ? "text-dark-secondary bg-dark-primary-btn hover:bg-dark-secondary-btn"
                : "text-dark-primary bg-dark-primary hover:opacity-[0.85]"
            } rounded-md transition-all duration-300 self-center`}
            onClick={onAddFile}
            disabled={!selectedFile}
          >
            Upload
          </button>
        </>
      )}
    </>
  );
};

export default UploadFile;
