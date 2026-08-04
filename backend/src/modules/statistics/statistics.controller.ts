import type { Request, Response } from "express";

import { getStatisticsOverview } from "./statistics.service.js";

export async function getStatisticsOverviewController(
  req: Request,
  res: Response
) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const statistics =
      await getStatisticsOverview(user.id);

    return res.json(statistics);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });

  }
}