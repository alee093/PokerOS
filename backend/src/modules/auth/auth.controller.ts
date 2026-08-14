import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";

import { setAuthCookie, clearAuthCookie } from "../../utils/auth-cookie.js";

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

    setAuthCookie(res, result.token);

    res.json({
      user: result.user,
    });
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

export async function logout(
  _req: Request,
  res: Response
) {
  clearAuthCookie(res);

  return res.json({
    message: "Logged out successfully",
  });
}

export async function me(
  req: Request,
  res: Response
) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  return res.json({
    user,
  });
}