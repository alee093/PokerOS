import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { getPokerSitesController } from "./poker-site.controller.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getPokerSitesController
);

export default router;