/*
  Warnings:

  - You are about to drop the column `yetki` on the `Kullanici` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADAY', 'ADMIN', 'YONETICI', 'JURI_UYESI');

-- AlterTable
ALTER TABLE "Kullanici" DROP COLUMN "yetki",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADAY';
