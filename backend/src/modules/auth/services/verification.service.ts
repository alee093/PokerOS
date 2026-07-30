import crypto from "crypto";
import { prisma } from "../../../lib/prisma.js";


export async function createVerificationToken(
  userId: string
) {

  const token = crypto
    .randomBytes(32)
    .toString("hex");


  await prisma.verificationToken.create({
    data: {
      token,
      userId,
      expiresAt: new Date(
        Date.now() + 1000 * 60 * 60 * 24
      ),
    },
  });


  return token;
}

export async function verifyEmailToken(
  token: string
) {

  const verificationToken =
    await prisma.verificationToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });


  if (!verificationToken) {
    throw new Error("Invalid verification token");
  }


  if (
    verificationToken.expiresAt < new Date()
  ) {
    throw new Error("Verification token expired");
  }


  await prisma.user.update({
    where: {
      id: verificationToken.userId,
    },
    data: {
      emailVerified: true,
    },
  });


  await prisma.verificationToken.delete({
    where: {
      id: verificationToken.id,
    },
  });


  return true;
}