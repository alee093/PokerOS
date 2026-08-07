import { z } from "zod";

export const createBankrollSchema = z.object({
  startingBalance: z.coerce
    .number()
    .positive("Starting balance must be greater than zero"),
});

export type CreateBankrollInput = z.infer<typeof createBankrollSchema>;

import { BankrollTransactionType } from "@prisma/client";

export const createTransactionSchema = z.object({
  type: z.nativeEnum(BankrollTransactionType),

  amount: z.coerce
    .number()
    .positive("Amount must be greater than zero"),

  description: z
    .string()
    .trim()
    .max(200)
    .optional(),
});

export type CreateTransactionInput =
  z.infer<typeof createTransactionSchema>;