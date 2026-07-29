import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);


app.get("/", (_req, res) => {
  res.json({
    message: "PokerOS API running 🚀"
  });
});


export default app;