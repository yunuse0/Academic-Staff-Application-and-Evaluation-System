import { PrismaClient, DersTuru, DersDonemi } from "@prisma/client";

const prisma = new PrismaClient();

export const EgitimOgretimService = {
  async create(data: {
    kullaniciId: number;
    dersAdi: string;
    programAdi: string;
    dersTuru: DersTuru;
    dersDonemi: DersDonemi;
    yil: number;
    puan?: number;
  }) {
    return await prisma.egitimOgretim.create({ data });
  },
};
export const getEgitimByKullaniciId = async (kullaniciId: number) => {
  return await prisma.egitimOgretim.findMany({
    where: { kullaniciId }
  });
};