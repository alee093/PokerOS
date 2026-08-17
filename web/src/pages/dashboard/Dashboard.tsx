import { useEffect, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
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

import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();

        setDashboard(data);
      } catch {
        setError("Could not load dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <p className="dashboard-card__empty">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="dashboard-card__empty">{error}</p>;
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Welcome, {user?.username ?? "Player"}</h1>

        <div className="dashboard__header-actions">
          <span className="dashboard__range">
            This Month
            <ChevronDown size={16} />
          </span>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/tournaments/new")}
          >
            <Plus size={16} />
            Add Tournament
          </button>
        </div>
      </header>

      <div className="dashboard__grid-2">
        <BankrollSummary bankroll={dashboard.bankroll} />
        <MonthlySummary thisMonth={dashboard.thisMonth} />
      </div>

      <LifetimeStats lifetime={dashboard.lifetime} />

      <BankrollChart history={dashboard.bankrollHistory} />

      <ProfitChart history={dashboard.profitHistory} />

      <div className="dashboard__grid-2">
        <RecentTournaments tournaments={dashboard.recentTournaments} />
        <BankrollHistory history={dashboard.bankrollHistory} />
      </div>
    </div>
  );
}