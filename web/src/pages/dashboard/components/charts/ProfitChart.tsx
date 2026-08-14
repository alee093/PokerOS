import {
  useMemo,
  useState,
} from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  ProfitHistoryPoint,
} from "../../../../types/dashboard";

import {
  formatCurrency,
  formatDate,
} from "../../../../utils/formatters";

type Range =
  | "1M"
  | "1Y"
  | "LIFETIME";

type ViewMode =
  | "CUMULATIVE"
  | "MONTHLY";

interface ProfitChartProps {
  history: ProfitHistoryPoint[];
}

export default function ProfitChart({
  history,
}: ProfitChartProps) {
  const [range, setRange] =
    useState<Range>("1M");

  const [viewMode, setViewMode] =
    useState<ViewMode>("CUMULATIVE");

  const filteredHistory = useMemo(() => {
    if (range === "LIFETIME") {
      return history;
    }

    const now = new Date();
    const from = new Date(now);

    if (range === "1M") {
      from.setMonth(
        from.getMonth() - 1
      );
    }

    if (range === "1Y") {
      from.setFullYear(
        from.getFullYear() - 1
      );
    }

    return history.filter(
      (point) =>
        new Date(point.date) >= from
    );
  }, [history, range]);

  const cumulativeData =
    useMemo(() => {
      return filteredHistory.map(
        (point) => ({
          date: formatDate(
            point.date
          ),

          value:
            point.cumulativeProfit,
        })
      );
    }, [filteredHistory]);

  const monthlyData =
    useMemo(() => {
      const monthlyMap =
        new Map<string, number>();

      for (
        const point of filteredHistory
      ) {
        const date =
          new Date(point.date);

        const key =
          `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`;

        const current =
          monthlyMap.get(key) ?? 0;

        monthlyMap.set(
          key,
          current + point.profit
        );
      }

      return Array.from(
        monthlyMap.entries()
      ).map(([month, profit]) => {
        const [
          year,
          monthNumber,
        ] = month.split("-");

        const date = new Date(
          Number(year),
          Number(monthNumber) - 1,
          1
        );

        return {
          date:
            date.toLocaleDateString(
              "en-US",
              {
                month: "short",
                year: "numeric",
              }
            ),

          value: profit,
        };
      });
    }, [filteredHistory]);

  const data =
    viewMode === "CUMULATIVE"
      ? cumulativeData
      : monthlyData;

  return (
    <section>
      <header>
        <h2>Profit Evolution</h2>

        <div>
          <button
            type="button"
            onClick={() =>
              setViewMode(
                "CUMULATIVE"
              )
            }
            disabled={
              viewMode ===
              "CUMULATIVE"
            }
          >
            Cumulative
          </button>

          <button
            type="button"
            onClick={() =>
              setViewMode(
                "MONTHLY"
              )
            }
            disabled={
              viewMode ===
              "MONTHLY"
            }
          >
            Monthly
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() =>
              setRange("1M")
            }
            disabled={
              range === "1M"
            }
          >
            1M
          </button>

          <button
            type="button"
            onClick={() =>
              setRange("1Y")
            }
            disabled={
              range === "1Y"
            }
          >
            1Y
          </button>

          <button
            type="button"
            onClick={() =>
              setRange(
                "LIFETIME"
              )
            }
            disabled={
              range ===
              "LIFETIME"
            }
          >
            Lifetime
          </button>
        </div>
      </header>

      {data.length === 0 ? (
        <p>
          No tournaments in this period.
        </p>
      ) : (
        <div
          style={{
            width: "100%",
            height: 300,
          }}
        >
          <ResponsiveContainer>
            <LineChart
              data={data}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  formatCurrency(
                    Number(value)
                  )
                }
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#27d3c2"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}