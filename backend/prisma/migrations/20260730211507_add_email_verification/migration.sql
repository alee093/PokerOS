/*
  Warnings:

  - You are about to drop the column `emailVerifiedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tokenHash` on the `VerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VerificationToken_tokenHash_key";

-- DropIndex
DROP INDEX "VerificationToken_userId_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerifiedAt";

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "tokenHash",
ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");
