import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import collectionReducer from "./reducers/collectionReducer";
import inviteReducer from "./reducers/inviteReducer";

export const store = configureStore({
    reducer: {
        userReducer: userReducer,
        collectionReducer: collectionReducer,
        inviteReducer: inviteReducer,
    }
});