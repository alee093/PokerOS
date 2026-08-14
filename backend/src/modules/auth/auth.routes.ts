import { Router } from "express";
import { register, login, verifyEmail, logout, me } from "./auth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";


const router = Router();

router.post(
  "/login",
  login
);

router.post(
  "/register",
  register
);

router.get(
  "/verify-email",
  verifyEmail
);

router.post(
  "/logout",
  logout
);

router.get(
  "/me",
  authMiddleware,
  me
);


export default router;