"use client";

import React, { useEffect, useState } from "react";
import { getAllCollections } from "@/apiCalls/collection";
import LoadingSpinner from "@/components/LoadingSpinner";
import { setCollections } from "@/redux/reducers/collectionReducer";
import { useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
const Collection = dynamic(
  () => import("@/components/collections/Collection"),
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

  return (
    <div
      className={`min-h-[100vh] w-full p-8 text-dark-primary flex flex-col justify-start items-center gap-4`}
    >
      {isLoading && <LoadingSpinner />}

      <h1>My Collections</h1>

      {collections?.length === 0 ? (
        <p>No collections to show</p>
      ) : (
        <div className={`w-full`}>
          {collections?.map((collection: any) => {
            return <Collection key={collection?._id} collection={collection} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
