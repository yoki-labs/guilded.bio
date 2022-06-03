/*
  Warnings:

  - Added the required column `flairInfos` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "badges" TEXT[],
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "flairInfos" JSONB NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "stonks" INTEGER;
