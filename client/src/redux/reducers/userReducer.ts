import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: getCookie("authorization") || null,
        profile: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.token;
        },
        setProfile: (state, action) => {
            state.profile = action.payload.user;
        },
        userLogout: (state, action) => {
            state.user = null;
            state.profile = null;
        },
    },
});

export const { setUser, setProfile, userLogout } = userSlice.actions;
export default userSlice.reducer;