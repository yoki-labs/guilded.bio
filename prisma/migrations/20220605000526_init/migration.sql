-- AlterTable
ALTER TABLE "Bio" ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "View" (
    "id" SERIAL NOT NULL,
    "bioId" INTEGER NOT NULL,
    "hashedIp" VARCHAR(255) NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);
