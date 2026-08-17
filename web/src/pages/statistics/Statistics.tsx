import { useEffect, useState } from "react";

import { getStatisticsOverview } from "../../services/statistics.service";
import type { StatisticsOverview } from "../../types/statistics";

import BankrollStatistics from "./components/BankrollStatistics";
import LifetimeStatistics from "./components/LifetimeStatistics";
import MonthlyStatistics from "./components/MonthlyStatistics";

import "./Statistics.css";

export default function Statistics() {
  const [statistics, setStatistics] = useState<StatisticsOverview | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStatistics() {
      try {
        const data = await getStatisticsOverview();
        setStatistics(data);
      } catch {
        setError("Could not load statistics");
      } finally {
        setLoading(false);
      }
    }

    loadStatistics();
  }, []);

  if (loading) {
    return <p className="dashboard-card__empty">Loading statistics...</p>;
  }

  if (error) {
    return <p className="dashboard-card__empty">{error}</p>;
  }

  if (!statistics) {
    return null;
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Statistics</h1>
      </header>

      <MonthlyStatistics data={statistics.thisMonth} />
      <LifetimeStatistics data={statistics.lifetime} />
      <BankrollStatistics data={statistics.bankroll} />
    </div>
  );
}