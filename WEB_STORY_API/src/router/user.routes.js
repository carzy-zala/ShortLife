import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middelware.js";

import {
  addBookmark,
  bookmark,
  isUsernameExist,
  login,
  register,
  ownStories,
  likes,
  removeBookmark,
  bookmarks,
} from "../controller/user.controller.js";

const userRoutes = Router();

userRoutes.route("/register").post(register);
userRoutes.route("/usernameVerification/:username").get(isUsernameExist);
userRoutes.route("/login").post(login);

userRoutes.route("/bookmark").get(verifyJWT, bookmark);
userRoutes.route("/bookmarkArray").get(verifyJWT, bookmarks);
userRoutes.route("/addBookmark/:slideId").patch(verifyJWT, addBookmark);
userRoutes.route("/removeBookmark/:slideId").patch(verifyJWT, removeBookmark);

userRoutes.route("/stories").get(verifyJWT, ownStories);
userRoutes.route("/likes").get(verifyJWT, likes);

export default userRoutes;
