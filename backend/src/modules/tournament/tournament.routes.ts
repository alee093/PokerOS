import { Router } from "express";

import { createTournamentController, getUserTournamentsController, getTournamentByIdController, deleteTournamentController, updateTournamentController } from "./tournament.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js"

const router = Router();

router.get(
  "/",
  authMiddleware,
  getUserTournamentsController
);

router.get(
  "/:id",
  authMiddleware,
  getTournamentByIdController
);
router.post(
  "/",
  authMiddleware,
  createTournamentController
);
router.delete(
  "/:id",
  authMiddleware,
  deleteTournamentController
);
router.patch(
  "/:id",
  authMiddleware,
  updateTournamentController
);


export default router;