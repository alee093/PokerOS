import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { api } from "../services/api.js";

import type {
  AuthUser,
  LoginInput,
} from "../types/auth.js";

import { getCurrentUser } from "../services/user.service.js";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadUser(): Promise<void> {
    try {
      const user =
        await getCurrentUser();

      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(
    data: LoginInput
  ): Promise<void> {
    await api.post("/auth/login", data);

    await loadUser();
  }

  async function logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function refreshUser(): Promise<void> {
    await loadUser();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated:
          user !== null,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}