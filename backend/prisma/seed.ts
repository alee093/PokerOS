import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const pokerSites = [
    {
      name: "PokerStars",
      logoUrl: "https://www.pokerstars.com/favicon.ico",
    },
    {
      name: "GGPoker",
      logoUrl: "https://www.ggpoker.com/favicon.ico",
    },
    {
      name: "Winamax",
      logoUrl: "https://www.winamax.fr/favicon.ico",
    },
    {
      name: "partypoker",
      logoUrl: "https://www.partypoker.com/favicon.ico",
    },
    {
      name: "888poker",
      logoUrl: "https://www.888poker.com/favicon.ico",
    },
  ];

  for (const site of pokerSites) {
    await prisma.pokerSite.upsert({
      where: {
        name: site.name,
      },
      update: {},
      create: site,
    });
  }

  console.log("✅ Poker sites seeded successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
