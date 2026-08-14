import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  createBankrollTransaction,
  getBankroll,
  type BankrollSummary,
} from "../../services/bankroll.service";

import {
  formatCurrency,
} from "../../utils/formatters";

type TransactionType =
  | "DEPOSIT"
  | "WITHDRAWAL";

export default function Bankroll() {
  const navigate = useNavigate();

  const [bankroll, setBankroll] =
    useState<BankrollSummary | null>(null);

  const [type, setType] =
    useState<TransactionType>("DEPOSIT");

  const [amount, setAmount] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function loadBankroll() {
    try {
      const data = await getBankroll();

      setBankroll(data);
    } catch {
      setError(
        "Could not load bankroll"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBankroll();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    const parsedAmount =
      Number(amount);

    if (
      Number.isNaN(parsedAmount) ||
      parsedAmount <= 0
    ) {
      setError(
        "Amount must be greater than zero"
      );

      return;
    }

    try {
      setSubmitting(true);

      await createBankrollTransaction({
        type,
        amount: parsedAmount,

        ...(description.trim() && {
          description:
            description.trim(),
        }),
      });

      setAmount("");
      setDescription("");

      await loadBankroll();
    } catch (error: any) {
      setError(
        error.response?.data?.message ??
          "Could not create transaction"
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p>Loading bankroll...</p>;
  }

  if (!bankroll) {
    return <p>Bankroll unavailable.</p>;
  }

  return (
    <main>
      <header>
        <h1>Bankroll</h1>

        <button
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Back to dashboard
        </button>
      </header>

      <section>
        <h2>Summary</h2>

        <p>
          Current:{" "}
          {formatCurrency(
            bankroll.currentBalance
          )}
        </p>

        <p>
          Starting:{" "}
          {formatCurrency(
            bankroll.startingBalance
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

        <p>
          Tournament profit:{" "}
          {formatCurrency(
            bankroll.tournamentProfit
          )}
        </p>
      </section>

      <hr />

      <section>
        <h2>Add transaction</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="transactionType">
              Type
            </label>

            <select
              id="transactionType"
              value={type}
              onChange={(event) =>
                setType(
                  event.target
                    .value as TransactionType
                )
              }
            >
              <option value="DEPOSIT">
                Deposit
              </option>

              <option value="WITHDRAWAL">
                Withdrawal
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="amount">
              Amount
            </label>

            <input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(event) =>
                setAmount(
                  event.target.value
                )
              }
              required
            />
          </div>

          <div>
            <label htmlFor="description">
              Description
            </label>

            <input
              id="description"
              type="text"
              maxLength={200}
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Optional"
            />
          </div>

          {error && <p>{error}</p>}

          <button
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : type === "DEPOSIT"
                ? "Add deposit"
                : "Add withdrawal"}
          </button>
        </form>
      </section>
    </main>
  );
}