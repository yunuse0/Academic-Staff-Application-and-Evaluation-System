-- CreateTable
CREATE TABLE "Kullanici" (
    "id" SERIAL NOT NULL,
    "ad" VARCHAR(100) NOT NULL,
    "soyad" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "parola" TEXT NOT NULL,
    "yetki" VARCHAR(50) NOT NULL,
    "birimId" INTEGER,
    "kayitTarihi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kullanici_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AkademikBirim" (
    "id" SERIAL NOT NULL,
    "birimAdi" VARCHAR(255) NOT NULL,
    "ustBirimId" INTEGER,

    CONSTRAINT "AkademikBirim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AkademikKadro" (
    "id" SERIAL NOT NULL,
    "kadroAdi" VARCHAR(100) NOT NULL,
    "minPuan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AkademikKadro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AkademikFaaliyet" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "kategori" VARCHAR(50) NOT NULL,
    "aciklama" TEXT NOT NULL,
    "puan" INTEGER NOT NULL DEFAULT 0,
    "tarih" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AkademikFaaliyet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtamaBasvuru" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "birimId" INTEGER NOT NULL,
    "kadroId" INTEGER NOT NULL,
    "durum" VARCHAR(50) NOT NULL,
    "juriRaporu" TEXT,
    "basvuruTarihi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AtamaBasvuru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JuriDegerlendirme" (
    "id" SERIAL NOT NULL,
    "juriId" INTEGER NOT NULL,
    "adayId" INTEGER NOT NULL,
    "rapor" TEXT NOT NULL,
    "puan" INTEGER NOT NULL DEFAULT 0,
    "tarih" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JuriDegerlendirme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proje" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "tur" VARCHAR(50) NOT NULL,
    "butce" DECIMAL(12,2) NOT NULL,
    "sureAy" INTEGER NOT NULL,
    "baslamaTarihi" TIMESTAMP(3) NOT NULL,
    "bitisTarihi" TIMESTAMP(3),

    CONSTRAINT "Proje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Yayin" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "yayinAdi" VARCHAR(255) NOT NULL,
    "tur" VARCHAR(50) NOT NULL,
    "atifSayisi" INTEGER NOT NULL DEFAULT 0,
    "qSinifi" VARCHAR(5) NOT NULL,
    "doi" VARCHAR(100),
    "yayinTarihi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Yayin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdariGorev" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "gorev" VARCHAR(255) NOT NULL,
    "baslamaTarihi" TIMESTAMP(3) NOT NULL,
    "bitisTarihi" TIMESTAMP(3),

    CONSTRAINT "IdariGorev_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Odul" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "odulAdi" VARCHAR(255) NOT NULL,
    "kurum" TEXT,
    "yil" INTEGER NOT NULL,

    CONSTRAINT "Odul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Makale" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "yayinAdi" VARCHAR(255) NOT NULL,
    "dergiAdi" VARCHAR(255) NOT NULL,
    "ciltNo" TEXT,
    "sayfaNo" TEXT,
    "yil" INTEGER NOT NULL,
    "indeks" VARCHAR(20) NOT NULL,
    "qSinifi" VARCHAR(5) NOT NULL,

    CONSTRAINT "Makale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kitap" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "kitapAdi" VARCHAR(255) NOT NULL,
    "yayinevi" VARCHAR(255) NOT NULL,
    "baskiSayisi" INTEGER NOT NULL,
    "yayinYeri" TEXT,
    "yil" INTEGER NOT NULL,
    "tur" VARCHAR(50) NOT NULL,
    "uluslararasi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Kitap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atif" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "atifYapanEser" VARCHAR(255) NOT NULL,
    "atifYapanYazar" TEXT,
    "atifSayisi" INTEGER NOT NULL DEFAULT 1,
    "indeks" VARCHAR(20) NOT NULL,

    CONSTRAINT "Atif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EgitimOgretim" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "dersAdi" VARCHAR(255) NOT NULL,
    "programAdi" TEXT,
    "donem" VARCHAR(50) NOT NULL,
    "yil" INTEGER NOT NULL,
    "yabanciDil" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EgitimOgretim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TezDanismanligi" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "ogrenciAdi" VARCHAR(255) NOT NULL,
    "tezAdi" VARCHAR(255) NOT NULL,
    "enstitu" TEXT,
    "yil" INTEGER NOT NULL,
    "seviyye" VARCHAR(50) NOT NULL,
    "esDanisman" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TezDanismanligi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patent" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "patentAdi" VARCHAR(255) NOT NULL,
    "yil" INTEGER NOT NULL,
    "tur" VARCHAR(50) NOT NULL,
    "lisanslandimi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Patent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etkinlik" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "etkinlikAdi" VARCHAR(255) NOT NULL,
    "tur" VARCHAR(50) NOT NULL,
    "tarih" TIMESTAMP(3) NOT NULL,
    "yer" TEXT,
    "uluslararasi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Etkinlik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToplamPuanlama" (
    "id" SERIAL NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "puan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ToplamPuanlama_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kullanici_email_key" ON "Kullanici"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Yayin_doi_key" ON "Yayin"("doi");

-- CreateIndex
CREATE UNIQUE INDEX "ToplamPuanlama_kullaniciId_key" ON "ToplamPuanlama"("kullaniciId");

-- AddForeignKey
ALTER TABLE "Kullanici" ADD CONSTRAINT "Kullanici_birimId_fkey" FOREIGN KEY ("birimId") REFERENCES "AkademikBirim"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AkademikBirim" ADD CONSTRAINT "AkademikBirim_ustBirimId_fkey" FOREIGN KEY ("ustBirimId") REFERENCES "AkademikBirim"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AkademikFaaliyet" ADD CONSTRAINT "AkademikFaaliyet_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtamaBasvuru" ADD CONSTRAINT "AtamaBasvuru_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtamaBasvuru" ADD CONSTRAINT "AtamaBasvuru_birimId_fkey" FOREIGN KEY ("birimId") REFERENCES "AkademikBirim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtamaBasvuru" ADD CONSTRAINT "AtamaBasvuru_kadroId_fkey" FOREIGN KEY ("kadroId") REFERENCES "AkademikKadro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JuriDegerlendirme" ADD CONSTRAINT "JuriDegerlendirme_juriId_fkey" FOREIGN KEY ("juriId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JuriDegerlendirme" ADD CONSTRAINT "JuriDegerlendirme_adayId_fkey" FOREIGN KEY ("adayId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proje" ADD CONSTRAINT "Proje_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Yayin" ADD CONSTRAINT "Yayin_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdariGorev" ADD CONSTRAINT "IdariGorev_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Odul" ADD CONSTRAINT "Odul_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Makale" ADD CONSTRAINT "Makale_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kitap" ADD CONSTRAINT "Kitap_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atif" ADD CONSTRAINT "Atif_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EgitimOgretim" ADD CONSTRAINT "EgitimOgretim_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TezDanismanligi" ADD CONSTRAINT "TezDanismanligi_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patent" ADD CONSTRAINT "Patent_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etkinlik" ADD CONSTRAINT "Etkinlik_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToplamPuanlama" ADD CONSTRAINT "ToplamPuanlama_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
