import { Document } from "mongoose";

interface IUniqueId extends Document {
  uniqueId: number;
}

export default IUniqueId;
