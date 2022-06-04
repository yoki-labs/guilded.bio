-- CreateTable
CREATE TABLE "View" (
    "id" SERIAL NOT NULL,
    "bioId" INTEGER NOT NULL,
    "hashedIp" VARCHAR(255) NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);
