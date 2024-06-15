import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserState {
  username: string | null;
  verified: boolean;
  phone: string | null;
}

const initialState: UserState = {
  username: null,
  verified: false,
  phone: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser:(state, action) => {
      state.phone = action.payload.phone,
      state.verified = true
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.username = null;
      state.verified = false;
      state.phone = null;
    },
  },
})

export const { setAuthUser, setUsername, logout } = userSlice.actions;
export const getUser = (state:RootState) => state.user;
export default userSlice.reducer
