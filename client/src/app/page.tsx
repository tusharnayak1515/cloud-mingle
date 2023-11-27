"use client";

import React, { useEffect, useState } from "react";
import { getAllCollections } from "@/apiCalls/collection";
import LoadingSpinner from "@/components/LoadingSpinner";
import { setCollections } from "@/redux/reducers/collectionReducer";
import { useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDate } from "@/utils/util";
import FolderOptions from "@/components/FolderOptions";
import CollectionsMenu from "@/components/CollectionsMenu";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { getProfile } from "@/apiCalls/auth";
import { setProfile } from "@/redux/reducers/userReducer";
import socket from "@/utils/socket";
import { getCookie, setCookie } from "cookies-next";
const AddCollectionModal = dynamic(
  () => import("@/components/modals/AddCollectionModal"),
  { ssr: false }
);
const ShareCollectionModal = dynamic(
  () => import("@/components/modals/ShareCollectionModal"),
  { ssr: false }
);
const RenameFile = dynamic(() => import("@/components/modals/RenameFile"), {
  ssr: false,
});
const Wrapper = dynamic(() => import("@/components/Wrapper"), {
  ssr: false,
});

const Home = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user, theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );
  const { collections } = useSelector(
    (state: any) => state.collectionReducer,
    shallowEqual
  );

  const [isLoading, setIsLoading] = useState(false);
  const [showFolderMenu, setShowFolderMenu] = useState(false);
  const [isCreateCollection, setIsCreateCollection] = useState(false);
  const [showCollectionMenu, setShowCollectionMenu] = useState(null);
  const [renameFile, setRenameFile] = useState(null);
  const [shareCollection, setShareCollection] = useState<any>(null);

  const fetchMyCollections = async () => {
    setIsLoading(true);
    try {
      const res: any = await getAllCollections();
      if (res.success) {
        dispatch(setCollections({ collections: res.collections }));
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(
        "Error in fetching my collections in collections page: ",
        error.response.data.error
      );
    }
  };

  const fetchProfile = async () => {
    try {
      const res: any = await getProfile();
      if (res.success) {
        localStorage.setItem("user_data", JSON.stringify(res.user));
        dispatch(setProfile({ user: res.user }));
      }
    } catch (error: any) {
      console.log(
        "Error in fetching profile, in root layout: ",
        error.response.data.error
      );
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    }
    fetchMyCollections();
    fetchProfile();
    if (!getCookie("theme")) {
      setCookie("theme", "dark");
    }
  }, [user, router]);

  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      const menuElement = document.getElementById("menu");
      const collectionMenu = document.getElementById("collectionMenu");
      const menuBtn = document.querySelector(".menuBtn");

      if (showFolderMenu && menuElement && !menuElement.contains(e.target)) {
        setShowFolderMenu(false);
      }

      if (showFolderMenu && menuBtn?.contains(e.target)) {
        setShowFolderMenu(false);
      }

      if (
        showCollectionMenu !== null &&
        collectionMenu &&
        !collectionMenu?.contains(e.target)
      ) {
        setShowCollectionMenu(null);
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showFolderMenu, showCollectionMenu]);

  useEffect(() => {
    socket.on("collections-changed", (data: any) => {
      console.log("data: ", data);
      fetchMyCollections();
    });

    // return () => {
    //   socket.off("collection-updated");
    // };
  }, [socket]);

  return (
    <>
      {isLoading && <LoadingSpinner />}

      {shareCollection && (
        <ShareCollectionModal
          show={shareCollection}
          setShow={setShareCollection}
        />
      )}

      {isCreateCollection && (
        <AddCollectionModal setShow={setIsCreateCollection} />
      )}

      {renameFile && (
        <RenameFile
          type="collection"
          show={renameFile}
          setShow={setRenameFile}
          collection={renameFile}
        />
      )}
      <Wrapper
        className={`min-h-[90vh] w-full p-8 ${
          theme === "dark" ? "text-dark-primary" : "text-slate-900"
        } flex flex-col justify-start items-start gap-4`}
      >
        <h1 className={`text-2xl font-bold`}>My Collections</h1>

        {collections?.length === 0 ? (
          <div className={`flex flex-col justify-start items-start gap-2`}>
            <p className={`text-lg`}>No collections to show</p>
            <button
              onClick={() => setIsCreateCollection(true)}
              className={`w-full py-3 px-2 flex justify-start items-center gap-4 rounded-md
             cursor-pointer ${
               theme === "dark"
                 ? "bg-dark-primary hover:shadow-dark-menuShadow"
                 : "bg-slate-400 hover:shadow-light-menuShadow"
             }`}
            >
              <MdOutlineDriveFileRenameOutline className={`text-xl`} />
              <p>New</p>
            </button>
          </div>
        ) : (
          <div className={`relative w-full`}>
            {showFolderMenu && (
              <FolderOptions setIsCreateCollection={setIsCreateCollection} />
            )}
            <div className="min-h-[300px] w-full my-4 overflow-x-scroll md_link:overflow-x-clip sm:max-w-full bg-red-500]">
              <table
                className={`h-full w-[500px] xs:w-full overflow-x-clip bg-transparent`}
              >
                <thead>
                  <tr>
                    <th className={`py-3 px-2 text-start`}>Name</th>
                    <th className={`py-3 px-2 text-start`}>Owner</th>
                    <th className={`py-3 px-2 text-start`}>Last Modified</th>
                    <th className={`py-3 px-2 text-start`}>Files</th>
                    <th className={`relative py-3 px-2 text-sm text-start`}>
                      <div
                        onClick={() => setShowFolderMenu(true)}
                        className={`inline-block w-auto p-2 rounded-full cursor-pointer 
                        ${
                          theme === "dark"
                            ? "hover:bg-dark-primary"
                            : "hover:bg-dark-secondary-btn"
                        } 
                        transition-all duration-300`}
                      >
                        <BsThreeDotsVertical className={`text-base`} />
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className={`w-full`}>
                  {collections?.map((collection: any) => {
                    return (
                      <tr
                        key={collection?._id}
                        className={`border-t ${
                          theme === "dark"
                            ? "border-dark-primary"
                            : "border-dark-secondary"
                        } transition-all duration-300`}
                      >
                        <td
                          className={`w-auto py-3 px-2 text-sm text-start font-[500]`}
                        >
                          {collection?.name?.length > 25
                            ? `${collection?.name.substring(0, 25)}...`
                            : collection?.name}
                        </td>
                        <td
                          className={`w-auto py-3 px-2 text-sm text-start font-[500]`}
                        >
                          {collection?.owner?.name}
                        </td>
                        <td
                          className={`w-auto py-3 px-2 text-sm text-start font-[500]`}
                        >
                          {formatDate(collection?.updatedAt)}
                        </td>
                        <td
                          className={`py-3 px-2 text-sm text-start font-[500]`}
                        >
                          {collection?.files?.length}
                        </td>
                        <td className={`relative py-3 px-2 text-sm text-start`}>
                          <div
                            onClick={() => {
                              setShowCollectionMenu(collection?._id);
                            }}
                            className={`menuBtn inline-block w-auto p-2 rounded-full cursor-pointer 
                            ${
                              theme === "dark"
                                ? "hover:bg-dark-primary"
                                : "hover:bg-dark-secondary-btn"
                            }
                            transition-all duration-300`}
                          >
                            <BsThreeDotsVertical className={`text-base`} />
                          </div>
                          {showCollectionMenu !== null &&
                            showCollectionMenu === collection?._id && (
                              <CollectionsMenu
                                collection={collection}
                                setRenameFile={setRenameFile}
                                setShareCollection={setShareCollection}
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
      </Wrapper>
    </>
  );
};

export default Home;
