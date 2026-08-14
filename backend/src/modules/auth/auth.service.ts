import bcrypt from "bcrypt";

import { prisma } from "../../lib/prisma.js";

import { generateToken } from "../../utils/jwt.js";

import {
  ConflictError,
} from "../../errors/ConflictError.js";

import {
  UnauthorizedError,
} from "../../errors/UnauthorizedError.js";

import {
  BadRequestError,
} from "../../errors/BadRequestError.js";

import type {
  LoginInput,
  RegisterInput,
} from "./auth.schema.js";

import {
  createVerificationToken,
} from "./services/verification.service.js";

import {
  sendVerificationEmail,
} from "../../services/email/email.service.js";

export async function loginUser(
  data: LoginInput
) {
  const user =
    await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

  if (!user) {
    throw new UnauthorizedError(
      "Invalid email or password"
    );
  }

  if (!user.emailVerified) {
    throw new BadRequestError(
      "Please verify your email before logging in"
    );
  }

  const passwordMatch =
    await bcrypt.compare(
      data.password,
      user.passwordHash
    );

  if (!passwordMatch) {
    throw new UnauthorizedError(
      "Invalid email or password"
    );
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  };
}

export async function registerUser(
  data: RegisterInput
) {
  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

  if (existingUser) {
    throw new ConflictError(
      "An account with this email already exists"
    );
  }

  const existingUsername =
    await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

  if (existingUsername) {
    throw new ConflictError(
      "This username is already taken"
    );
  }

  const passwordHash =
    await bcrypt.hash(
      data.password,
      10
    );

  const user =
    await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash,
      },
    });

  const verificationToken =
    await createVerificationToken(
      user.id
    );

  await sendVerificationEmail(
    user.username,
    user.email,
    `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
  );

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}