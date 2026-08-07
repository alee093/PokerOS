import type { Request, Response } from "express";
import { z } from "zod";

import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  createTournament,
  deleteTournament,
  getTournamentById,
  getUserTournaments,
  updateTournament,
} from "./tournament.service.js";

import { createTournamentSchema } from "./tournament.schema.js";

export const createTournamentController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createTournamentSchema.parse(req.body);

    const tournament = await createTournament(
      req.user!.id,
      data
    );

    res.status(201).json(tournament);
  }
);

export const getUserTournamentsController = asyncHandler(
  async (req: Request, res: Response) => {
    const tournaments = await getUserTournaments(
      req.user!.id
    );

    res.json(tournaments);
  }
);

export const getTournamentByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const tournament = await getTournamentById(
      req.user!.id,
      id
    );

    res.json(tournament);
  }
);

export const updateTournamentController = asyncHandler(
  async (req: Request, res: Response) => {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const data = createTournamentSchema.parse(req.body);

    const tournament = await updateTournament(
      req.user!.id,
      id,
      data
    );

    res.json(tournament);
  }
);

export const deleteTournamentController = asyncHandler(
  async (req: Request, res: Response) => {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    await deleteTournament(
      req.user!.id,
      id
    );

    res.sendStatus(204);
  }
);