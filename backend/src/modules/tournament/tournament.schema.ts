import { z } from "zod";

export const createTournamentSchema = z.object({
  siteId: z.string().uuid(),

  name: z.string().trim().min(1).max(100),

  format: z.enum([
    "FREEZEOUT",
    "REENTRY",
    "PKO",
    "MYSTERY_BOUNTY",
    "SATELLITE",
  ]),

  gameType: z.enum([
    "NLH",
    "PLO",
    "PLO5",
    "MIXED",
    "OTHER",
  ]),

  speed: z.enum([
    "REGULAR",
    "TURBO",
    "HYPER",
    "DEEPSTACK",
  ]),

  currency: z.enum([
    "USD",
    "EUR",
    "GBP",
    "ARS",
  ]),

  entries: z.number().int().min(1).default(1),

  buyIn: z.number().nonnegative(),

  fee: z.number().nonnegative(),

  isBounty: z.boolean().default(false),

  bountyCollected: z.number().nonnegative().default(0),

  prize: z.number().nonnegative(),

  position: z.number().int().positive().optional(),

  playersCount: z.number().int().min(2).optional(),

  startedAt: z.coerce.date(),

  finishedAt: z.coerce.date().optional(),

  notes: z.string().trim().max(1000).optional(),
}).refine(
  (data) =>
    !data.finishedAt || data.finishedAt >= data.startedAt,
  {
    message: "finishedAt must be after startedAt",
    path: ["finishedAt"],
  }
);

export type CreateTournamentInput =
  z.infer<typeof createTournamentSchema>;