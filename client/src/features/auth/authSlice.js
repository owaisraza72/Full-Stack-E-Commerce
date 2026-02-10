import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isCheckingAuth: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isCheckingAuth = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isCheckingAuth = false;
    },
    finishCheckingAuth: (state) => {
      state.isCheckingAuth = false;
    },
  },
});

export const { setUser, logoutUser, finishCheckingAuth } = authSlice.actions;
export default authSlice.reducer;
