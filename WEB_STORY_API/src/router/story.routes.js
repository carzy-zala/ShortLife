import { Router } from "express";
import {
  addStory,
  allStories,
  categoryStories,
  story
} from "../controller/story.controller.js";
import { verifyJWT } from "../middleware/auth.middelware.js";

const storyRoutes = Router();

storyRoutes.route("/addStory").post(verifyJWT, addStory);

storyRoutes.route("/stories").get(allStories);
storyRoutes.route("/category/:category").get(categoryStories);
storyRoutes.route("/:storyId").get(story)

export default storyRoutes;
