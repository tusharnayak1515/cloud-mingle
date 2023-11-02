import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import collectionReducer from "./reducers/collectionReducer";
import inviteReducer from "./reducers/inviteReducer";
import starredReducer from "./reducers/starredReducer";

export const store = configureStore({
    reducer: {
        userReducer: userReducer,
        collectionReducer: collectionReducer,
        inviteReducer: inviteReducer,
        starredReducer: starredReducer,
    }
});