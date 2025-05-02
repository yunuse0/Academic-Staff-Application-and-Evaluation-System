// POST /api/juriBasvurular
import { Request, Response, RequestHandler } from "express";
import prisma from '../utils/prisma';
import jwt from 'jsonwebtoken';


export const getJuriBasvurular = async (req: Request, res: Response) => {
  const { userId } = req.query;  // Extract userId from query params

  if (!userId) {
    res.status(400).json({ message: 'User ID gerekli' });
    return;
  }

  try {
    const juri = await prisma.kullanici.findUnique({
      where: { id: Number(userId) },  // Use userId to fetch data
      include: {
        ilanlar: {
          include: {
            basvurular: {
              include: {
                kullanici: {
                  select: {
                    id: true,
                    ad: true,
                    soyad: true,
                    tcKimlikNo: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!juri) {
      res.status(404).json({ message: 'Jüri bulunamadı' });
      return;
    }

    res.json({ ilanlar: juri.ilanlar });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};



export const createJuriDegerlendirme: RequestHandler = async (req: Request, res: Response) => {
  const { juriId, adayId, rapor, durum } = req.body;

  if (!juriId || !adayId || !rapor || !durum) {
    res.status(400).json({ message: "Tüm alanlar zorunludur." });
  }

  try {
    await prisma.juriDegerlendirme.create({
      data: {
        juriId: Number(juriId),
        adayId: Number(adayId),
        rapor,
      }
    });

    await prisma.basvurular.updateMany({
      where: {
        kullaniciId: Number(adayId)
      },
      data: {
        durum
      }
    });

    res.status(201).json({ message: "Değerlendirme başarıyla kaydedildi." });
  } catch (error) {
    console.error("Juri değerlendirme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası", error });
  }
};
export const getAllJuriDegerlendirmeler = async (req: Request, res: Response) => {
  try {
    const degerlendirmeler = await prisma.juriDegerlendirme.findMany({
      include: {
        aday: {
          select: {
            id: true,
            ad: true,
            soyad: true,
            tcKimlikNo: true,
          },
        },
        juri: {
          select: {
            id: true,
            ad: true,
            soyad: true,
          },
        },
      },
      orderBy: {
        tarih: 'desc',
      },
    });

    const basvuruSonuclari = await prisma.basvurular.findMany({
      include: {
        kullanici: {
          select: {
            id: true,
            ad: true,
            soyad: true,
            tcKimlikNo: true,
          },
        },
        ilan: {
          select: {
            id: true,
            baslik: true,
          },
        },
      },
    });

    res.status(200).json({ degerlendirmeler, basvuruSonuclari });
  } catch (error) {
    console.error("Jüri değerlendirmeleri alınırken hata:", error);
    res.status(500).json({ message: "Sunucu hatası", error });
  }
};
