import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.js";
import type { RegisterInput } from "./auth.schema.js";
import { generateToken } from "../../utils/jwt.js";
import type { LoginInput } from "./auth.schema.js";


export async function loginUser(data: LoginInput) {

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });


  if (!user) {
    throw new Error("Invalid credentials");
  }


  const passwordMatch = await bcrypt.compare(
    data.password,
    user.passwordHash
  );


  if (!passwordMatch) {
    throw new Error("Invalid credentials");
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


export async function registerUser(data: RegisterInput) {

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });


  if (existingUser) {
    throw new Error("Email already registered");
  }


  const passwordHash = await bcrypt.hash(
    data.password,
    10
  );


  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      passwordHash,
    },
  });


  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}
