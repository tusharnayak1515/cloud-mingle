"use client";

import { getCollectionById } from "@/apiCalls/collection";
import { setCollection } from "@/redux/reducers/collectionReducer";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const CollectionDetailsPage = () => {
  const params = useParams();
  const dispatch: any = useDispatch();
  const { collection } = useSelector(
    (state: any) => state.collectionReducer,
    shallowEqual
  );

  const fetchCollection = async (id: any) => {
    try {
      const res: any = await getCollectionById(id);
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

  return (
    <div
      className={`min-h-[100vh] w-full p-8 text-dark-primary flex flex-col justify-start items-start gap-4`}
    >
      <h1 className={`text-2xl font-bold`}>{collection?.name}</h1>
    </div>
  );
};

export default CollectionDetailsPage;
