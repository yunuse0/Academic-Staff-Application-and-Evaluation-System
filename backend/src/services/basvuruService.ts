import { PrismaClient, BasvuruDurum } from '@prisma/client';

const prisma = new PrismaClient();

export const BasvurularService = {
  async create(data: {
    kullaniciId: number;
    ilanId: number;
    durum?: BasvuruDurum;
  }) {
    return await prisma.basvurular.create({
      data: {
        ...data,
        durum: data.durum ?? BasvuruDurum.BEKLIYOR,
      },
    });
  },
  async findByKullaniciId(kullaniciId: number) {
    return await prisma.basvurular.findMany({
      where: {
        kullaniciId: kullaniciId,   
      },
      include: {
        ilan: true,                
      },
      orderBy: {
        tarih: 'desc',             
      },
    });
  }
};

