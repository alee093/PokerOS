import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { ZodError } from "zod";

import { AppError } from "../errors/AppError.js";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      message:
        "Please check the information you entered",

      errors: error.issues.map(
        (issue) => ({
          field:
            issue.path.join("."),
          message:
            issue.message,
        })
      ),
    });
  }

  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({
        message: error.message,
      });
  }

  return res.status(500).json({
    message:
      "Something went wrong. Please try again later.",
  });
}