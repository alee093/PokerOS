export type TournamentFormat =
  | "FREEZEOUT"
  | "REENTRY"
  | "PKO"
  | "MYSTERY_BOUNTY"
  | "SATELLITE";

export type GameType =
  | "NLH"
  | "PLO"
  | "PLO5"
  | "MIXED"
  | "OTHER";

export type TournamentSpeed =
  | "REGULAR"
  | "TURBO"
  | "HYPER"
  | "DEEPSTACK";

export type Currency =
  | "USD"
  | "EUR"
  | "GBP"
  | "ARS";

export interface Tournament {
  id: string;
  siteId: string;
  name: string;
  format: TournamentFormat;
  gameType: GameType;
  speed: TournamentSpeed;
  currency: Currency;
  entries: number;
  buyIn: string;
  fee: string;
  totalCost: string;
  isBounty: boolean;
  bountyCollected: string;
  prize: string;
  profit: string;
  position: number | null;
  playersCount: number | null;
  isITM: boolean;
  startedAt: string;
  finishedAt: string | null;
  duration: number | null;
  notes: string | null;
  site?: {
    id: string;
    name: string;
    logoUrl?: string | null;
  };
}

export interface CreateTournamentInput {
  siteId: string;
  name: string;
  format: TournamentFormat;
  gameType: GameType;
  speed: TournamentSpeed;
  currency: Currency;
  entries: number;
  buyIn: number;
  fee: number;
  isBounty: boolean;
  bountyCollected: number;
  prize: number;
  position?: number;
  playersCount?: number;
  startedAt: string;
  finishedAt?: string;
  notes?: string;
}