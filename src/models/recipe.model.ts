import mongoose, { ObjectId, Schema } from "mongoose";

export interface IRecipe {
  title: string;
  ingredients: string[];
  method: string;
  user_id: ObjectId;
  cookingTime: string;
  image: string;
}

const recipeSchema = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const recipeModel = mongoose.model<IRecipe>("recipe", recipeSchema);
export default recipeModel;
