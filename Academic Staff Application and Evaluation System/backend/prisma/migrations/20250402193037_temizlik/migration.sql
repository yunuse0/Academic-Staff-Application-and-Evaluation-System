/*
  Warnings:

  - You are about to drop the `AkademikBirim` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AkademikFaaliyet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AkademikKadro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AtamaBasvuru` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Proje` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Yayin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AkademikBirim" DROP CONSTRAINT "AkademikBirim_ustBirimId_fkey";

-- DropForeignKey
ALTER TABLE "AkademikFaaliyet" DROP CONSTRAINT "AkademikFaaliyet_kullaniciId_fkey";

-- DropForeignKey
ALTER TABLE "AtamaBasvuru" DROP CONSTRAINT "AtamaBasvuru_birimId_fkey";

-- DropForeignKey
ALTER TABLE "AtamaBasvuru" DROP CONSTRAINT "AtamaBasvuru_kadroId_fkey";

-- DropForeignKey
ALTER TABLE "AtamaBasvuru" DROP CONSTRAINT "AtamaBasvuru_kullaniciId_fkey";

-- DropForeignKey
ALTER TABLE "Kullanici" DROP CONSTRAINT "Kullanici_birimId_fkey";

-- DropForeignKey
ALTER TABLE "Proje" DROP CONSTRAINT "Proje_kullaniciId_fkey";

-- DropForeignKey
ALTER TABLE "Yayin" DROP CONSTRAINT "Yayin_kullaniciId_fkey";

-- DropTable
DROP TABLE "AkademikBirim";

-- DropTable
DROP TABLE "AkademikFaaliyet";

-- DropTable
DROP TABLE "AkademikKadro";

-- DropTable
DROP TABLE "AtamaBasvuru";

-- DropTable
DROP TABLE "Proje";

-- DropTable
DROP TABLE "Yayin";
