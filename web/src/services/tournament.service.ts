import { api } from "./api";

import type {
  CreateTournamentInput,
  Tournament,
} from "../types/tournament";

export async function getTournaments(): Promise<Tournament[]> {
  const response = await api.get<Tournament[]>(
    "/tournaments"
  );

  return response.data;
}

export async function createTournament(
  data: CreateTournamentInput
): Promise<Tournament> {
  const response = await api.post<Tournament>(
    "/tournaments",
    data
  );

  return response.data;
}

export async function getTournamentById(
  id: string
): Promise<Tournament> {
  const response = await api.get<Tournament>(
    `/tournaments/${id}`
  );

  return response.data;
}

export async function updateTournament(
  id: string,
  data: CreateTournamentInput
): Promise<Tournament> {
  const response = await api.patch<Tournament>(
    `/tournaments/${id}`,
    data
  );

  return response.data;
}

export async function deleteTournament(
  id: string
): Promise<void> {
  await api.delete(
    `/tournaments/${id}`
  );
}