// src/pages/bankroll/Bankroll.tsx
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
  createBankrollTransaction,
  getBankroll,
  getBankrollTransactions,
  type BankrollTransaction,
  type BankrollSummary,
} from "../../services/bankroll.service";

import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import { formatCurrency } from "../../utils/formatters";

import TransactionHistory from "./components/TransactionHistory";

import "./Bankroll.css";

type TransactionType = "DEPOSIT" | "WITHDRAWAL";

export default function Bankroll() {
  const navigate = useNavigate();

  const [bankroll, setBankroll] = useState<BankrollSummary | null>(null);
  const [type, setType] = useState<TransactionType>("DEPOSIT");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<BankrollTransaction[]>([]);

  async function loadBankroll() {
    try {
      const [bankrollData, transactionsData] = await Promise.all([
        getBankroll(),
        getBankrollTransactions(),
      ]);

      setBankroll(bankrollData);
      setTransactions(transactionsData);
    } catch {
      setError("Could not load bankroll");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBankroll();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const parsedAmount = Number(amount);

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    try {
      setSubmitting(true);

      await createBankrollTransaction({
        type,
        amount: parsedAmount,
        ...(description.trim() && { description: description.trim() }),
      });

      setAmount("");
      setDescription("");

      await loadBankroll();
    } catch (error) {
      setError(getApiErrorMessage(error, "Could not create transaction"));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="dashboard-card__empty">Loading bankroll...</p>;
  }

  if (!bankroll) {
    return <p className="dashboard-card__empty">Bankroll unavailable.</p>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Bankroll</h1>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </button>
      </header>

      <section className="dashboard-card">
        <h2 className="dashboard-card__title">Summary</h2>

        <div className="stat-grid stat-grid--3col">
          <div className="stat-card">
            <span className="stat-card__label">Current</span>
            <span className="stat-card__value">
              {formatCurrency(bankroll.currentBalance)}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-card__label">Starting</span>
            <span className="stat-card__value">
              {formatCurrency(bankroll.startingBalance)}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-card__label">Tournament Profit</span>
            <span
              className={`stat-card__value ${
                bankroll.tournamentProfit >= 0 ? "text-success" : "text-danger"
              }`}
            >
              {formatCurrency(bankroll.tournamentProfit)}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-card__label">Deposits</span>
            <span className="stat-card__value">
              {formatCurrency(bankroll.deposits)}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-card__label">Withdrawals</span>
            <span className="stat-card__value">
              {formatCurrency(bankroll.withdrawals)}
            </span>
          </div>
        </div>
      </section>

      <div className="dashboard__grid-2">
        <section className="dashboard-card">
          <h2 className="dashboard-card__title">Add Transaction</h2>

          <form className="bankroll-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="transactionType">Type</label>
              <select
                id="transactionType"
                value={type}
                onChange={(event) =>
                  setType(event.target.value as TransactionType)
                }
              >
                <option value="DEPOSIT">Deposit</option>
                <option value="WITHDRAWAL">Withdrawal</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                maxLength={200}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Optional"
              />
            </div>

            {error && <p className="auth-form__error">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary"
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

        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
}