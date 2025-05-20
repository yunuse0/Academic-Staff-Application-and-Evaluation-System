/*
  Warnings:

  - A unique constraint covering the columns `[tcKimlikNo]` on the table `Kullanici` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tcKimlikNo` to the `Kullanici` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kullanici" ADD COLUMN     "tcKimlikNo" VARCHAR(11) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Kullanici_tcKimlikNo_key" ON "Kullanici"("tcKimlikNo");
