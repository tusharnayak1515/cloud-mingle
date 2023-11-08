import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: getCookie("authorization") || null,
        theme: getCookie("theme") || "dark",
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
        setTheme: (state, action) => {
            state.theme = action.payload.theme;
        },
        userLogout: (state) => {
            state.user = null;
            state.profile = null;
        },
    },
});

export const { setUser, setProfile, userLogout, setTheme } = userSlice.actions;
export default userSlice.reducer;