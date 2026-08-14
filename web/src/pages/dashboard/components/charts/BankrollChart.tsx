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

interface BankrollChartProps {
  history: BankrollHistoryPoint[];
}

export default function BankrollChart({
  history,
}: BankrollChartProps) {
  if (history.length === 0) {
    return (
      <section>
        <h2>Bankroll Evolution</h2>

        <p>
          No bankroll history yet.
        </p>
      </section>
    );
  }

  const data = history.map(
    (point) => ({
      date: formatDate(point.date),
      balance: point.balance,
    })
  );

  return (
    <section>
      <h2>Bankroll Evolution</h2>

      <div
        style={{
          width: "100%",
          height: 300,
        }}
      >
        <ResponsiveContainer>
          <LineChart data={data}>
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
    </section>
  );
}