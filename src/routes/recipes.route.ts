import { Router } from "express";
import RecipeController from "../controllers/recipe.controller";

const recipeRouter = Router();
const Controller = new RecipeController();
recipeRouter.get("/", Controller.getAll);
recipeRouter.get("/:id", Controller.get);
recipeRouter.post("/", Controller.create);
recipeRouter.put("/:id", Controller.update);
recipeRouter.delete("/:id", Controller.destroy);
export default recipeRouter;
