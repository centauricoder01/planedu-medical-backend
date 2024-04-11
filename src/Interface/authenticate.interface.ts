import { Document } from "mongoose";

interface IAuthenticate extends Document {
  name: string;
  userId: string;
  password: string;
  matchPassword(password: string): Promise<boolean>;
}

export default IAuthenticate;
