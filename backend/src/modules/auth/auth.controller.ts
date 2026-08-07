import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  loginSchema,
  registerSchema,
} from "./auth.schema.js";

import {
  loginUser,
  registerUser,
} from "./auth.service.js";

import { verifyEmailToken } from "./services/verification.service.js";

export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);

    const user = await registerUser(data);

    res.status(201).json(user);
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

    res.json(result);
  }
);

export const verifyEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      throw new Error("Invalid token");
    }

    await verifyEmailToken(token);

    res.json({
      message: "Email verified successfully",
    });
  }
);