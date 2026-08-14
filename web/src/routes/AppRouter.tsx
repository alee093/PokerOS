import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";

import Dashboard from "../pages/dashboard/Dashboard";

import Bankroll from "../pages/bankroll/Bankroll";
import BankrollSetup from "../pages/bankroll/BankrollSetup";

import Tournaments from "../pages/tournaments/Tournaments";
import CreateTournament from "../pages/tournaments/CreateTournament";
import TournamentDetail from "../pages/tournaments/TournamentDetail";
import EditTournament from "../pages/tournaments/EditTournament";

import Statistics from "../pages/statistics/Statistics";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/login"
          element={<Login />}
        />

        <Route
          path="/auth/register"
          element={<Register />}
        />

        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/tournaments"
            element={<Tournaments />}
          />

          <Route
            path="/tournaments/new"
            element={<CreateTournament />}
          />

          <Route
            path="/tournaments/:id"
            element={<TournamentDetail />}
          />

          <Route
            path="/tournaments/:id/edit"
            element={<EditTournament />}
          />

          <Route
            path="/bankroll"
            element={<Bankroll />}
          />

          <Route
            path="/bankroll/setup"
            element={<BankrollSetup />}
          />

          <Route
            path="/statistics"
            element={<Statistics />}
          />
        </Route>

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}