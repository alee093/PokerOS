import { prisma } from "../../lib/prisma.js";

export async function getPokerSites() {
  return prisma.pokerSite.findMany({
    orderBy: {
      name: "asc",
    },
  });
}