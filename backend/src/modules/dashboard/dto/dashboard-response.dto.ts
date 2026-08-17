export interface DashboardResponseDto {
  bankroll: {
    current: number;
    starting: number;
    deposits: number;
    withdrawals: number;
  } | null;

  thisMonth: {
    tournaments: number;
    buyIns: number;
    prizes: number;
    profit: number;
  };

  lifetime: {
    totalTournaments: number;
    totalProfit: number;
    roi: number;
    abi: number;
    itm: number;
    hoursPlayed: number;
  };

  recentTournaments: {
    id: string;
    name: string;
    profit: number;
    startedAt: Date;
  }[];

  bankrollHistory: {
    date: Date;
    balance: number;
    type: string;
  }[];

  profitHistory: {
    date: Date;
    profit: number;
    cumulativeProfit: number;
  }[];
}