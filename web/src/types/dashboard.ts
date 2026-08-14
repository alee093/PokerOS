export interface DashboardBankroll {
  current: number;
  starting: number;
  deposits: number;
  withdrawals: number;
}

export interface DashboardThisMonth {
  tournaments: number;
  buyIns: number;
  prizes: number;
  profit: number;
}

export interface DashboardLifetime {
  totalTournaments: number;
  totalProfit: number;
  roi: number;
  abi: number;
  itm: number;
  hoursPlayed: number;
}

export interface RecentTournament {
  id: string;
  name: string;
  profit: number;
  startedAt: string;
}

export interface BankrollHistoryPoint {
  date: string;
  balance: number;
}

export interface DashboardResponse {
  bankroll: DashboardBankroll | null;
  thisMonth: DashboardThisMonth;
  lifetime: DashboardLifetime;
  recentTournaments: RecentTournament[];
  bankrollHistory: BankrollHistoryPoint[];
  profitHistory: ProfitHistoryPoint[];
}

export interface ProfitHistoryPoint {
  date: string;
  profit: number;
  cumulativeProfit: number;
}