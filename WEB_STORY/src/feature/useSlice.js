import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "../services/apiRoutes.js";
import { axiosGet } from "../services/axios.config.js";

const initialState = {
  isAuthenticated: false,
  loading: true,
  username: "",
  avatar: "",
  ownstories: [],
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialized: (state) => {
      if (localStorage.getItem("accessToken")) {
        state.isAuthenticated = true;
      }
    },
    register: (state, action) => {
      state.username = action.payload.username;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      const { username, avatar, like } = action.payload.user;
      state.username = username;
      state.avatar = avatar || "";
    },
    reset: (state) => {
      state = { ...initialState };
    },
  },
});

export const { initialized, register, login, reset } = userReducer.actions;

export default userReducer.reducer;
