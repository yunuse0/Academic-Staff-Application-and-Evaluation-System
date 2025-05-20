// services/patentlerService.ts
import { PrismaClient, PatentTuru } from '@prisma/client';

const prisma = new PrismaClient();

export const PatentlerService = {
  async create(data: {
    kullaniciId: number;
    patentAdi: string;
    patentTuru: PatentTuru;
    yil: number;
    puan?: number;
  }) {
    return await prisma.patentler.create({
      data: {
        ...data
      }
    });
  }
};
export const getPatentlerByKullaniciId = async (kullaniciId: number) => {
  return await prisma.patentler.findMany({
    where: { kullaniciId }
  });
};