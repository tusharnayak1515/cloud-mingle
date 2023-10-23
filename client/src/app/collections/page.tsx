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
const AddCollectionModal = dynamic(
  () => import("@/components/modals/AddCollectionModal"),
  { ssr: false }
);

const CollectionsPage = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);
  const { collections } = useSelector(
    (state: any) => state.collectionReducer,
    shallowEqual
  );

  const [isLoading, setIsLoading] = useState(false);
  const [showFolderMenu, setShowFolderMenu] = useState(false);
  const [isCreateCollection, setIsCreateCollection] = useState(false);
  const [showCollectionMenu, setShowCollectionMenu] = useState(null);

  const fetchMyCollections = async () => {
    setIsLoading(true);
    try {
      const res: any = await getAllCollections();
      if (res.success) {
        dispatch(setCollections({ collections: res.collections }));
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(
        "Error in fetching my collections in collections page: ",
        error.response.data.error
      );
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    }
    fetchMyCollections();
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

  return (
    <div
      className={`min-h-[100vh] w-full p-8 text-dark-primary flex flex-col justify-start items-start gap-4`}
    >
      {isLoading && <LoadingSpinner />}

      {isCreateCollection && (
        <AddCollectionModal setShow={setIsCreateCollection} />
      )}

      <h1 className={`text-2xl font-bold`}>My Collections</h1>

      {collections?.length === 0 ? (
        <p>No collections to show</p>
      ) : (
        <div className={`w-full my-4 `}>
          <table className={`w-full bg-transparent`}>
            <thead>
              <tr>
                <th className={`py-3 px-2 text-start`}>Name</th>
                <th className={`py-3 px-2 text-start`}>Last Modified</th>
                <th className={`py-3 px-2 text-start`}>Files</th>
                <th className={`relative py-3 px-2 text-sm text-start`}>
                  <div
                    onClick={() => setShowFolderMenu(true)}
                    className={`inline-block w-auto p-2 rounded-full cursor-pointer hover:bg-dark-primary transition-all duration-300`}
                  >
                    <BsThreeDotsVertical className={`text-base`} />
                  </div>
                  {showFolderMenu && (
                    <FolderOptions
                      setIsCreateCollection={setIsCreateCollection}
                    />
                  )}
                </th>
              </tr>
            </thead>

            <tbody className={`w-full`}>
              {collections?.map((collection: any) => {
                return (
                  <tr
                    key={collection?._id}
                    className={`border-t border-dark-primary transition-all duration-300`}
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
                      {formatDate(collection?.updatedAt)}
                    </td>
                    <td className={`py-3 px-2 text-sm text-start font-[500]`}>
                      {collection?.files?.length}
                    </td>
                    <td className={`relative py-3 px-2 text-sm text-start`}>
                      <div
                        onClick={() => {
                          setShowCollectionMenu(collection?._id);
                        }}
                        className={`menuBtn inline-block w-auto p-2 rounded-full cursor-pointer hover:bg-dark-primary transition-all duration-300`}
                      >
                        <BsThreeDotsVertical className={`text-base`} />
                      </div>
                      {showCollectionMenu !== null &&
                        showCollectionMenu === collection?._id && (
                          <CollectionsMenu
                            collection={collection}
                            setShow={setShowCollectionMenu}
                          />
                        )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* {collections?.map((collection: any) => {
            return <Collection key={collection?._id} collection={collection} />;
          })} */}
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
