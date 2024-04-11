import { Services } from "../models/services.models";
import IServices from "../Interface/services.interface";
import { asyncHandler } from "../utils/asyncHandler.utils";
import { Request, Response } from "express";
import ApiError from "../utils/apiError.utils";
import ApiResponse from "../utils/apiResponse.utils";
import Joi from "joi";

const schema = Joi.object<IServices>({
  services: Joi.string().required(),
  noOfServices: Joi.number().required(),
  basePrice: Joi.number().required(),
});

export const addServices = asyncHandler(async (req: Request, res: Response) => {
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

    const newServices = new Services(value);

    const savedServices = await newServices.save();

    if (!savedServices) {
      throw new ApiError(
        500,
        "Internal Server Error",
        "Something went wrong while registering the user"
      );
    }

    new ApiResponse(
      201,
      "SUCCESS!",
      "Services added successfully",
      savedServices,
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
});

export const getServices = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getAllServices = await Services.find();

    if (getAllServices.length === 0) {
      throw new ApiError(
        500,
        "Internal Server Error",
        "Something went wrong while registering the user"
      );
    }

    new ApiResponse(
      201,
      "SUCCESS!",
      "All services fetched successfully",
      getAllServices,
      res
    );

    return;
  } catch (error) {
    console.error("Error adding patient:", error);
    throw new ApiError(
      500,
      "Internal Server Error",
      "Something went wrong while registering the user",
      error
    );
  }
});

export const deleteServices = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;

      const serviceFindById = await Services.findById(userId);

      if (!serviceFindById) {
        throw new ApiError(500, "Api Error", "please Provide correct Id");
      }

      const deleteOneServices = await Services.deleteOne({ _id: userId });

      if (deleteOneServices.deletedCount === 1) {
        new ApiResponse(
          201,
          "SUCCESS!",
          "Service deleted successfully",
          deleteOneServices,
          res
        );
      } else {
        throw new ApiError(
          500,
          "Api Error",
          "Internal server error, while deleteing the services"
        );
      }
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

export const updateServices = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const serviceId = req.params.patientId;
      const serviceUpdate = req.body;

      const updatedService = await Services.findByIdAndUpdate(
        serviceId,
        { $set: serviceUpdate },
        { new: true }
      );

      if (!updatedService) {
        throw new ApiError(500, "Input Error", "Service not found");
      }

      new ApiResponse(
        201,
        "SUCCESS!",
        "Service updated successfully",
        updatedService,
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
