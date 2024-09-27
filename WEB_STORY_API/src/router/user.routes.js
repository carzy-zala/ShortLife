import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middelware.js";

import {
  addBookmark,
  bookmark,
  isUsernameExist,
  login,
  register,
  ownStories
} from "../controller/user.controller.js";

const userRoutes = Router();

userRoutes.route("/register").post(register);
userRoutes.route("/usernameVerification/:username").get(isUsernameExist);
userRoutes.route("/login").post(login);

userRoutes.route("/bookmark").get(verifyJWT, bookmark);
userRoutes.route("/addBookmark").patch(verifyJWT, addBookmark);

userRoutes.route("/stories").get(verifyJWT,ownStories)

export default userRoutes;
