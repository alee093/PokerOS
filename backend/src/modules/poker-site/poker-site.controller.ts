import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { getPokerSites } from "./poker-site.service.js";

export const getPokerSitesController = asyncHandler(
  async (_req: Request, res: Response) => {
    const sites = await getPokerSites();

    res.json(sites);
  }
);