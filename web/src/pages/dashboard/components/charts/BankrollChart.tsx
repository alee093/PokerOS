import { useMemo, useState } from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { BankrollHistoryPoint } from "../../../../types/dashboard";
import { formatCurrency, formatDate } from "../../../../utils/formatters";

import "./BankrollChart.css";

type Range = "1M" | "1Y" | "LIFETIME";

interface BankrollChartProps {
  history: BankrollHistoryPoint[];
}

const ACCENT = "#2dd9c5";
const GRID = "rgba(255,255,255,0.08)";
const AXIS = "#6b7280";

export default function BankrollChart({ history }: BankrollChartProps) {
  const [range, setRange] = useState<Range>("1M");

  const filteredHistory = useMemo(() => {
    if (range === "LIFETIME") {
      return history;
    }

    const now = new Date();
    const from = new Date(now);

    if (range === "1M") {
      from.setMonth(from.getMonth() - 1);
    }

    if (range === "1Y") {
      from.setFullYear(from.getFullYear() - 1);
    }

    return history.filter((point) => new Date(point.date) >= from);
  }, [history, range]);

  const data = filteredHistory.map((point) => ({
    date: formatDate(point.date),
    balance: point.balance,
  }));

  return (
    <section className="dashboard-card">
      <header className="chart-card__header">
        <h2 className="dashboard-card__title" style={{ marginBottom: 0 }}>
          Bankroll Evolution
        </h2>

        <div className="chart-card__toggle-group">
          <button
            type="button"
            className="chart-card__toggle-btn"
            onClick={() => setRange("1M")}
            disabled={range === "1M"}
          >
            1M
          </button>

          <button
            type="button"
            className="chart-card__toggle-btn"
            onClick={() => setRange("1Y")}
            disabled={range === "1Y"}
          >
            1Y
          </button>

          <button
            type="button"
            className="chart-card__toggle-btn"
            onClick={() => setRange("LIFETIME")}
            disabled={range === "LIFETIME"}
          >
            Lifetime
          </button>
        </div>
      </header>

      {data.length === 0 ? (
        <p className="dashboard-card__empty">
          No bankroll activity in this period.
        </p>
      ) : (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="date" stroke={AXIS} fontSize={12} />
              <YAxis stroke={AXIS} fontSize={12} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{
                  background: "#1c1f29",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  fontSize: 13,
                }}
                labelStyle={{ color: "#9aa0ac" }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke={ACCENT}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}