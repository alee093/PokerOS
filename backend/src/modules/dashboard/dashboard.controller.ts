import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";

import { getDashboard } from "./dashboard.service.js";

export const getDashboardController = asyncHandler(
  async (req: Request, res: Response) => {

    const dashboard = await getDashboard(req.user!.id);

    res.json(dashboard);

  }
);