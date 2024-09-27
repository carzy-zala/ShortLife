import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "../services/apiRoutes.js";
import { axiosGet } from "../services/axios.config.js";

export const bookmark = createAsyncThunk("user/bookmark", () => {});

const initialState = {
  isAuthenticated: false,
  loading: true,
  username: "",
  avatar: "",
  bookmark: [],
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
  extraReducers: (builder) => {
    //   builder.addCase(bookmark.pending, (state) => {
    //     state.loading = false;
    //   });
    //   builder.addCase(bookmark.fulfilled, (state, action) => {
    //     action.loading = false;
    //     state.bookmark = action.payload.bookmark || [];
    //   });
  },
});

export const { initialized, register, login ,reset} = userReducer.actions;

export default userReducer.reducer;
