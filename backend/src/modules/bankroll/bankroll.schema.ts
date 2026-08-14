import { z } from "zod";

export const createBankrollSchema = z.object({
  startingBalance: z
    .number()
    .nonnegative(
      "Starting balance cannot be negative"
    ),
});

export const createTransactionSchema = z.object({
  type: z.enum([
    "DEPOSIT",
    "WITHDRAWAL",
  ]),

  amount: z
    .number()
    .positive(
      "Amount must be greater than zero"
    ),

  description: z
    .string()
    .trim()
    .max(
      200,
      "Description must be at most 200 characters"
    )
    .optional(),
});

export type CreateBankrollInput =
  z.infer<typeof createBankrollSchema>;

export type CreateTransactionInput =
  z.infer<typeof createTransactionSchema>;