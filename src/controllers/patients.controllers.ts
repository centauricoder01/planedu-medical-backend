import { Patient } from "../models/patients.models";
import { Request, Response } from "express";
import ApiError from "../utils/apiError.utils";
import ApiResponse from "../utils/apiResponse.utils";
import { asyncHandler } from "../utils/asyncHandler.utils";
import Joi from "joi";
import IPatient from "../Interface/patient.interface";
import { UniqueId } from "../models/unique.models";

const medicineSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

const schema = Joi.object<IPatient>({
  name: Joi.string().required(),
  phoneNo: Joi.number().required(),
  emailId: Joi.string().email().allow(""),
  dob: Joi.string().required(),
  gender: Joi.string().required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
  services: Joi.string().required(),
  price: Joi.number().required(),
  treatmentStatus: Joi.string()
    .valid("Completed", "Ongoing", "Starting")
    .required(),
  medicine: Joi.array().items(medicineSchema).required(),
  payment: Joi.string().valid("Done", "Pending").required(),
});

export const addPatient = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { error, value } = schema.validate(req.body);
      if (error) {
        throw new ApiError(
          400,
          "Joi Validation Failed",
          "Please send all the info.",
          error.message
        );
      }

      // PATIENT ID LOGIC
      const findUniqueId = await UniqueId.find();

      let patient_Unique_Id = 1000;

      if (findUniqueId.length === 0) {
        const first_Unique_id = new UniqueId({ uniqueId: patient_Unique_Id });
        await first_Unique_id.save();
      } else {
        await UniqueId.findByIdAndUpdate(findUniqueId[0]._id, {
          uniqueId: findUniqueId[0].uniqueId + 1,
        });

        patient_Unique_Id = findUniqueId[0].uniqueId + 1;
       
      }

      // SAVING PATIENT

      value.patientId = patient_Unique_Id;
      const newPatient = new Patient(value);

      const savedPatient = await newPatient.save();

      if (!savedPatient) {
        throw new ApiError(
          500,
          "Internal Server Error",
          "Something went wrong while registering the user"
        );
      }

      new ApiResponse(
        201,
        "SUCCESS!",
        "Patient added successfully",
        savedPatient,
        res
      );
    } catch (error) {
      console.error("Error adding patient:", error);
      throw new ApiError(
        500,
        "Internal Server Error",
        "Something went wrong while registering the user",
        error
      );
    }
  }
);

export const getPatient = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const getAllPatient = await Patient.find();

      if (getAllPatient.length === 0) {
        throw new ApiError(
          500,
          "Internal Server Error",
          "Something went wrong while Getting the patient"
        );
      }

      new ApiResponse(
        201,
        "SUCCESS!",
        "All Patient fetched successfully",
        getAllPatient,
        res
      );

      return;
    } catch (error) {
      console.error("Error Fetching patient:", error);
      throw new ApiError(
        500,
        "Internal Server Error",
        "Something went wrong while Getting the Patient",
        error
      );
    }
  }
);
