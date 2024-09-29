import { Router } from "express";
import { allCategories } from "../controller/category.controller.js";

const categoryRoutes = Router();

categoryRoutes.route("/categories").get(allCategories);



export default categoryRoutes;
