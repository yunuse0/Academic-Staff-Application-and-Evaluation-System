/*
  Warnings:

  - You are about to drop the column `atifYapanYazar` on the `Atiflar` table. All the data in the column will be lost.
  - You are about to drop the column `etkinlikAdi` on the `BilimselToplantilar` table. All the data in the column will be lost.
  - You are about to drop the column `dil` on the `Kitaplar` table. All the data in the column will be lost.
  - Added the required column `dersDonemi` to the `EgitimOgretim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programAdi` to the `EgitimOgretim` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DersDonemi" AS ENUM ('BAHAR', 'GUZ');

-- AlterTable
ALTER TABLE "ArastirmaProjeleri" ALTER COLUMN "puan" DROP NOT NULL,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Atiflar" DROP COLUMN "atifYapanYazar",
ALTER COLUMN "puan" DROP NOT NULL,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "BilimselToplantilar" DROP COLUMN "etkinlikAdi",
ADD COLUMN     "bildiriAdi" VARCHAR(255),
ADD COLUMN     "konferansAdi" VARCHAR(255),
ADD COLUMN     "sayfaSayisi" INTEGER,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "EditorlukFaaliyetleri" ALTER COLUMN "puan" DROP NOT NULL,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "EgitimOgretim" ADD COLUMN     "dersDonemi" "DersDonemi" NOT NULL,
ADD COLUMN     "programAdi" VARCHAR(255) NOT NULL,
ALTER COLUMN "puan" DROP NOT NULL,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "GuzelSanatlarFaaliyetleri" ALTER COLUMN "puan" DROP NOT NULL,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "IdariGorevler" ALTER COLUMN "puan" DROP NOT NULL,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "JuriDegerlendirme" ALTER COLUMN "puan" DROP NOT NULL,
ALTER COLUMN "puan" SET DEFAULT 0,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Kitaplar" DROP COLUMN "dil",
ALTER COLUMN "puan" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Makaleler" ADD COLUMN     "puan" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Oduller" ALTER COLUMN "puan" DROP NOT NULL,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Patentler" ALTER COLUMN "puan" DROP NOT NULL,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TezYoneticiligi" ALTER COLUMN "puan" DROP NOT NULL,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ToplamPuanlama" ALTER COLUMN "puan" DROP NOT NULL,
ALTER COLUMN "puan" SET DEFAULT 0,
ALTER COLUMN "puan" SET DATA TYPE DOUBLE PRECISION;
