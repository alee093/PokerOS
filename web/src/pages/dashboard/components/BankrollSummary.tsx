import type { DashboardBankroll } from "../../../types/dashboard";

import { formatCurrency } from "../../../utils/formatters";

import { useNavigate } from "react-router-dom";

interface BankrollSummaryProps {
  bankroll: DashboardBankroll | null;
}

export default function BankrollSummary({
  bankroll,
}: BankrollSummaryProps) {
  const navigate = useNavigate();
  if (!bankroll) {
    return (
      <section>
        <h2>Bankroll</h2>

        <p>
          You haven't configured your bankroll yet.
        </p>

        <button type="button" onClick={() => navigate("/bankroll/setup")}>
          Set up bankroll
        </button>
      </section>
    );
  }

  return (
    <section>
      <h2>Bankroll</h2>

      <p>
        Current:{" "}
        {formatCurrency(
          bankroll.current
        )}
      </p>

      <p>
        Starting:{" "}
        {formatCurrency(
          bankroll.starting
        )}
      </p>

      <p>
        Deposits:{" "}
        {formatCurrency(
          bankroll.deposits
        )}
      </p>

      <p>
        Withdrawals:{" "}
        {formatCurrency(
          bankroll.withdrawals
        )}
      </p>
        <button
          type="button"
          onClick={() =>
            navigate("/bankroll")
          }
        >
          Manage bankroll
        </button>
    </section>
  );
}