import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGet } from "../services/axios.config";
import { apiRoutes } from "../services/apiRoutes";

export const fetchCategory = createAsyncThunk("category/fetchCategory", () => {
  return axiosGet(
    `${import.meta.env.VITE_HOST_API_URL}${apiRoutes.GET_CATEGORIES}`
  ).then((response) => response.data.categories);
});

const initialState = {
  categories: [
    {
      text: "All",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/f2ae/accf/ef75796969cc5a52073e6a83112d4b16?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DKOc8FjFcVYRenxrr9jPDO9OMINUWI~MPZwT~VhVRV71lASX7uCo5AKfsDaYGhqNVpS4C7NYBEZjyeKNa3W~w4kLuzjSGUquB~9cLTA~xYN4IPbgQob82t3QVerOQ6msVxKuHr3Hs4wk0qT4hdVGIODZQduyIlKOp-t1gHBNjr4BJSdEpp1XLSSlsjkXdlwjmogybGovI5rt3YoQhFyRSLHv19fac6kIoWfoE65khesFWpg2nKaWF-eqM-E46tzCw-itxpbcba7u4AVoDrKGV0pCt1A7ardHXcmWPKKEVZKctlXrRb43v5rfcQsWDOyejiWti3lxsthYvJGru8yQUw__",
    },
  ],
};

const categoryReducer = createSlice({
  name: "category",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = [...initialState.categories, ...action.payload];
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.categories = initialState.categories;
    });
  },
});

export default categoryReducer.reducer;
