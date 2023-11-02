import { createSlice } from "@reduxjs/toolkit";

const starredSlice = createSlice({
  name: "starred",
  initialState: {
    starredCollection: null,
  },
  reducers: {
    setStarredCollection: (state, action) => {
      state.starredCollection = action.payload.starredCollection
    },
    starredlogout: (state) => {
      state.starredCollection = null
    }
  },
});

export const setStarredCollection = starredSlice.actions.setStarredCollection;
export const starredlogout = starredSlice.actions.starredlogout;
export default starredSlice.reducer;
