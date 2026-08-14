import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /[a-z]/,
    "Password must contain at least one lowercase letter"
  )
  .regex(
    /[A-Z]/,
    "Password must contain at least one uppercase letter"
  )
  .regex(
    /[0-9]/,
    "Password must contain at least one number"
  )
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),

  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type RegisterInput =
  z.infer<typeof registerSchema>;

export type LoginInput =
  z.infer<typeof loginSchema>;