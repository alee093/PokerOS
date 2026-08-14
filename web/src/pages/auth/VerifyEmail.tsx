import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import { api } from "../../services/api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const verificationStarted = useRef(false);

  const [status, setStatus] =
    useState<"loading" | "success" | "error">(
      "loading"
    );

  const [message, setMessage] = useState(
    "Verifying your email..."
  );

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
        await api.get("/auth/verify-email", {
          params: {
            token,
          },
        });

        setStatus("success");

        setMessage(
          "Email verified successfully"
        );
      } catch (error: any) {
        setStatus("error");

        setMessage(
          error.response?.data?.message ??
            "Email verification failed"
        );
      }
    }

    verifyEmail();
  }, [searchParams]);

  return (
    <main>
      <h1>Email Verification</h1>

      <p>{message}</p>

      {status === "success" && (
        <Link to="/auth/login">
          Go to login
        </Link>
      )}
    </main>
  );
}