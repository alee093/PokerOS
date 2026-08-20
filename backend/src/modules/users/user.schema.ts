import { z } from "zod";

export const updateUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .optional(),

  avatarUrl: z
    .string()
    .url("Avatar must be a valid URL")
    .nullable()
    .optional(),

  country: z
    .string()
    .trim()
    .max(100, "Country must be at most 100 characters")
    .nullable()
    .optional(),

  timezone: z
    .string()
    .trim()
    .max(100, "Timezone must be at most 100 characters")
    .nullable()
    .optional(),

  currency: z
    .enum([
      "USD",
      "EUR",
      "GBP",
      "ARS",
    ])
    .optional(),
});

export type UpdateUserInput =
  z.infer<typeof updateUserSchema>;