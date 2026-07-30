import type { Request, Response } from "express";
import { getCurrentUser } from "./user.service.js";

export async function me(
  req: Request,
  res: Response
) {
  const user = await getCurrentUser(req.user!.id);

  res.json(user);
}