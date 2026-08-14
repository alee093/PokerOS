import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] =
  useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      await login({
        email,
        password,
      });

      console.log("LOGIN SUCCESS");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setError(
        getApiErrorMessage(
          error,
          "Could not log in"
        )
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
      />

      <button type="submit">
        Login
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}