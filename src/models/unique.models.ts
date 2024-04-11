import mongoose, { Schema } from "mongoose";
import IUniqueId from "../Interface/uniqueId";

const uniqueIdSchema = new Schema<IUniqueId>({
  uniqueId: {
    type: Number,
    unique: true,
    required: [true, "Unique Id is required"],
  },
});

export const UniqueId = mongoose.model<IUniqueId>("UniqueId", uniqueIdSchema);
