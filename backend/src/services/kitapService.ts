import { PrismaClient, KitapTuru } from "@prisma/client";

const prisma = new PrismaClient();


export const getKitaplarByKullaniciId = async (kullaniciId: number) => {
  return prisma.kitaplar.findMany({
    where: { kullaniciId },
    orderBy: { yil: 'desc' },
  });
};

export const KitaplarService = {
  async create(data: {
    kullaniciId: number;
    kitapAdi: string;
    yayinevi: string;
    baskiSayisi: number;
    yayinYeri?: string;
    yil: number;
    tur: KitapTuru;
    puan?: number;
  }) {
    return await prisma.kitaplar.create({ data });
  }
};
