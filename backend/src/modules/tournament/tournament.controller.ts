import type { Request, Response } from "express";

import { createTournament, getUserTournaments, getTournamentById, deleteTournament, updateTournament } from "./tournament.service.js";
import { createTournamentSchema } from "./tournament.schema.js";
import { z } from "zod";

export async function createTournamentController(
  req: Request,
  res: Response
) {
  try {
    const parsed = createTournamentSchema.parse(req.body);

    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const tournament = await createTournament(
      user.id,
      parsed
    );

    res.status(201).json(tournament);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getUserTournamentsController(
  req: Request,
  res: Response
) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const tournaments =
      await getUserTournaments(user.id);

    res.json(tournaments);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });

  }
}

export async function getTournamentByIdController(
  req: Request,
  res: Response
) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const tournament = await getTournamentById(
      user.id,
      id
    );

    res.json(tournament);

  } catch (error) {

    console.error(error);

    res.status(404).json({
      message: error instanceof Error
        ? error.message
        : "Tournament not found",
    });

  }
}

export async function deleteTournamentController(
  req: Request,
  res: Response
) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    await deleteTournament(user.id, id);

    res.sendStatus(204);

  } catch (error) {
  console.error(error);

    if (
      error instanceof Error &&
      error.message === "Tournament not found"
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function updateTournamentController(
  req: Request,
  res: Response
) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }


    const paramsSchema = z.object({
      id: z.uuid(),
    });


    const { id } = paramsSchema.parse(req.params);


    const data = createTournamentSchema.parse(
      req.body
    );


    const tournament = await updateTournament(
      user.id,
      id,
      data
    );


    return res.json(tournament);


  } catch (error) {

    console.error(error);


    if (
      error instanceof Error &&
      error.message === "Tournament not found"
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }


    return res.status(500).json({
      message: "Internal server error",
    });
  }
}