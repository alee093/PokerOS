import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../errors/UnauthorizedError.js";

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
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(
      new UnauthorizedError("Authentication required")
    );
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return next(
      new UnauthorizedError("Invalid token")
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