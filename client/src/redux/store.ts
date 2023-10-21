import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import collectionReducer from "./reducers/collectionReducer";

export const store = configureStore({
    reducer: {
        userReducer: userReducer,
        collectionReducer: collectionReducer
    }
});