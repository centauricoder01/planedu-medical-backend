import mongoose, { Schema } from "mongoose";
import IPatient from "../Interface/patient.interface";
import { IMedicine } from "../Interface/patient.interface";

const MedicineSchema = new Schema<IMedicine>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  // Add more fields as needed
});
const patientSchema = new Schema(
  {
    patientId: {
      type: Number,
      required: [true, "Patient Id is Required"],
      trim: true,
      index: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    phoneNo: {
      type: Number,
      required: [true, "Phone No is Required"],
    },
    emailId: {
      type: String,
    },
    dob: {
      type: String,
      required: [true, "DOB is Required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is Required"],
    },
    age: {
      type: Number,
      required: [true, "Age is Required"],
    },
    address: {
      type: String,
      required: [true, "Address is Required"],
    },
    services: {
      type: String,
      required: [true, "Services is Required"],
    },
    price: {
      type: Number,
      required: [true, "Price is Required"],
    },
    treatmentStatus: {
      type: String,
      default: "Starting",
      enum: ["Completed", "Ongoing", "Starting"],
      required: [true, "Treatment status is required"],
    },
    medicine: { type: [MedicineSchema], required: true },
    payment: {
      type: String,
      default: "pending",
      enum: ["Done", "Pending"],
      required: [true, "Treatment status is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = mongoose.model<IPatient>("Patient", patientSchema);
