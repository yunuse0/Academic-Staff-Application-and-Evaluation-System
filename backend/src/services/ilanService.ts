import { PrismaClient, IlanDurum, KadroTuru } from '@prisma/client';

const prisma = new PrismaClient();

export const IlanlarService = {
  async create(data: {
    baslik: string;
    aciklama: string;
    kadro: KadroTuru;
    baslangicTarihi: Date;
    bitisTarihi: Date;
    kriterler: string;
    durum?: IlanDurum;
  }) {
    return await prisma.ilanlar.create({
      data: {
        ...data
      }
    });
  },

  async getilan() {
    return await prisma.ilanlar.findMany({
      orderBy: {
        baslangicTarihi: "desc", 
      },
    });
  },
}