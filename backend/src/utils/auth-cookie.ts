import type { Response } from "express";

const COOKIE_NAME = "pokeros_token";

const isProduction =
  process.env.NODE_ENV === "production";

export function setAuthCookie(
  res: Response,
  token: string
) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearAuthCookie(
  res: Response
) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });
}

export { COOKIE_NAME };