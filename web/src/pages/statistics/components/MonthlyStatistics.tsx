import type {
  StatisticsThisMonth,
} from "../../../types/statistics";

import {
  formatCurrency,
} from "../../../utils/formatters";

interface MonthlyStatisticsProps {
  data: StatisticsThisMonth;
}

export default function MonthlyStatistics({
  data,
}: MonthlyStatisticsProps) {
  return (
    <section>
      <h2>This Month</h2>

      <p>
        Tournaments: {data.tournaments}
      </p>

      <p>
        Buy-ins:{" "}
        {formatCurrency(data.buyIns)}
      </p>

      <p>
        Prizes:{" "}
        {formatCurrency(data.prizes)}
      </p>

      <p>
        Profit:{" "}
        {formatCurrency(data.profit)}
      </p>
    </section>
  );
}