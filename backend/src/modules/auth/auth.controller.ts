import type { Request, Response } from "express";
import { registerSchema } from "./auth.schema.js";
import { registerUser } from "./auth.service.js";
import { loginSchema } from "./auth.schema.js";
import { loginUser } from "./auth.service.js";
import { verifyEmailToken } from "./services/verification.service.js";


export async function register(
  req: Request,
  res: Response
) {

  try {

    const data = registerSchema.parse(req.body);


    const user = await registerUser(data);


    res.status(201).json(user);


  } catch (error) {

    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });

      return;
    }


    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function login(
  req: Request,
  res: Response
) {

  try {

    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

    res.json(result);


  } catch(error) {

    if(error instanceof Error){
      res.status(400).json({
        message: error.message
      });

      return;
    }

    res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function verifyEmail(
  req: Request,
  res: Response
) {

  try {

    const { token } = req.query;


    if (!token || typeof token !== "string") {
      return res.status(400).json({
        message: "Invalid token",
      });
    }


    await verifyEmailToken(token);


    return res.json({
      message: "Email verified successfully",
    });


  } catch (error) {

      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      });

  }
}