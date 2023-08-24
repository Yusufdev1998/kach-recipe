"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_model_1 = __importDefault(require("../models/recipe.model"));
class RecipeController {
    constructor() {
        this.model = recipe_model_1.default;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user_id;
            try {
                const recipes = yield recipe_model_1.default.find({
                    user_id,
                });
                res.json(recipes);
            }
            catch (error) {
                res.status(400).json({ errors: [error.message] });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user_id;
            const id = req.params.id;
            try {
                const recipes = yield recipe_model_1.default.findOne({
                    user_id,
                    _id: id,
                });
                res.json(recipes);
            }
            catch (error) {
                res.status(400).json({ errors: [error.message] });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user_id;
            const data = req.body;
            data.user_id = user_id;
            try {
                const recipe = yield recipe_model_1.default.create(data);
                res.status(201).json(recipe);
            }
            catch (error) {
                res.status(400).json({ errors: [error.message] });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            try {
                yield recipe_model_1.default.updateOne({ _id: id }, data);
                res.status(201).json({ message: "Updated" });
            }
            catch (error) {
                res.status(400).json({ errors: [error.message] });
            }
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                yield recipe_model_1.default.deleteOne({ _id: id });
                res.status(200).json({ message: "Deleted" });
            }
            catch (error) {
                res.status(400).json({ errors: [error.message] });
            }
        });
    }
}
exports.default = RecipeController;
