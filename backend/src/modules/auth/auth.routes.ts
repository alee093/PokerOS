import { Router } from "express";
import { register, login, verifyEmail } from "./auth.controller.js";


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


export default router;