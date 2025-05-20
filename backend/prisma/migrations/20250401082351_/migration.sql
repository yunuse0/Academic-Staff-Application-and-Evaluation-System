/*
  Warnings:

  - You are about to drop the column `email` on the `Kullanici` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Kullanici_email_key";

-- AlterTable
ALTER TABLE "Kullanici" DROP COLUMN "email";
