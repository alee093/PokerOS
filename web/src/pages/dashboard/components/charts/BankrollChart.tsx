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
  BankrollHistoryPoint,
} from "../../../../types/dashboard";

import {
  formatCurrency,
  formatDate,
} from "../../../../utils/formatters";

type Range =
  | "1M"
  | "1Y"
  | "LIFETIME";

interface BankrollChartProps {
  history: BankrollHistoryPoint[];
}

export default function BankrollChart({
  history,
}: BankrollChartProps) {
  const [range, setRange] =
    useState<Range>("1M");

  const filteredHistory =
    useMemo(() => {
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

  const data =
    filteredHistory.map(
      (point) => ({
        date:
          formatDate(point.date),

        balance:
          point.balance,
      })
    );

  return (
    <section>
      <header>
        <h2>
          Bankroll Evolution
        </h2>

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
          No bankroll activity in this period.
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
                dataKey="balance"
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