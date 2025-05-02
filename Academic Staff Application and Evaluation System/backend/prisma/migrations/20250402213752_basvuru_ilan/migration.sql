-- CreateEnum
CREATE TYPE "IlanDurum" AS ENUM ('ACIK', 'KAPALI');

-- CreateEnum
CREATE TYPE "BasvuruDurum" AS ENUM ('BEKLIYOR', 'KABUL', 'RED');

-- CreateEnum
CREATE TYPE "KadroTuru" AS ENUM ('DR_OGR_UYESI', 'DOCENT', 'PROFESOR');

-- CreateTable
CREATE TABLE "Ilanlar" (
    "id" SERIAL NOT NULL,
    "baslik" VARCHAR(255) NOT NULL,
    "aciklama" TEXT NOT NULL,
    "kadro" "KadroTuru" NOT NULL,
    "baslangicTarihi" TIMESTAMP(3) NOT NULL,
    "bitisTarihi" TIMESTAMP(3) NOT NULL,
    "kriterler" VARCHAR(255) NOT NULL,
    "durum" "IlanDurum" NOT NULL DEFAULT 'ACIK',
    "basvuruSayisi" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Ilanlar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basvurular" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "ilanId" INTEGER NOT NULL,
    "durum" "BasvuruDurum" NOT NULL DEFAULT 'BEKLIYOR',
    "tarih" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Basvurular_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Basvurular" ADD CONSTRAINT "Basvurular_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basvurular" ADD CONSTRAINT "Basvurular_ilanId_fkey" FOREIGN KEY ("ilanId") REFERENCES "Ilanlar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
