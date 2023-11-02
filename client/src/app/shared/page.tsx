"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllCollections } from "@/apiCalls/collection";
import { setCollections } from "@/redux/reducers/collectionReducer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BsThreeDotsVertical } from "react-icons/bs";
import FolderOptions from "@/components/FolderOptions";
import { formatDate } from "@/utils/util";
import CollectionsMenu from "@/components/CollectionsMenu";
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

const Shared = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user, profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );
  const { collections } = useSelector(
    (state: any) => state.collectionReducer,
    shallowEqual
  );

  const [isLoading, setIsLoading] = useState(false);
  const [showCollectionMenu, setShowCollectionMenu] = useState(null);
  const [renameFile, setRenameFile] = useState(null);
  const [shareCollection, setShareCollection] = useState<any>(null);

  const fetchCollections = async () => {
    setIsLoading(true);
    try {
      const res: any = await getAllCollections();
      if (res.success) {
        const data = res.collections?.filter(
          (collection: any) =>
            collection?.members?.length > 0 &&
            collection?.owner?._id === profile?._id
        );
        dispatch(setCollections({ collections: data }));
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(
        "Error in fetching shared collections in shared page: ",
        error.response.data.error
      );
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    } else {
      fetchCollections();
    }
  }, [user, router]);

  return (
    <div
      className={`min-h-[90vh] w-full p-8 text-dark-primary flex flex-col justify-start items-start gap-4`}
    >
      {isLoading && <LoadingSpinner />}

      {shareCollection && (
        <ShareCollectionModal
          show={shareCollection}
          setShow={setShareCollection}
        />
      )}

      {renameFile && (
        <RenameFile
          type="collection"
          show={renameFile}
          setShow={setRenameFile}
        />
      )}

      <p className={`text-2xl font-bold`}>Shared Collections</p>

      {collections?.length === 0 ? (
        <p className={`text-lg`}>No collections to show</p>
      ) : (
        <div className={`w-full my-4 `}>
          <table className={`w-full bg-transparent`}>
            <thead>
              <tr>
                <th className={`py-3 px-2 text-start`}>Name</th>
                <th className={`py-3 px-2 text-start`}>Owner</th>
                <th className={`py-3 px-2 text-start`}>Last Modified</th>
                <th className={`py-3 px-2 text-start`}>Files</th>
                <th className={`relative py-3 px-2 text-sm text-start`}>
                  <div
                    className={`inline-block w-auto p-2 rounded-full cursor-pointer hover:bg-dark-primary transition-all duration-300`}
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
                      {collection?.owner?.name}
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
      )}
    </div>
  );
};

export default Shared;