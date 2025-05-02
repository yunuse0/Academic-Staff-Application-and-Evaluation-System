import { PrismaClient, IdariGorevTuru } from "@prisma/client";

const prisma = new PrismaClient();

export const GorevService = {
  async create(data: {
    kullaniciId: number;
    gorevAdi: string;
    gorevTuru: IdariGorevTuru;
    baslamaTarihi: Date;
    bitisTarihi: Date;
    sure: number;
    puan?: number;
  }) {
    return await prisma.idariGorevler.create({ data });
  }
};

export const getGorevlerByKullaniciId = async (kullaniciId: number) => {
  return await prisma.idariGorevler.findMany({
    where: { kullaniciId }
  });
};