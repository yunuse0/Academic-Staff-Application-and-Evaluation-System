/*
  Warnings:

  - You are about to drop the column `donem` on the `EgitimOgretim` table. All the data in the column will be lost.
  - You are about to drop the column `programAdi` on the `EgitimOgretim` table. All the data in the column will be lost.
  - You are about to drop the column `yabanciDil` on the `EgitimOgretim` table. All the data in the column will be lost.
  - You are about to drop the `Atif` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Etkinlik` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IdariGorev` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kitap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Makale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Odul` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TezDanismanligi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dersTuru` to the `EgitimOgretim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `puan` to the `EgitimOgretim` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IndeksTuru" AS ENUM ('SCI_E', 'SSCI', 'AHCI', 'ESCI', 'SCOPUS', 'DIGER_ULUSLARARASI', 'ULAKBIM', 'DIGER_ULUSAL');

-- CreateEnum
CREATE TYPE "QSinifi" AS ENUM ('Q1', 'Q2', 'Q3', 'Q4', 'YOK');

-- CreateEnum
CREATE TYPE "KitapTuru" AS ENUM ('ULUSLARARASI_OZGUN_KITAP', 'ULUSLARARASI_BOLUM_YAZARLIGI', 'ULUSLARARASI_ANSIKLOPEDI', 'ULUSAL_OZGUN_KITAP', 'ULUSAL_BOLUM_YAZARLIGI', 'TAM_KITAP_CEVIRISI', 'CEVIRI_BOLUM_YAZARLIGI', 'ULUSAL_ANSIKLOPEDI');

-- CreateEnum
CREATE TYPE "AtifTuru" AS ENUM ('SCI_E_SSCI_AHCI', 'E_SCI', 'ULUSLARARASI', 'ULUSAL', 'GUZEL_SANATLAR_ULUSLARARASI', 'GUZEL_SANATLAR_ULUSAL');

-- CreateEnum
CREATE TYPE "DersTuru" AS ENUM ('ONLISANS_LISANS', 'ONLISANS_LISANS_YD', 'LİSANSUSTU', 'LİSANSUSTU_YD');

-- CreateEnum
CREATE TYPE "TezTuru" AS ENUM ('DOKTORA_SANATTA_YETERLIK_UZMANLIK', 'YUKSEK_LISANS_TEZ_YONETIMI', 'DOKTORA_SANATTA_YETERLIK_ES_DANISMAN', 'YUKSEK_LISANS_SANATTA_ES_DANISMAN');

-- CreateEnum
CREATE TYPE "PatentTuru" AS ENUM ('ULUSLARARASI_LISANSLANAN_PATENT', 'ULUSLARARASI_TESCILLENMIS_PATENT', 'ULUSLARARASI_PATENT_BASVURUSU', 'ULUSAL_LISANSLANAN_PATENT', 'ULUSAL_TESCILLENMIS_PATENT', 'ULUSAL_PATENT_BASVURUSU', 'LISANSLANAN_FAYDALI_MODEL_ENDUSTRIEL_TASARIM_MARKA', 'FAYDALI_MODEL_ENDUSTRIEL_TASARIM');

-- CreateEnum
CREATE TYPE "EtkinlikTuru" AS ENUM ('ULUSLARARASI_TAM_METIN_SUNUM', 'ULUSLARARASI_OZET_SUNUM', 'ULUSLARARASI_POSTER', 'ULUSAL_TAM_METIN_SUNUM', 'ULUSAL_OZET_SUNUM', 'ULUSAL_POSTER', 'ULUSLARARASI_KURUL_UYELIGI', 'ULUSAL_KURUL_UYELIGI', 'ULUSLARARASI_DAVETLI_KONUSMACI', 'ULUSAL_DAVETLI_KONUSMACI', 'ATOLYE_ORGANIZASYON', 'ATOLYE_KONUSMACI');

-- CreateEnum
CREATE TYPE "ArastirmaProjeTuru" AS ENUM ('P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12', 'P13', 'P14', 'P15', 'P16', 'P17', 'P18', 'P19', 'P20', 'P21', 'P22', 'P23', 'P24', 'P25', 'P26', 'P27', 'P28');

-- CreateEnum
CREATE TYPE "EditorlukTuru" AS ENUM ('E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12', 'E13');

-- CreateEnum
CREATE TYPE "OdulTuru" AS ENUM ('JURILI_ULUSLARARASI', 'TUBITAK_BILIM_OZEL_HIZMET', 'TUBA_AKADEMI_ODUL', 'TUBITAK_TESIK', 'TUBA_GEBIP_TESEP', 'JURILI_ULUSAL', 'JURI_DEGIL', 'INTERNATIONAL_YARIŞMA_BIRINCI', 'INTERNATIONAL_YARIŞMA_IKINCI', 'INTERNATIONAL_YARIŞMA_UCUNCU', 'NATIONAL_YARIŞMA_BIRINCI', 'NATIONAL_YARIŞMA_IKINCI', 'NATIONAL_YARIŞMA_UCUNCU', 'INTERNATIONAL_TOPLANTI', 'NATIONAL_TOPLANTI', 'INTERNATIONAL_SANAT_ODUL', 'NATIONAL_SANAT_ODUL', 'UNIVERSITE_KURUMSAL', 'BILIMSEL_ESER');

-- CreateEnum
CREATE TYPE "IdariGorevTuru" AS ENUM ('I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', 'I11', 'I12');

-- CreateEnum
CREATE TYPE "GuzelSanatlarFaaliyetTuru" AS ENUM ('GS1', 'GS2', 'GS3', 'GS4', 'GS5', 'GS6', 'GS7', 'GS8', 'GS9', 'GS10', 'GS11', 'GS12', 'GS13', 'GS14', 'GS15', 'GS16', 'GS17', 'GS18', 'GS19', 'GS20', 'GS21', 'GS22', 'GS23', 'GS24', 'GS25', 'GS26', 'GS27', 'GS28', 'GS29', 'GS30', 'GS31', 'GS32', 'GS33', 'GS34', 'GS35', 'GS36', 'GS37', 'GS38', 'GS39', 'GS40', 'GS41', 'GS42', 'GS43', 'GS44', 'GS45', 'GS46', 'GS47', 'GS48', 'GS49', 'GS50', 'GS51', 'GS52', 'GS53', 'GS54', 'GS55', 'GS56', 'GS57', 'GS58', 'GS59', 'GS60', 'GS61', 'GS62', 'GS63', 'GS64', 'GS65', 'GS66', 'GS67', 'GS68', 'GS69', 'GS70', 'GS71', 'GS72', 'GS73', 'GS74', 'GS75', 'GS76', 'GS77', 'GS78', 'GS79', 'GS80', 'GS81', 'GS82', 'GS83', 'GS84', 'GS85', 'GS86', 'GS87', 'GS88', 'GS89', 'GS90', 'GS91', 'GS92', 'GS93', 'GS94', 'GS95', 'GS96', 'GS97', 'GS98', 'GS99', 'GS100', 'GS101', 'GS102', 'GS103', 'GS104', 'GS105');

-- DropForeignKey
ALTER TABLE "Atif" DROP CONSTRAINT "Atif_kullaniciId_fkey";

-- DropForeignKey
ALTER TABLE "Etkinlik" DROP CONSTRAINT "Etkinlik_kullaniciId_fkey";

-- DropForeignKey
ALTER TABLE "IdariGorev" DROP CONSTRAINT "IdariGorev_kullaniciId_fkey";

-- DropForeignKey
ALTER TABLE "Kitap" DROP CONSTRAINT "Kitap_kullaniciId_fkey";

-- DropForeignKey
ALTER TABLE "Makale" DROP CONSTRAINT "Makale_kullaniciId_fkey";

-- DropForeignKey
ALTER TABLE "Odul" DROP CONSTRAINT "Odul_kullaniciId_fkey";

-- DropForeignKey
ALTER TABLE "Patent" DROP CONSTRAINT "Patent_kullaniciId_fkey";

-- DropForeignKey
ALTER TABLE "TezDanismanligi" DROP CONSTRAINT "TezDanismanligi_kullaniciId_fkey";

-- AlterTable
ALTER TABLE "EgitimOgretim" DROP COLUMN "donem",
DROP COLUMN "programAdi",
DROP COLUMN "yabanciDil",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dersTuru" "DersTuru" NOT NULL,
ADD COLUMN     "puan" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Atif";

-- DropTable
DROP TABLE "Etkinlik";

-- DropTable
DROP TABLE "IdariGorev";

-- DropTable
DROP TABLE "Kitap";

-- DropTable
DROP TABLE "Makale";

-- DropTable
DROP TABLE "Odul";

-- DropTable
DROP TABLE "Patent";

-- DropTable
DROP TABLE "TezDanismanligi";

-- CreateTable
CREATE TABLE "Makaleler" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "yayinAdi" VARCHAR(255) NOT NULL,
    "dergiAdi" VARCHAR(255) NOT NULL,
    "ciltNo" VARCHAR(50),
    "sayfaNo" VARCHAR(50),
    "yil" INTEGER NOT NULL,
    "indeksTuru" "IndeksTuru" NOT NULL,
    "qSinifi" "QSinifi" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Makaleler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kitaplar" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "kitapAdi" VARCHAR(255) NOT NULL,
    "yayinevi" VARCHAR(255) NOT NULL,
    "baskiSayisi" INTEGER NOT NULL,
    "yayinYeri" TEXT,
    "yil" INTEGER NOT NULL,
    "tur" "KitapTuru" NOT NULL,
    "dil" VARCHAR(50) NOT NULL,
    "puan" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kitaplar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atiflar" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "atifYapanEser" VARCHAR(255) NOT NULL,
    "atifYapanYazar" VARCHAR(255),
    "atifSayisi" INTEGER NOT NULL DEFAULT 1,
    "indeks" "AtifTuru" NOT NULL,
    "puan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atiflar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TezYoneticiligi" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "ogrenciAdi" VARCHAR(255) NOT NULL,
    "tezAdi" VARCHAR(255) NOT NULL,
    "enstitu" TEXT,
    "yil" INTEGER NOT NULL,
    "tezTuru" "TezTuru" NOT NULL,
    "puan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TezYoneticiligi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patentler" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "patentAdi" VARCHAR(255) NOT NULL,
    "patentTuru" "PatentTuru" NOT NULL,
    "yil" INTEGER NOT NULL,
    "puan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patentler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BilimselToplantilar" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "etkinlikAdi" VARCHAR(255) NOT NULL,
    "etkinlikTuru" "EtkinlikTuru" NOT NULL,
    "tarih" TIMESTAMP(3) NOT NULL,
    "yer" VARCHAR(255),
    "puan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BilimselToplantilar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArastirmaProjeleri" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "projeAdi" VARCHAR(255) NOT NULL,
    "projeTuru" "ArastirmaProjeTuru" NOT NULL,
    "yil" INTEGER NOT NULL,
    "baslamaTarihi" TIMESTAMP(3) NOT NULL,
    "bitisTarihi" TIMESTAMP(3) NOT NULL,
    "sure" INTEGER NOT NULL,
    "butce" DOUBLE PRECISION NOT NULL,
    "puan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArastirmaProjeleri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditorlukFaaliyetleri" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "dergiAdi" VARCHAR(255) NOT NULL,
    "editTuru" "EditorlukTuru" NOT NULL,
    "yil" INTEGER NOT NULL,
    "puan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EditorlukFaaliyetleri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oduller" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "odulAdi" VARCHAR(255) NOT NULL,
    "odulTuru" "OdulTuru" NOT NULL,
    "yil" INTEGER NOT NULL,
    "puan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Oduller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdariGorevler" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "gorevAdi" VARCHAR(255) NOT NULL,
    "gorevTuru" "IdariGorevTuru" NOT NULL,
    "baslamaTarihi" TIMESTAMP(3) NOT NULL,
    "bitisTarihi" TIMESTAMP(3) NOT NULL,
    "sure" INTEGER NOT NULL,
    "puan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdariGorevler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuzelSanatlarFaaliyetleri" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "faaliyetAdi" VARCHAR(255) NOT NULL,
    "faaliyetTuru" "GuzelSanatlarFaaliyetTuru" NOT NULL,
    "yil" INTEGER NOT NULL,
    "puan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuzelSanatlarFaaliyetleri_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Makaleler" ADD CONSTRAINT "Makaleler_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kitaplar" ADD CONSTRAINT "Kitaplar_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atiflar" ADD CONSTRAINT "Atiflar_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TezYoneticiligi" ADD CONSTRAINT "TezYoneticiligi_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patentler" ADD CONSTRAINT "Patentler_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BilimselToplantilar" ADD CONSTRAINT "BilimselToplantilar_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArastirmaProjeleri" ADD CONSTRAINT "ArastirmaProjeleri_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditorlukFaaliyetleri" ADD CONSTRAINT "EditorlukFaaliyetleri_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oduller" ADD CONSTRAINT "Oduller_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdariGorevler" ADD CONSTRAINT "IdariGorevler_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuzelSanatlarFaaliyetleri" ADD CONSTRAINT "GuzelSanatlarFaaliyetleri_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
