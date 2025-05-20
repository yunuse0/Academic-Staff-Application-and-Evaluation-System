import { PrismaClient, EtkinlikTuru } from '@prisma/client';

const prisma = new PrismaClient();

export const getToplantilarByKullaniciId = async (kullaniciId: number) => {
  return prisma.bilimselToplantilar.findMany({
    where: { kullaniciId },
    orderBy: { tarih: 'desc' },
  });
};

export const addToplanti = async (
  kullaniciId: number,
  konferansAdi: string | undefined,
  bildiriAdi: string | undefined,
  etkinlikTuru: EtkinlikTuru,
  sayfaSayisi: number | undefined,
  tarih: Date,
  yer: string | undefined,
  puan?: number
) => {
  try {
    const kullanici = await prisma.kullanici.findUnique({
      where: { id: kullaniciId }
    });

    if (!kullanici) {
      throw new Error("Geçerli bir kullanıcı bulunamadı.");
    }

    const yeniToplanti = await prisma.bilimselToplantilar.create({
      data: {
        kullaniciId,
        konferansAdi,
        bildiriAdi,
        etkinlikTuru,
        sayfaSayisi,
        tarih,
        yer,
        puan,
      }
    });

    return yeniToplanti;
  } catch (error) {
    throw new Error(`Toplantı eklenirken bir hata oluştu: ${error.message}`);
  }
};