import { Document } from "mongoose";

interface IServices extends Document {
  services: string;
  noOfServices: Number;
  basePrice: Number;
}

export default IServices;
