import { Authenticate } from "../models/authtication.models";
import ApiError from "../utils/apiError.utils";
import { Request, Response, text } from "express";
import ApiResponse from "../utils/apiResponse.utils";
import { asyncHandler } from "../utils/asyncHandler.utils";
import Joi from "joi";
import IAuthenticate from "../Interface/authenticate.interface";
import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/mailer";

const schema = Joi.object<IAuthenticate>({
  name: Joi.string().required(),
  userId: Joi.string().required(),
  password: Joi.string().required(),
});

export const addUser = asyncHandler(async (req: Request, res: Response) => {
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

    const findUserById = await Authenticate.findOne({ userId: value.userId });

    if (findUserById) {
      throw new ApiError(400, "User Error", "User Already exist");
    }

    const newUser = new Authenticate(value);

    const savedUser = await newUser.save();

    if (!savedUser) {
      throw new ApiError(
        500,
        "Internal Server Error",
        "Something went wrong while registering the user"
      );
    }

    new ApiResponse(201, "SUCCESS!", "User added successfully", savedUser, res);
  } catch (error) {
    console.error("Error adding User:", error);
    throw new ApiError(
      500,
      "Internal Server Error",
      "Something went wrong while registering the user",
      error
    );
  }
});

export const verifyUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId, password } = req.body;

    if (!userId && !password) {
      throw new ApiError(400, "username or email is required");
    }

    const findUserById = await Authenticate.findOne({ userId });

    if (!findUserById) {
      throw new ApiError(404, "User Does'nt exist", "User Does'nt exist");
    }

    if (findUserById.password !== password) {
      throw new ApiError(
        401,
        "Unauthorized",
        "You are not authorized to make these changes"
      );
    }

    const userData = {
      verificationId: findUserById._id,
    };
    // const checkPassword: boolean = await findUserById.matchPassword(password);
    new ApiResponse(
      201,
      "SUCCESS!",
      "User Fetched successfully",
      userData,
      res
    );
  } catch (error) {
    throw new ApiError(
      500,
      "Internal Server Error",
      "Something went wrong while registering the user",
      error
    );
  }
});

export const forgetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const email = req.body;

      const sendMail = Object.keys(email);

      const fromemail = process.env.MAIL_USERNAME;
      const pass = process.env.MAIL_PASSWORD;

      const findUser = await Authenticate.find();

      if (findUser.length === 0) {
        throw new ApiError(
          500,
          "Internal Server Error",
          "Something went wrong while registering the user"
        );
      }

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: fromemail,
          pass: pass,
        },
      });

      let mailOptions: Options = {
        from: `"cityeduguide" <${fromemail}>`,
        to: sendMail[0],
        subject: "Verification Mail",
        text: `  and Password : ${findUser[0].password}`,
        html: `<h1>Hey There,</h1>
        <p>Here is Your UserID : <b>${findUser[0].userId}</b></p>
        <p>Here is Your Password : <b>${findUser[0].password}</b></p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.send({ message: error });
        } else {
          res.send({ message: info.response });
        }
      });
    } catch (error) {
      throw new ApiError(
        500,
        "Internal Server Error",
        "Something went wrong while registering the user",
        error
      );
    }
  }
);
