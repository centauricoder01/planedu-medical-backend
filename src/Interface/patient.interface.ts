import { Document } from "mongoose";

export interface IMedicine {
  id: string;
  name: string;
}
interface IPatient extends Document {
  patientId: number;
  name: string;
  phoneNo: number;
  emailId: string;
  dob: string;
  gender: string;
  age: number;
  address: string;
  services: string;
  price: number;
  treatmentStatus: "Completed" | "Ongoing" | "Starting";
  medicine: IMedicine[];
  date: string;
  payment: "Done" | "Pending";
}

export default IPatient;
