import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  createBankrollSchema,
  createTransactionSchema,
} from "./bankroll.schema.js";

import {
  createBankroll,
  createTransaction,
  getBankrollSummary,
} from "./bankroll.service.js";

export const createBankrollController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createBankrollSchema.parse(req.body);

    const bankroll = await createBankroll(
      req.user!.id,
      data
    );

    res.status(201).json(bankroll);
  }
);

export const getBankrollController = asyncHandler(
  async (req: Request, res: Response) => {
    const bankroll = await getBankrollSummary(
      req.user!.id
    );

    res.json(bankroll);
  }
);

export const createTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createTransactionSchema.parse(req.body);

    const transaction = await createTransaction(
      req.user!.id,
      data
    );

    res.status(201).json(transaction);
  }
);