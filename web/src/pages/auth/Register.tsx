import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { api } from "../../services/api";

function getPasswordRequirements(
  password: string
) {
  return {
    minLength:
      password.length >= 8,

    lowercase:
      /[a-z]/.test(password),

    uppercase:
      /[A-Z]/.test(password),

    number:
      /[0-9]/.test(password),

    special:
      /[^A-Za-z0-9]/.test(
        password
      ),
  };
}

export default function Register() {
  const navigate =
    useNavigate();

  const [
    username,
    setUsername,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    passwordFocused,
    setPasswordFocused,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const passwordRequirements =
    getPasswordRequirements(
      password
    );

  const isPasswordValid =
    Object.values(
      passwordRequirements
    ).every(Boolean);

  const passwordsMatch =
    password === confirmPassword;

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );

  async function handleSubmit(
    event:
      React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    if (!isEmailValid) {
      setError(
        "Enter a valid email address"
      );

      return;
    }

    if (!passwordsMatch) {
      setError(
        "Passwords do not match"
      );

      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/auth/register",
        {
          username,
          email,
          password,
        }
      );

      navigate(
        "/auth/login"
      );
    } catch (error: any) {
      const response =
        error.response?.data;

      if (
        Array.isArray(
          response?.errors
        )
      ) {
        setError(
          response.errors
            .map(
              (item: {
                message: string;
              }) =>
                item.message
            )
            .join(". ")
        );
      } else {
        setError(
          response?.message ??
            "Could not create account"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>
        Create account
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <div>
          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            type="text"
            value={
              username
            }
            onChange={(
              event
            ) =>
              setUsername(
                event.target
                  .value
              )
            }
            required
          />
        </div>

        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(
              event
            ) =>
              setEmail(
                event.target
                  .value
              )
            }
            required
          />

          {email &&
            !isEmailValid && (
              <p>
                Enter a valid
                email address
              </p>
            )}
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={
              password
            }
            onChange={(
              event
            ) =>
              setPassword(
                event.target
                  .value
              )
            }
            onFocus={() =>
              setPasswordFocused(
                true
              )
            }
            onBlur={() =>
              setPasswordFocused(
                false
              )
            }
            required
          />

          {passwordFocused &&
            !isPasswordValid && (
              <ul>
                {!passwordRequirements.minLength && (
                  <li>
                    At least 8
                    characters
                  </li>
                )}

                {!passwordRequirements.lowercase && (
                  <li>
                    One lowercase
                    letter
                  </li>
                )}

                {!passwordRequirements.uppercase && (
                  <li>
                    One uppercase
                    letter
                  </li>
                )}

                {!passwordRequirements.number && (
                  <li>
                    One number
                  </li>
                )}

                {!passwordRequirements.special && (
                  <li>
                    One special
                    character
                  </li>
                )}
              </ul>
            )}
        </div>

        <div>
          <label htmlFor="confirmPassword">
            Confirm password
          </label>

          <input
            id="confirmPassword"
            type="password"
            value={
              confirmPassword
            }
            onChange={(
              event
            ) =>
              setConfirmPassword(
                event.target
                  .value
              )
            }
            required
          />

          {confirmPassword &&
            !passwordsMatch && (
              <p>
                Passwords do
                not match
              </p>
            )}
        </div>

        {error && (
          <p>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating account..."
            : "Create account"}
        </button>
      </form>

      <p>
        Already have an
        account?{" "}
        <Link to="/auth/login">
          Login
        </Link>
      </p>
    </main>
  );
}