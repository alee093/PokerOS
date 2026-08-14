import type {
  StatisticsLifetime,
} from "../../../types/statistics";

import {
  formatCurrency,
  formatHours,
  formatPercentage,
} from "../../../utils/formatters";

interface LifetimeStatisticsProps {
  data: StatisticsLifetime;
}

export default function LifetimeStatistics({
  data,
}: LifetimeStatisticsProps) {
  return (
    <section>
      <h2>Lifetime</h2>

      <p>
        Tournaments:{" "}
        {data.totalTournaments}
      </p>

      <p>
        Total Buy-ins:{" "}
        {formatCurrency(
          data.totalBuyIns
        )}
      </p>

      <p>
        Total Fees:{" "}
        {formatCurrency(
          data.totalFees
        )}
      </p>

      <p>
        Total Cost:{" "}
        {formatCurrency(
          data.totalCost
        )}
      </p>

      <p>
        Total Prizes:{" "}
        {formatCurrency(
          data.totalPrize
        )}
      </p>

      <p>
        Total Profit:{" "}
        {formatCurrency(
          data.totalProfit
        )}
      </p>

      <p>
        Average Profit:{" "}
        {formatCurrency(
          data.averageProfit
        )}
      </p>

      <p>
        ROI:{" "}
        {formatPercentage(
          data.roi
        )}
      </p>

      <p>
        ABI:{" "}
        {formatCurrency(
          data.abi
        )}
      </p>

      <p>
        ITM:{" "}
        {formatPercentage(
          data.itm
        )}
      </p>

      <p>
        Hours Played:{" "}
        {formatHours(
          data.hoursPlayed
        )}
      </p>
    </section>
  );
}