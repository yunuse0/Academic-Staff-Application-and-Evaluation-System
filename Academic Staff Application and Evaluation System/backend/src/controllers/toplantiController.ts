import { Request, Response, NextFunction } from 'express';
import { EtkinlikTuru } from '@prisma/client';
import { addToplanti, getToplantilarByKullaniciId } from '../services/toplantiService';




export const getToplantilar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const kullaniciId = parseInt(req.query.kullaniciId as string);

  if (!kullaniciId) {
    res.status(400).json({ message: "Kullanıcı ID eksik" });
    return;
  }

  try {
    const toplantilar = await getToplantilarByKullaniciId(kullaniciId);
    res.status(200).json(toplantilar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error instanceof Error ? error.message : "Bilinmeyen hata" });
  }
};

export const createToplanti = async (req: Request, res: Response) => {
  const {
    kullaniciId,
    konferansAdi,
    bildiriAdi,
    etkinlikTuru,
    sayfaSayisi,
    tarih,
    yer,
    puan
  }: {
    kullaniciId: number;
    konferansAdi?: string;
    bildiriAdi?: string;
    etkinlikTuru: EtkinlikTuru;
    sayfaSayisi?: number;
    tarih: Date;
    yer?: string;
    puan?: number;
  } = req.body;

  try {
    const yeniToplanti = await addToplanti(
      kullaniciId,
      konferansAdi,
      bildiriAdi,
      etkinlikTuru,
      sayfaSayisi,
      new Date(tarih),
      yer,
      puan
    );

    res.status(201).json({ message: "Bilimsel toplantı başarıyla eklendi.", toplantı: yeniToplanti });
  } catch (error) {
    res.status(500).json({ message: error.message || "Toplantı eklenirken bir hata oluştu." });
  }
};
