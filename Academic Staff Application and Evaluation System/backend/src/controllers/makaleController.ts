// controllers/makaleController.ts
import { Request, Response, NextFunction } from 'express';
import { addMakale, getMakalelerByKullaniciId } from '../services/makaleService';
import { IndeksTuru } from '@prisma/client';


export const getMakaleler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const kullaniciId = parseInt(req.query.kullaniciId as string);

  if (!kullaniciId) {
    res.status(400).json({ message: "Kullanıcı ID eksik" });
    return;
  }

  try {
    const makaleler = await getMakalelerByKullaniciId(kullaniciId);
    res.status(200).json(makaleler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error instanceof Error ? error.message : "Bilinmeyen hata" });
  }
};

export const createMakale = async (req: Request, res: Response) => {
  const {
    kullaniciId,
    yayinAdi,
    dergiAdi,
    ciltNo,
    sayfaNo,
    yil,
    indeksTuru,
    puan
  }: {
    kullaniciId: number;
    yayinAdi: string;
    dergiAdi: string;
    ciltNo: string | null;
    sayfaNo: string | null;
    yil: number;
    indeksTuru: IndeksTuru;
    puan;
  } = req.body;

  try {
    const newMakale = await addMakale(kullaniciId, yayinAdi, dergiAdi, ciltNo, sayfaNo, yil, indeksTuru, puan);
    res.status(201).json({ message: 'Makale başarıyla eklendi.', makale: newMakale });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
