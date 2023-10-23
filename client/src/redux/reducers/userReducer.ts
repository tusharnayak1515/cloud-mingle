import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: getCookie("authorization") || null,
        profile: typeof localStorage === "undefined" 
        ? null 
        : localStorage.getItem("user_data") 
        ? JSON.parse(localStorage.getItem("user_data")!) 
        : null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.token;
        },
        setProfile: (state, action) => {
            state.profile = action.payload.user;
        },
        userLogout: (state) => {
            state.user = null;
            state.profile = null;
        },
    },
});

export const { setUser, setProfile, userLogout } = userSlice.actions;
export default userSlice.reducer;