import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "../services/apiRoutes.js";
import { axiosGet } from "../services/axios.config.js";

const initialState = {
  isAuthenticated: false,
  loading: true,
  username: "",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-yi8lUjKNVqmWkbY2plqdttxFpzC2Efcq0g&s",
  ownstories: [],
  like: [],
  bookmark: [],
};

export const fetchOwnStories = createAsyncThunk("user/fetchOwnStories", () => {
  return axiosGet(
    `${import.meta.env.VITE_HOST_API_URL}${apiRoutes.OWN_STORIES}`
  ).then((response) => response.data.slides);
});

export const likes = createAsyncThunk("user/likes", () => {
  return axiosGet(
    `${import.meta.env.VITE_HOST_API_URL}${apiRoutes.LIKES}`
  ).then((response) => response.data.like);
});

export const bookmarks = createAsyncThunk("user/bookmarks", () => {
  return axiosGet(
    `${import.meta.env.VITE_HOST_API_URL}${apiRoutes.BOOKMARK_ARRAY}`
  ).then((response) => response.data.bookmark);
});

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
      const { username, avatar, like, bookmark } = action.payload.user;
      state.username = username;
      // state.avatar = avatar || "";
      state.like = like || [];
      state.bookmark = bookmark || [];
    },
    reset: (state) => {
      state = { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOwnStories.fulfilled, (state, action) => {
      state.ownstories = action.payload;
    });
    builder.addCase(likes.fulfilled, (state, action) => {
      state.like = action.payload;
    });
    builder.addCase(bookmarks.fulfilled, (state, action) => {
      state.bookmark = action.payload;
    });
  },
});

export const { initialized, register, login, reset } = userReducer.actions;

export default userReducer.reducer;
