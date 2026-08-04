import { z } from "zod";

/**
 * GET /statistics/overview
 *
 * This endpoint doesn't receive body,
 * params or query parameters.
 */
export const statisticsOverviewSchema = z.object({});