import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/dashboard.service";

import BankrollChart from "./components/charts/BankrollChart";
import ProfitChart from "./components/charts/ProfitChart";

import type { DashboardResponse } from "../../types/dashboard";

import BankrollSummary from "./components/BankrollSummary";
import MonthlySummary from "./components/MonthlySummary";
import LifetimeStats from "./components/LifetimeStats";
import RecentTournaments from "./components/RecentTournaments";
import BankrollHistory from "./components/BankrollHistory";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();

        setDashboard(data);
      } catch {
        setError(
          "Could not load dashboard"
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  async function handleLogout() {
    await logout();

    navigate(
      "/auth/login",
      {
        replace: true,
      }
    );
  }

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!dashboard) {
    return null;
  }

  return (
    <main>
      <header>
        <h1>
          Welcome, {user?.username}
        </h1>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <BankrollSummary
        bankroll={dashboard.bankroll}
      />

      <MonthlySummary
        thisMonth={dashboard.thisMonth}
      />

      <LifetimeStats
        lifetime={dashboard.lifetime}
      />

      <RecentTournaments
        tournaments={
          dashboard.recentTournaments
        }
      />

      <BankrollHistory
        history={
          dashboard.bankrollHistory
        }
      />

      <BankrollChart
        history={dashboard.bankrollHistory}
      />

      <ProfitChart
        history={
          dashboard.profitHistory
        }
      />
      <button
        type="button"
        onClick={() =>
          navigate("/tournaments")
        }
      >
        Tournaments
      </button>
    </main>
  );
}