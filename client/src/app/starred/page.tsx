"use client";

import React, { useState, useEffect } from "react";
import { getStarredCollections } from "@/apiCalls/starred";
import { setStarredCollection } from "@/redux/reducers/starredReducer";
import { useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BsThreeDotsVertical } from "react-icons/bs";
import CollectionsMenu from "@/components/CollectionsMenu";
import { formatDate } from "@/utils/util";

const StarredPage = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);
  const { starredCollection } = useSelector(
    (state: any) => state.starredReducer,
    shallowEqual
  );

  const [showCollectionMenu, setShowCollectionMenu] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        error.response.data.error
      );
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    } else {
      fetchStarredCollections();
    }
  }, [user, router]);

  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      const collectionMenu = document.getElementById("collectionMenu");

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
  }, [showCollectionMenu]);

  return (
    <div
      className={`min-h-[90vh] w-full p-8 text-dark-primary flex flex-col justify-start items-start gap-4`}
    >
      {isLoading && <LoadingSpinner />}

      <p className={`text-2xl font-bold`}>Starred Collections</p>

      {starredCollection?.collections?.length === 0 ? (
        <p className={`text-lg`}>No collections to show</p>
      ) : (
        <div className={`relative w-full`}>
          <div className="w-full my-4 overflow-x-auto md_link:overflow-x-clip sm:max-w-full">
            <table
              className={`h-full w-[600px] sm:w-full bg-transparent`}
            >
              <thead>
                <tr>
                  <th className={`py-3 px-2 text-start`}>Sl No</th>
                  <th className={`py-3 px-2 text-start`}>Collection Name</th>
                  <th className={`py-3 px-2 text-start`}>Owner</th>
                  <th className={`py-3 px-2 text-start`}>Last Updated</th>
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
                {starredCollection?.collections?.map(
                  (collection: any, index: number) => {
                    return (
                      <tr
                        key={collection?._id}
                        className={`border-t border-dark-primary transition-all duration-300`}
                      >
                        <td
                          className={`py-3 px-2 text-sm text-start font-[500]`}
                        >
                          {index + 1}
                        </td>
                        <td
                          className={`py-3 px-2 text-sm text-start font-[500]`}
                        >
                          {collection?.name}
                        </td>
                        <td
                          className={`py-3 px-2 text-sm text-start font-[500]`}
                        >
                          {collection.owner?.name}
                        </td>
                        <td
                          className={`py-3 px-2 text-sm text-start font-[500]`}
                        >
                          {formatDate(collection?.updatedAt)}
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
                              <CollectionsMenu collection={collection} />
                            )}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StarredPage;
