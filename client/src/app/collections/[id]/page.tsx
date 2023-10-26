"use client";

import React, { useEffect, useState } from "react";
import { addFile, getCollectionById } from "@/apiCalls/collection";
import { setCollection } from "@/redux/reducers/collectionReducer";
import { useParams, useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player";
import { BiSolidImage } from "react-icons/bi";
import {
  FaFileExcel,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaUpload,
} from "react-icons/fa";
import { BsCameraVideoFill, BsThreeDotsVertical } from "react-icons/bs";
import { AiFillFileText, AiFillFileZip } from "react-icons/ai";
import { formatDate, formatFileSize } from "@/utils/util";
import { toast } from "react-toastify";
const OpenFile = dynamic(() => import("@/components/modals/OpenFile"), {
  ssr: false,
});
const RenameFile = dynamic(() => import("@/components/modals/RenameFile"), {
  ssr: false,
});
const ShareFileModal = dynamic(
  () => import("@/components/modals/ShareFileModal"),
  {
    ssr: false,
  }
);
const OptionsMenu = dynamic(() => import("@/components/OptionsMenu"), {
  ssr: false,
});

const CollectionDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);
  const { collection } = useSelector(
    (state: any) => state.collectionReducer,
    shallowEqual
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [show, setShow] = useState<File | null>(null);
  const [rename, setRename] = useState<File | null>(null);
  const [shareFile, setShareFile] = useState<File | null>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
  };

  const onAddFile = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res: any = await addFile({ formData, id: collection?._id });
        if (res.success) {
          dispatch(setCollection({ collection: res.collection }));
          toast.success("File uploaded successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setSelectedFile(null);
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
    } else {
      toast.error("No file selected", {
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

  const ImagePreview = ({ file }: any) => {
    return <img src={URL.createObjectURL(file)} className={`h-full w-full`} />;
  };

  const VideoPreview = ({ file }: any) => {
    return (
      <ReactPlayer
        url={URL.createObjectURL(file)}
        controls={true}
        width="100%"
        height="100%"
        className={`h-full w-full`}
      />
    );
  };

  const previewFile = (file: any, icon?: boolean) => {
    const fileType = file?.type || file?.contentType;
    try {
      if (fileType?.startsWith("image/")) {
        if (icon) {
          return (
            <BiSolidImage className={`${icon ? "text-xl" : "text-[5rem]"}`} />
          );
        }
        return <ImagePreview file={file} />;
      } else if (fileType === "application/pdf") {
        return (
          <div className={`flex flex-col justify-start items-center gap-4`}>
            <FaFilePdf className={`${icon ? "text-xl" : "text-[5rem]"}`} />
            {!icon && <p>{file?.name}</p>}
          </div>
        );
      } else if (fileType?.startsWith("video/")) {
        if (icon) {
          return (
            <BsCameraVideoFill
              className={`${icon ? "text-xl" : "text-[5rem]"}`}
            />
          );
        }
        return <VideoPreview file={file} />;
      } else if (
        fileType?.startsWith(
          "application/vnd.openxmlformats-officedocument.wordprocessingml"
        )
      ) {
        return (
          <div className={`flex flex-col justify-start items-center gap-4`}>
            <FaFileWord className={`${icon ? "text-xl" : "text-[5rem]"}`} />
            {!icon && <p>{file?.name}</p>}
          </div>
        );
      } else if (
        fileType?.startsWith(
          "application/vnd.openxmlformats-officedocument.presentationml"
        )
      ) {
        return (
          <div className={`flex flex-col justify-start items-center gap-4`}>
            <FaFilePowerpoint
              className={`${icon ? "text-xl" : "text-[5rem]"}`}
            />
            {!icon && <p>{file?.name}</p>}
          </div>
        );
      } else if (
        fileType?.startsWith(
          "application/vnd.openxmlformats-officedocument.spreadsheetml"
        )
      ) {
        return (
          <div className={`flex flex-col justify-start items-center gap-4`}>
            <FaFileExcel className={`${icon ? "text-xl" : "text-[5rem]"}`} />
            {!icon && <p>{file?.name}</p>}
          </div>
        );
      } else if (fileType === "application/x-compressed") {
        return (
          <div className={`flex flex-col justify-start items-center gap-4`}>
            <AiFillFileZip className={`${icon ? "text-xl" : "text-[5rem]"}`} />
            {!icon && <p>{file?.name}</p>}
          </div>
        );
      } else if (fileType === "application/x-zip-compressed") {
        return (
          <div className={`flex flex-col justify-start items-center gap-4`}>
            <AiFillFileZip className={`${icon ? "text-xl" : "text-[5rem]"}`} />
            {!icon && <p>{file?.name}</p>}
          </div>
        );
      } else if (fileType === "text/plain") {
        return (
          <div className={`flex flex-col justify-start items-center gap-4`}>
            <AiFillFileText className={`${icon ? "text-xl" : "text-[5rem]"}`} />
            {!icon && <p>{file?.name}</p>}
          </div>
        );
      } else {
        if (icon) {
          return null;
        }
        return <p>Preview not available for this file type</p>;
      }
    } catch (error: any) {
      console.log("Error in render preview: ", error);
    }
  };

  const onMenuClick = (id: string | null) => {
    if (id === null) {
      setShowMenu(null);
    } else if (showMenu !== null && showMenu === id) {
      setShowMenu(null);
    } else {
      setShowMenu(id);
    }
  };

  const onDeleteFile = (index: number) => {
    // setFiles((prev: File[]) => prev.filter((_, id: number) => index !== id));
  };

  const fetchCollection = async (id: any) => {
    try {
      const res: any = await getCollectionById(id);
      console.log("res: ", res);
      if (res.success) {
        dispatch(setCollection({ collection: res.collection }));
      }
    } catch (error: any) {
      console.log(
        "Error in fetching collection, in collection details page: ",
        error.response.data.error
      );
    }
  };

  useEffect(() => {
    fetchCollection(params.id);
  }, [params.id]);

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    }
    const handleDocumentClick = (e: any) => {
      const menuElement = document.getElementById("menu");
      const previewElement = document.getElementById("preview");
      const menuBtn = document.querySelector(".menuBtn");

      if (
        showMenu !== null &&
        previewElement &&
        !previewElement.contains(e.target)
      ) {
        onMenuClick(null);
      }

      if (showMenu !== null && menuBtn?.contains(e.target)) {
        onMenuClick(null);
      }

      if (showMenu !== null && menuElement && !menuElement.contains(e.target)) {
        onMenuClick(null);
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [user, showMenu]);

  return (
    <div
      className={`min-h-[90vh] w-full p-8 text-dark-primary flex flex-col justify-start items-start gap-4`}
    >
      <h1 className={`text-2xl font-bold`}>{collection?.name}</h1>

      <OpenFile show={show} setShow={setShow} />

      {rename && (
        <RenameFile type="file" show={rename} setShow={setRename} />
      )}

      {shareFile && <ShareFileModal show={shareFile} setShow={setShareFile} />}

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

      <div className={`w-full my-4`}>
        {collection?.files?.length === 0 ? (
          <p className={`text-center text-lg`}>No files uploaded</p>
        ) : (
          <div
            className={`w-[60% flex flex-col justify-start items-center gap-4`}
          >
            <table className={`w-full bg-transparent`}>
              <thead>
                <tr>
                  <th className={`py-3 px-2 text-start`}>Name</th>
                  <th className={`py-3 px-2 text-start`}>Last Modified</th>
                  <th className={`py-3 px-2 text-sm text-start`}>
                    <div
                      className={`inline-block w-auto p-2 rounded-full cursor-pointer hover:bg-dark-primary transition-all duration-300`}
                    >
                      <BsThreeDotsVertical className={`text-base`} />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {collection?.files?.map((file: any) => {
                  return (
                    <tr
                      key={file?._id}
                      className={`border-t border-dark-primary transition-all duration-300`}
                    >
                      <td className={`py-3 px-2 text-sm text-start font-[500]`}>
                        <div
                          className={`flex justify-start items-center gap-4`}
                        >
                          {previewFile(file, true)}
                          <p>
                            {file?.filename?.length > 25
                              ? `${file?.filename?.substring(0, 25)}...`
                              : file?.filename}
                          </p>
                        </div>
                      </td>
                      <td className={`py-3 px-2 text-sm text-start font-[500]`}>
                        {formatDate(collection?.updatedAt)}
                      </td>
                      <td className={`relative py-3 px-2 text-sm text-start`}>
                        <div
                          onClick={() => {
                            onMenuClick(file?._id);
                          }}
                          className={`menuBtn inline-block w-auto p-2 rounded-full cursor-pointer hover:bg-dark-primary transition-all duration-300`}
                        >
                          <BsThreeDotsVertical className={`text-base`} />
                        </div>
                        {showMenu === file?._id && (
                          <OptionsMenu
                            onDeleteFile={onDeleteFile}
                            file={file}
                            setShowMenu={setShowMenu}
                            setShow={setShow}
                            setRename={setRename}
                            setShareFile={setShareFile}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetailsPage;
