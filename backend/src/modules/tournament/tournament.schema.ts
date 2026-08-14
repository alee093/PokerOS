import { z } from "zod";

const tournamentDateSchema = z.coerce
  .date()
  .refine(
    (date) => date.getFullYear() >= 2000,
    {
      message:
        "Tournament date must be after year 2000",
    }
  )
  .refine(
    (date) =>
      date.getTime() <=
      Date.now() + 24 * 60 * 60 * 1000,
    {
      message:
        "Tournament date cannot be in the future",
    }
  );

export const createTournamentSchema = z
  .object({
    siteId: z
      .string()
      .uuid(
        "Select a valid poker site"
      ),

    name: z
      .string()
      .trim()
      .min(
        1,
        "Tournament name is required"
      )
      .max(
        100,
        "Tournament name must be at most 100 characters"
      ),

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

    entries: z
      .number()
      .int(
        "Entries must be a whole number"
      )
      .min(
        1,
        "Entries must be at least 1"
      )
      .default(1),

    buyIn: z
      .number()
      .nonnegative(
        "Buy-in cannot be negative"
      ),

    fee: z
      .number()
      .nonnegative(
        "Fee cannot be negative"
      ),

    isBounty: z
      .boolean()
      .default(false),

    bountyCollected: z
      .number()
      .nonnegative(
        "Bounty collected cannot be negative"
      )
      .default(0),

    prize: z
      .number()
      .nonnegative(
        "Prize cannot be negative"
      ),

    position: z
      .number()
      .int(
        "Position must be a whole number"
      )
      .positive(
        "Position must be greater than 0"
      )
      .optional(),

    playersCount: z
      .number()
      .int(
        "Players count must be a whole number"
      )
      .min(
        2,
        "Players count must be at least 2"
      )
      .optional(),

    startedAt:
      tournamentDateSchema,

    finishedAt:
      tournamentDateSchema.optional(),

    notes: z
      .string()
      .trim()
      .max(
        1000,
        "Notes must be at most 1000 characters"
      )
      .optional(),
  })

  .refine(
    (data) =>
      !data.finishedAt ||
      data.finishedAt >=
        data.startedAt,
    {
      message:
        "Finished time must be after the start time",
      path: ["finishedAt"],
    }
  )

  .refine(
    (data) =>
      !data.position ||
      !data.playersCount ||
      data.position <=
        data.playersCount,
    {
      message:
        "Position cannot be greater than the number of players",
      path: ["position"],
    }
  )

  .refine(
    (data) =>
      data.isBounty ||
      data.bountyCollected === 0,
    {
      message:
        "Bounty collected must be 0 for non-bounty tournaments",
      path: ["bountyCollected"],
    }
  );

export type CreateTournamentInput =
  z.infer<
    typeof createTournamentSchema
  >;