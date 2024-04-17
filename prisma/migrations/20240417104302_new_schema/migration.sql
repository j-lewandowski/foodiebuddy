-- CreateTable
CREATE TABLE "Ranking" (
    "id" INTEGER NOT NULL,
    "authorizedUserId" INTEGER NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" INTEGER NOT NULL,
    "rankingId" INTEGER NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_authorizedUserId_key" ON "Ranking"("authorizedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_rankingId_key" ON "Restaurant"("rankingId");

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_authorizedUserId_fkey" FOREIGN KEY ("authorizedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
