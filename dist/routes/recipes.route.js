"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_controller_1 = __importDefault(require("../controllers/recipe.controller"));
const recipeRouter = (0, express_1.Router)();
const Controller = new recipe_controller_1.default();
recipeRouter.get("/", Controller.getAll);
recipeRouter.get("/:id", Controller.get);
recipeRouter.post("/", Controller.create);
recipeRouter.put("/:id", Controller.update);
recipeRouter.delete("/:id", Controller.destroy);
exports.default = recipeRouter;
