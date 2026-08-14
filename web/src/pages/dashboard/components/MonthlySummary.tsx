import type { DashboardThisMonth } from "../../../types/dashboard";
import { formatCurrency } from "../../../utils/formatters";

interface MonthlySummaryProps {
  thisMonth: DashboardThisMonth;
}

export default function MonthlySummary({
  thisMonth,
}: MonthlySummaryProps) {
  return (
    <section>
      <h2>This Month</h2>

      <p>
        Tournaments: {thisMonth.tournaments}
      </p>

      <p>
        Buy-ins: {formatCurrency(thisMonth.buyIns)}
      </p>

      <p>
        Prizes: {formatCurrency(thisMonth.prizes)}
      </p>

      <p>
        Profit: {formatCurrency(thisMonth.profit)}
      </p>
    </section>
  );
}