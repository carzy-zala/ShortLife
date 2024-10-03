import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGet } from "../services/axios.config";
import { apiRoutes } from "../services/apiRoutes";

const initialState = {
  stories: [],
};

export const fetchStories = createAsyncThunk("story/fetchStories", () => {
  return axiosGet(
    `${import.meta.env.VITE_HOST_API_URL}${apiRoutes.ALL_STORY}`
  ).then((response) => response.data.stories);
});

export const addStoriesToCategory = createAsyncThunk(
  "story/addStoriesToCategory",
  ({ category, page }) => {
    return axiosGet(
      `${import.meta.env.VITE_HOST_API_URL}${
        apiRoutes.CATEGORY_STORIES
      }?page=${page}`.replace(":category", category)
    ).then((response) => {
      return response.data;
    });
  }
);

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
    builder.addCase(addStoriesToCategory.fulfilled, (state, action) => {
      const { stories, category } = action.payload;

      const storyIndex = state.stories.findIndex(
        (story) => story.category === category
      );

      if (storyIndex !== -1) {
        state.stories[storyIndex].slides = [
          ...state.stories[storyIndex].slides,
          ...stories,
        ];
      }
      // state.stories = action.payload;
    });
    builder.addCase(addStoriesToCategory.rejected, (state) => {
      // state.stories = initialState.stories;
    });
  },
});

export default storyReducer.reducer;
