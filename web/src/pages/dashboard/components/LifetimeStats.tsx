import type { DashboardLifetime } from "../../../types/dashboard";

import {
  formatCurrency,
  formatHours,
  formatPercentage,
} from "../../../utils/formatters";

interface LifetimeStatsProps {
  lifetime: DashboardLifetime;
}

export default function LifetimeStats({
  lifetime,
}: LifetimeStatsProps) {
  return (
    <section>
      <h2>Lifetime</h2>

      <p>
        Tournaments: {lifetime.totalTournaments}
      </p>

      <p>
        Profit:{" "}
        {formatCurrency(lifetime.totalProfit)}
      </p>

      <p>
        ROI: {formatPercentage(lifetime.roi)}
      </p>

      <p>
        ABI: {formatCurrency(lifetime.abi)}
      </p>

      <p>
        ITM: {formatPercentage(lifetime.itm)}
      </p>

      <p>
        Hours played:{" "}
        {formatHours(lifetime.hoursPlayed)}
      </p>
    </section>
  );
}