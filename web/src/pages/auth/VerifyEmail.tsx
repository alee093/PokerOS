import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, Spade, XCircle } from "lucide-react";

import { api } from "../../services/api";

import "./VerifyEmail.css";

type Status = "loading" | "success" | "error";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const verificationStarted = useRef(false);

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    async function verifyEmail() {
      try {
        await api.get("/auth/verify-email", { params: { token } });

        setStatus("success");
        setMessage("Your email has been verified successfully.");
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ?? "Email verification failed"
        );
      }
    }

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="verify-email">
      <div className="verify-email__logo">
        <Spade size={28} className="verify-email__logo-icon" />
        <span>
          Poker<strong>OS</strong>
        </span>
      </div>

      <section className="verify-email__card">
        <div
          className={`verify-email__icon verify-email__icon--${status}`}
        >
          {status === "loading" && (
            <Loader2 size={28} className="verify-email__spinner" />
          )}
          {status === "success" && <CheckCircle2 size={28} />}
          {status === "error" && <XCircle size={28} />}
        </div>

        <h1 className="verify-email__title">
          {status === "loading" && "Verifying your email"}
          {status === "success" && "Email verified"}
          {status === "error" && "Verification failed"}
        </h1>

        <p className="verify-email__message">{message}</p>

        {status === "success" && (
          <Link to="/auth/login" className="btn btn-primary">
            Go to login
          </Link>
        )}

        {status === "error" && (
          <Link to="/auth/register" className="btn btn-secondary">
            Back to registration
          </Link>
        )}
      </section>
    </div>
  );
}