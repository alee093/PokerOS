/*
  Warnings:

  - Added the required column `speed` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gameType` on the `Tournament` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('NLH', 'PLO', 'PLO5', 'MIXED', 'OTHER');

-- CreateEnum
CREATE TYPE "TournamentSpeed" AS ENUM ('REGULAR', 'TURBO', 'HYPER', 'DEEPSTACK');

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "isBounty" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "speed" "TournamentSpeed" NOT NULL,
DROP COLUMN "gameType",
ADD COLUMN     "gameType" "GameType" NOT NULL;
