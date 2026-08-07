import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";

import { getCurrentUser } from "./user.service.js";

export const me = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getCurrentUser(req.user!.id);

    res.json(user);
  }
);