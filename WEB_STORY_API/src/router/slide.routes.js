import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middelware.js";
import {
  addLike,
  deleteSlide,
  likeCount,
  removeLike,
} from "../controller/slide.controller.js";

const slideRoutes = Router();

slideRoutes.route("/likes/:slideId").get(likeCount);
slideRoutes.route("/addLike/:slideId").patch(verifyJWT, addLike);
slideRoutes.route("/removeLike/:slideId").patch(verifyJWT, removeLike);
slideRoutes.route("/delete/:slideId").delete(deleteSlide);

export default slideRoutes;
