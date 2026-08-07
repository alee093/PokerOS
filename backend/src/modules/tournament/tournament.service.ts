import { prisma } from "../../lib/prisma.js";

import type { CreateTournamentInput } from "./tournament.schema.js";

import {
  calculateDuration,
  calculateITM,
  calculateProfit,
  calculateTotalCost,
} from "./services/tournament-calculator.service.js";

import { NotFoundError } from "../../errors/NotFoundError.js";

export async function createTournament(
  userId: string,
  data: CreateTournamentInput
) {
  const totalCost = calculateTotalCost(
    data.buyIn,
    data.fee,
    data.entries
  );

  const profit = calculateProfit(
    data.prize,
    totalCost,
    data.bountyCollected
  );

  const isITM = calculateITM(
    data.prize,
    data.bountyCollected
  );

  const duration = calculateDuration(
    data.startedAt,
    data.finishedAt
  );

  const tournament = await prisma.tournament.create({
    data: {
      userId,

      siteId: data.siteId,

      name: data.name,

      format: data.format,

      gameType: data.gameType,

      speed: data.speed,

      currency: data.currency,

      entries: data.entries,

      buyIn: data.buyIn,

      fee: data.fee,

      totalCost,

      isBounty: data.isBounty,

      bountyCollected: data.bountyCollected,

      prize: data.prize,

      profit,

      isITM,

      startedAt: data.startedAt,

      ...(data.position !== undefined && {
        position: data.position,
      }),

      ...(data.playersCount !== undefined && {
        playersCount: data.playersCount,
      }),

      ...(data.finishedAt !== undefined && {
        finishedAt: data.finishedAt,
      }),

      ...(duration !== null && {
        duration,
      }),

      ...(data.notes !== undefined && {
        notes: data.notes,
      }),
    },
  });

  return tournament;
}

export async function getUserTournaments(
  userId: string
) {
  return prisma.tournament.findMany({
    where: {
      userId,
    },

    include: {
      site: true,
    },

    orderBy: {
      startedAt: "desc",
    },
  });
}

export async function getTournamentById(
  userId: string,
  tournamentId: string
) {
  const tournament = await prisma.tournament.findFirst({
    where: {
      id: tournamentId,
      userId,
    },

    include: {
      site: true,
    },
  });

  if (!tournament) {
    throw new NotFoundError("Tournament not found");
  }

  return tournament;
}

export async function deleteTournament(
  userId: string,
  tournamentId: string
) {
  const tournament = await prisma.tournament.findFirst({
    where: {
      id: tournamentId,
      userId,
    },
  });

  if (!tournament) {
    throw new NotFoundError("Tournament not found");
  }

  await prisma.tournament.delete({
    where: {
      id: tournament.id,
    },
  });
}

export async function updateTournament(
  userId: string,
  tournamentId: string,
  data: CreateTournamentInput
) {
  const tournament = await prisma.tournament.findFirst({
    where: {
      id: tournamentId,
      userId,
    },
  });

  if (!tournament) {
    throw new NotFoundError("Tournament not found");
  }

  const totalCost = calculateTotalCost(
    data.buyIn,
    data.fee,
    data.entries
  );

  const profit = calculateProfit(
    data.prize,
    totalCost,
    data.bountyCollected
  );

  const isITM = calculateITM(
    data.prize,
    data.bountyCollected
  );

  const duration = calculateDuration(
    data.startedAt,
    data.finishedAt
  );

  return prisma.tournament.update({
    where: {
      id: tournament.id,
    },

    data: {
      siteId: data.siteId,

      name: data.name,

      format: data.format,

      gameType: data.gameType,

      speed: data.speed,

      currency: data.currency,

      entries: data.entries,

      buyIn: data.buyIn,

      fee: data.fee,

      totalCost,

      isBounty: data.isBounty,

      bountyCollected: data.bountyCollected,

      prize: data.prize,

      profit,

      isITM,

      startedAt: data.startedAt,

      ...(data.position !== undefined && {
        position: data.position,
      }),

      ...(data.playersCount !== undefined && {
        playersCount: data.playersCount,
      }),

      ...(data.finishedAt !== undefined && {
        finishedAt: data.finishedAt,
      }),

      ...(duration !== null && {
        duration,
      }),

      ...(data.notes !== undefined && {
        notes: data.notes,
      }),
    },
  });
}