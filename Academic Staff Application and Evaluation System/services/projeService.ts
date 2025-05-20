import { PrismaClient, ArastirmaProjeTuru } from "@prisma/client";

const prisma = new PrismaClient();

export const ArastirmaProjeleriService = {
  async create(data: {
    kullaniciId: number;
    projeAdi: string;
    projeTuru: ArastirmaProjeTuru;
    yil: number;
    baslamaTarihi: Date;
    bitisTarihi: Date;
    sure: number;
    butce: number;
    puan?: number;
  }) {
    return await prisma.arastirmaProjeleri.create({ data });
  }
};

export const getProjelerByKullaniciId = async (kullaniciId: number) => {
  return await prisma.arastirmaProjeleri.findMany({
    where: { kullaniciId }
  });
};