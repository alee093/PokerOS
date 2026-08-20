export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  country: string | null;
  timezone: string | null;
  currency: "USD" | "EUR" | "GBP" | "ARS";
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}