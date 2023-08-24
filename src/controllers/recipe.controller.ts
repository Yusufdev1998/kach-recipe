import { Request, Response } from "express";
import recipeModel from "../models/recipe.model";
import { customRequest } from "../middleware/auth.middleware";

class RecipeController {
  model;
  constructor() {
    this.model = recipeModel;
  }

  async getAll(req: Request, res: Response) {
    const user_id = (req as customRequest).user_id;
    try {
      const recipes = await recipeModel.find({
        user_id,
      });
      res.json(recipes);
    } catch (error: any) {
      res.status(400).json({ errors: [error.message] });
    }
  }
  async get(req: Request, res: Response) {
    const user_id = (req as customRequest).user_id;
    const id = req.params.id;
    try {
      const recipes = await recipeModel.findOne({
        user_id,
        _id: id,
      });
      res.json(recipes);
    } catch (error: any) {
      res.status(400).json({ errors: [error.message] });
    }
  }

  async create(req: Request, res: Response) {
    const user_id = (req as customRequest).user_id;
    const data = req.body;
    data.user_id = user_id;
    try {
      const recipe = await recipeModel.create(data);
      res.status(201).json(recipe);
    } catch (error: any) {
      res.status(400).json({ errors: [error.message] });
    }
  }
  async update(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;

    try {
      await recipeModel.updateOne({ _id: id }, data);
      res.status(201).json({ message: "Updated" });
    } catch (error: any) {
      res.status(400).json({ errors: [error.message] });
    }
  }

  async destroy(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await recipeModel.deleteOne({ _id: id });
      res.status(200).json({ message: "Deleted" });
    } catch (error: any) {
      res.status(400).json({ errors: [error.message] });
    }
  }
}

export default RecipeController;
