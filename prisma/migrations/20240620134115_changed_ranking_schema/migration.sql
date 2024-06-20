/*
  Warnings:

  - You are about to drop the column `authorizedUserId` on the `Ranking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ranking" DROP COLUMN "authorizedUserId",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Ranking';
