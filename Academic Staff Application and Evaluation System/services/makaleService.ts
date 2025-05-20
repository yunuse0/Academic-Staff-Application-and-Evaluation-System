// services/makaleService.ts
import { PrismaClient, IndeksTuru } from '@prisma/client';

const prisma = new PrismaClient();

export const getMakalelerByKullaniciId = async (kullaniciId: number) => {
  return prisma.makaleler.findMany({
    where: { kullaniciId },
  });
};

export const addMakale = async (
  kullaniciId: number,
  yayinAdi: string,
  dergiAdi: string,
  ciltNo: string | null,
  sayfaNo: string | null,
  yil: number,
  indeksTuru: IndeksTuru,
  puan?: number,
  dosyaYolu?: string    
) => {
  try {
    const kullanici = await prisma.kullanici.findUnique({
      where: {
        id: kullaniciId
      }
    });

    if (!kullanici) {
      throw new Error('Geçerli bir kullanıcı bulunamadı.');
    }

    const newMakale = await prisma.makaleler.create({
      data: {
        kullaniciId,
        yayinAdi,
        dergiAdi,
        ciltNo,
        sayfaNo,
        yil,
        indeksTuru,
        puan,
        dosyaYolu
      }
    });

    return newMakale;
  } catch (error) {
    throw new Error(`Makale eklenirken bir hata oluştu: ${error.message}`);
  }
};
