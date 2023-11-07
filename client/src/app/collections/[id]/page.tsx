"use client";

import React, { useEffect, useState } from "react";
import { addFile, deleteFile, getCollectionById } from "@/apiCalls/collection";
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
} from "react-icons/fa";
import { BsCameraVideoFill, BsThreeDotsVertical } from "react-icons/bs";
import {
  AiFillFileText,
  AiFillFileZip,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { formatDate } from "@/utils/util";
import { toast } from "react-toastify";
import { getStarredCollections, starCollection } from "@/apiCalls/starred";
import { setStarredCollection } from "@/redux/reducers/starredReducer";
import LoadingSpinner from "@/components/LoadingSpinner";
import socket from "@/utils/socket";
const OpenFile = dynamic(() => import("@/components/modals/OpenFile"), {
  ssr: false,
});
const RenameFile = dynamic(() => import("@/components/modals/RenameFile"), {
  ssr: false,
});
const OptionsMenu = dynamic(() => import("@/components/OptionsMenu"), {
  ssr: false,
});
const UploadFile = dynamic(
  () => import("@/components/collectionDetails/UploadFile"),
  {
    ssr: false,
  }
);

const CollectionDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch: any = useDispatch();
  const { user, profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );
  const { collection } = useSelector(
    (state: any) => state.collectionReducer,
    shallowEqual
  );
  const { starredCollection } = useSelector(
    (state: any) => state.starredReducer,
    shallowEqual
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [show, setShow] = useState<File | null>(null);
  const [rename, setRename] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res: any = await addFile({ formData, id: collection?._id });
        if (res.success) {
          socket.emit("collection-updated", {
            collectionId: collection?._id,
            userId: profile?._id,
          });
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
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
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
      setIsLoading(false);
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

  const onDeleteFile = async (id: string) => {
    try {
      setIsLoading(true);
      const res: any = await deleteFile({ cid: collection?._id, fid: id });
      if (res.success) {
        dispatch(setCollection({ collection: res.collection }));
        setIsLoading(false);
        socket.emit("collection-updated", {
          collectionId: collection?._id,
          userId: profile?._id,
        });
        toast.success("File deleted successfully", {
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
      setIsLoading(false);
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

  const fetchCollection = async (id: any) => {
    try {
      setIsLoading(true);
      const res: any = await getCollectionById(id);
      if (res.success) {
        dispatch(setCollection({ collection: res.collection }));
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(
        "Error in fetching collection, in collection details page: ",
        error.response.data.error
      );
    }
  };

  const fetchStarredCollections = async () => {
    try {
      setIsLoading(true);
      const res: any = await getStarredCollections();
      if (res.success) {
        dispatch(
          setStarredCollection({ starredCollection: res.starredCollection })
        );
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(
        "Error in fetching starred collections, in starred.tsx: ",
        error
      );
    }
  };

  const onStarCollection = async () => {
    try {
      setIsLoading(true);
      const res: any = await starCollection(collection?._id);
      if (res.success) {
        dispatch(
          setStarredCollection({ starredCollection: res.starredCollection })
        );
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
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

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    } else {
      fetchStarredCollections();
      fetchCollection(params.id);
    }
  }, [user, router, params.id]);

  useEffect(() => {
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
  }, [showMenu]);

  useEffect(() => {
    socket.on("collection-changed", (data: any) => {
      if (data.userId !== profile?._id) {
        fetchCollection(data.collectionId);
      }
    });

    // return () => {
    //   socket.off("collection-changed");
    // };
  }, [socket]);

  useEffect(() => {
    if (collection?._id) {
      socket.emit("setup", {
        collectionId: collection?._id,
        userId: profile?._id,
      });
    }
  }, [collection?._id]);

  return (
    <div
      className={`min-h-[90vh] w-full p-8 text-dark-primary flex flex-col justify-start items-start gap-4`}
    >
      {isLoading && <LoadingSpinner />}

      <div className={`flex justify-start items-center gap-4`}>
        <h1 className={`text-2xl font-bold`}>{collection?.name}</h1>
        {starredCollection?.collections?.some(
          (item: any) => item?._id === collection?._id
        ) ? (
          <AiFillStar
            onClick={onStarCollection}
            className={`text-2xl text-dark-primary cursor-pointer`}
          />
        ) : (
          <AiOutlineStar
            onClick={onStarCollection}
            className={`text-2xl text-dark-primary cursor-pointer`}
          />
        )}
      </div>

      <OpenFile show={show} setShow={setShow} />

      {rename && (
        <RenameFile
          type="file"
          show={rename}
          setShow={setRename}
          collection={collection}
        />
      )}

      <UploadFile
        handleFileDrop={handleFileDrop}
        selectedFile={selectedFile}
        previewFile={previewFile}
        handleFileInputChange={handleFileInputChange}
        onAddFile={onAddFile}
      />

      <div className={`w-full my-4`}>
        {collection?.files?.length === 0 ? (
          <p className={`text-center text-lg`}>No files uploaded</p>
        ) : (
          <div
            className={`w-[60% flex flex-col justify-start items-center gap-4`}
          >
            <div className="w-full my-4 overflow-x-scroll md_link:overflow-x-clip sm:max-w-full">
              <table
                className={`h-full w-[600px] sm:w-full overflow-x-clip bg-transparent`}
              >
                <thead>
                  <tr>
                    <th className={`py-3 px-2 text-start`}>Name</th>
                    <th className={`py-3 px-2 text-start`}>Owner</th>
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
                        <td
                          className={`py-3 px-2 text-sm text-start font-[500]`}
                        >
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
                        <td
                          className={`py-3 px-2 text-sm text-start font-[500]`}
                        >
                          {file?.addedBy?.name}
                        </td>
                        <td
                          className={`py-3 px-2 text-sm text-start font-[500]`}
                        >
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
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetailsPage;
