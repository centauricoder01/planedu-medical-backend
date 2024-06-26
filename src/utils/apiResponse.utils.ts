import { Response } from "express";

class ApiResponse {
  statusCode: number;
  successCode: string;
  successMessage: string;
  data: any;

  constructor(
    statusCode: number = 200,
    successCode: string = "SUCCESS!",
    successMessage: string = "No Success message found!",
    data: any = {},
    res: Response
  ) {
    this.statusCode = statusCode | 200;
    this.successCode = successCode;
    this.successMessage = successMessage;
    this.data = data;
    res.status(statusCode).json({ successCode, successMessage, data });
  }
}

export default ApiResponse;
