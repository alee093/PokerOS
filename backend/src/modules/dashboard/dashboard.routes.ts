import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import { getDashboardController } from "./dashboard.controller.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getDashboardController
);

export default router;