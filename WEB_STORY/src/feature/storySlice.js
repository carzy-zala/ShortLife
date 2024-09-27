import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stories: [
    {
      slides: [],
      category: "",
    },
  ],
};

const storyReducer = createSlice({
  name: "story",
  initialState,
  reducer: {},
});

export default storyReducer.reducer;
