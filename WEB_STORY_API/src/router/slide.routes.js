import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middelware.js";
import { addLike, likeCount } from "../controller/slide.controller.js";

const slideRoutes = Router();

slideRoutes.route("/likes/:slideId").get(likeCount);
slideRoutes.route("/addLike/:slideId").patch(verifyJWT, addLike);

export default slideRoutes;
