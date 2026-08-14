import type {
  NextFunction,
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { COOKIE_NAME } from "../utils/auth-cookie.js";

const JWT_SECRET = process.env.JWT_SECRET!;

interface JwtPayload {
  id: string;
  email: string;
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    return next(
      new UnauthorizedError(
        "Authentication required"
      )
    );
  }

  try {
    const payload = jwt.verify(
      token,
      JWT_SECRET
    ) as JwtPayload;

    req.user = {
      id: payload.id,
      email: payload.email,
    };

    next();
  } catch {
    next(
      new UnauthorizedError(
        "Invalid or expired token"
      )
    );
  }
}