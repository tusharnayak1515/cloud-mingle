import { createSlice } from "@reduxjs/toolkit";

const inviteSlice = createSlice({
  name: "invite",
  initialState: {
    invite: null,
    invites: [],
  },
  reducers: {
    setInvite: (state, action)=> {
        state.invite = action.payload.invite
    },
    setInvites: (state, action)=> {
        state.invites = action.payload.invites
    },
    invitelogout: (state)=> {
        state.invite = null,
        state.invites = []
    }
  },
});

export const setInvite = inviteSlice.actions.setInvite;
export const setInvites = inviteSlice.actions.setInvites;
export const invitelogout = inviteSlice.actions.invitelogout;
export default inviteSlice.reducer;
