import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";

import { getStatisticsOverview } from "./statistics.service.js";

export const getStatisticsOverviewController = asyncHandler(
  async (req: Request, res: Response) => {
    const statistics = await getStatisticsOverview(
      req.user!.id
    );

    res.json(statistics);
  }
);