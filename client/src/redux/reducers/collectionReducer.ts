import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collection: null,
    collections: [],
  },
  reducers: {
    setCollection: (state, action)=> {
        state.collection = action.payload.collection
    },
    setCollections: (state, action)=> {
        state.collections = action.payload.collections
    },
    collectionLogout: (state, action)=> {
        state.collection = null,
        state.collections = []
    }
  },
});

export const setCollection = collectionSlice.actions.setCollection;
export const setCollections = collectionSlice.actions.setCollections;
export const collectionLogout = collectionSlice.actions.collectionLogout;
export default collectionSlice.reducer;
