-- DropForeignKey
ALTER TABLE "Bio" DROP CONSTRAINT "Bio_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Bio" ADD CONSTRAINT "Bio_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
