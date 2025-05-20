// services/tezYoneticiligiService.ts
import { PrismaClient, TezTuru } from '@prisma/client';

const prisma = new PrismaClient();

export const TezYoneticiligiService = {
  async create(data: {
    kullaniciId: number;
    ogrenciAdi: string;
    tezAdi: string;
    enstitu?: string;
    yil: number;
    tezTuru: TezTuru;
    puan?: number;
  }) {
    return await prisma.tezYoneticiligi.create({
      data: {
        ...data
      }
    });
  },
};

export const getTezlerByKullaniciId = async (kullaniciId: number) => {
  return await prisma.tezYoneticiligi.findMany({
    where: { kullaniciId }
  });
};
