import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import {
  createBankrollController,
  getBankrollController,
  createTransactionController,
  getBankrollTransactionsController,
} from "./bankroll.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createBankrollController
);

router.get(
  "/",
  authMiddleware,
  getBankrollController
);

router.post(
  "/transactions",
  authMiddleware,
  createTransactionController
);

router.get(
  "/transactions",
  authMiddleware,
  getBankrollTransactionsController
);

export default router;