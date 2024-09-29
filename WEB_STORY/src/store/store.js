// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "../feature/useSlice.js";
// import storiesReducer from "../feature/storySlice.js";

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     stories: storiesReducer,
//   },
// });

// export default store;

// store.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../feature/useSlice.js";
import storiesReducer from "../feature/storySlice.js";
import categoryReducer from "../feature/categorySlice.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "stories"],
};

const rootReducer = combineReducers({
  user: userReducer,
  stories: storiesReducer,
  categories: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
