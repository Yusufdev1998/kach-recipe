import mongoose, { Schema } from "mongoose";

export interface IUser {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model<IUser>("user", userSchema);
export default userModel;
