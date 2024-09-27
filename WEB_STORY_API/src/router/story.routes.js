import { Router } from "express";
import { addStory } from "../controller/story.controller.js";
import { verifyJWT } from "../middleware/auth.middelware.js";

const storyRoutes = Router();

storyRoutes.use(verifyJWT);

storyRoutes.route("/addStory").post(addStory);

export default storyRoutes;
