-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "defaultBioId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bio" (
    "id" SERIAL NOT NULL,
    "serverId" VARCHAR(255),
    "authorId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Bio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_defaultBioId_key" ON "User"("defaultBioId");

-- CreateIndex
CREATE UNIQUE INDEX "Bio_authorId_key" ON "Bio"("authorId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_defaultBioId_fkey" FOREIGN KEY ("defaultBioId") REFERENCES "Bio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bio" ADD CONSTRAINT "Bio_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
