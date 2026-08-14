import { api } from "./api";

import type {
  StatisticsOverview,
} from "../types/statistics";

export async function getStatisticsOverview(): Promise<StatisticsOverview> {
  const response =
    await api.get<StatisticsOverview>(
      "/statistics/overview"
    );

  return response.data;
}