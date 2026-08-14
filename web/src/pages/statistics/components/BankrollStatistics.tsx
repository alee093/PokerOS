import type {
  StatisticsBankroll,
} from "../../../types/statistics";

import {
  formatCurrency,
} from "../../../utils/formatters";

interface BankrollStatisticsProps {
  data: StatisticsBankroll;
}

export default function BankrollStatistics({
  data,
}: BankrollStatisticsProps) {
  return (
    <section>
      <h2>Bankroll</h2>

      <p>
        Current:{" "}
        {formatCurrency(
          data.current
        )}
      </p>

      <p>
        Starting:{" "}
        {formatCurrency(
          data.starting
        )}
      </p>

      <p>
        Deposits:{" "}
        {formatCurrency(
          data.deposits
        )}
      </p>

      <p>
        Withdrawals:{" "}
        {formatCurrency(
          data.withdrawals
        )}
      </p>
    </section>
  );
}