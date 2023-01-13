import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"));
const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isLoggedIn: isLoggedIn ? isLoggedIn : false,
  name: name ? name : "",
  user: user ? user : {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      localStorage.setItem("isLoggedIn", action.payload);
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export const { SET_LOGIN, SET_USER, SET_NAME } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectName = (state) => state.auth.name;

export default authSlice.reducer;
