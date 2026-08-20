export type UserCurrency =
  | "USD"
  | "EUR"
  | "GBP"
  | "ARS";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  avatarUrl: string | null;
  country: string | null;
  timezone: string | null;
  currency: UserCurrency;
  createdAt: string;
}

export interface UpdateUserInput {
  username?: string;
  avatarUrl?: string | null;
  country?: string | null;
  timezone?: string | null;
  currency?: UserCurrency;
}