import { prisma } from "../../lib/prisma.js";

export async function getCurrentUser(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      country: true,
      timezone: true,
      currency: true,
      avatarUrl: true,
      createdAt: true,
    },
  });
}