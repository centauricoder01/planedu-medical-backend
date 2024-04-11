import mongoose, { Schema } from "mongoose";
import IServices from "../Interface/services.interface";

const servicesSchema = new Schema(
  {
    services: {
      type: String,
      required: [true, "Services is Required"],
    },
    basePrice: {
      type: Number,
      required: [true, "Price is Required"],
    },
    noOfServices: {
      type: Number,
      required: [true, "No of Services is Required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Services = mongoose.model<IServices>("Services", servicesSchema);
