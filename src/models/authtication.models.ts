import mongoose, { Schema } from "mongoose";
import IAuthenticate from "../Interface/authenticate.interface";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "../constants/contants.variable";

const authenticateModel = new Schema<IAuthenticate>({
  name: {
    type: String,
    required: [true, "name is Required"],
  },
  userId: {
    type: String,
    required: [true, "userId is Required"],
    unique: true,
    index: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// authenticateModel.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, SALT_ROUND);

//   next();
// });

// authenticateModel.methods.matchPassword = async function (
//   password: string
// ): Promise<boolean> {
//   return await bcrypt.compare(password, this.password);
// };

export const Authenticate = mongoose.model<IAuthenticate>(
  "Authenticate",
  authenticateModel
);
