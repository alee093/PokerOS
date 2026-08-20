-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_userId_fkey";

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
