import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGet } from "../services/axios.config";
import { apiRoutes } from "../services/apiRoutes";

const initialState = {
  stories: [
    {
      slides: [],
      category: "",
    },
  ],
};

export const fetchStories = createAsyncThunk("story/fetchStories", () => {
  return axiosGet(
    `${import.meta.env.VITE_HOST_API_URL}${apiRoutes.ALL_STORY}`
  ).then((response) => response.data.stories);
});

const storyReducer = createSlice({
  name: "story",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStories.fulfilled, (state, action) => {
      state.stories = action.payload;
    });
    builder.addCase(fetchStories.rejected, (state) => {
      state.stories = initialState.stories;
    });
  },
});

export default storyReducer.reducer;
