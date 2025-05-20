// controllers/patentlerController.ts
import { Request, Response } from 'express';
import { PatentlerService } from '../services/patentService';
import { getPatentlerByKullaniciId } from '../services/patentService';

export const getPatentler = async (req: Request, res: Response) => {
  const kullaniciId = parseInt(req.query.kullaniciId as string);

  if (!kullaniciId) {
    res.status(400).json({ message: 'Kullanıcı ID eksik' });
    return;
  }

  try {
    const patentler = await getPatentlerByKullaniciId(kullaniciId);
    res.status(200).json(patentler);
  } catch (error) {
    res.status(500).json({ message: `Patentler alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}` });
  }
};

export const createPatent = async (req: Request, res: Response) => {
  const { kullaniciId, patentAdi, patentTuru, yil, puan } = req.body;

  try {
    const patent = await PatentlerService.create({
      kullaniciId,
      patentAdi,
      patentTuru,
      yil,
      puan,
    });

    res.status(201).json({
      message: 'Patent başarıyla eklendi.',
      patent,
    });
  } catch (error) {
    res.status(500).json({ message: `Bir hata oluştu: ${error.message}` });
  }
};
