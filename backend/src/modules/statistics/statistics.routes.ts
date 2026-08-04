import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import {
  getStatisticsOverviewController,
} from "./statistics.controller.js";

const router = Router();

router.get(
  "/overview",
  authMiddleware,
  getStatisticsOverviewController
);

export default router;