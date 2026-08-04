export interface TournamentStatisticsData {
  buyIn: number;

  fee: number;

  totalCost: number;

  prize: number;

  bountyCollected: number;

  profit: number;

  entries: number;

  duration: number | null;

  isITM: boolean;

  startedAt: Date;
}