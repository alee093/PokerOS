import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import tournamentRoutes from "./modules/tournament/tournament.routes.js";
import statisticsRoutes from "./modules/statistics/statistics.routes.js";
import bankrollRoutes from "./modules/bankroll/bankroll.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/tournaments", tournamentRoutes);
app.use("/statistics", statisticsRoutes);
app.use("/bankroll", bankrollRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "PokerOS API running 🚀"
  });
});

app.use(errorMiddleware);

export default app;