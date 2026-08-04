import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import tournamentRoutes from "./modules/tournament/tournament.routes.js";
import statisticsRoutes from "./modules/statistics/statistics.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/tournaments", tournamentRoutes);
app.use("/statistics", statisticsRoutes);


app.get("/", (_req, res) => {
  res.json({
    message: "PokerOS API running 🚀"
  });
});


export default app;