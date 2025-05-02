// controllers/tezYoneticiligiController.ts
import { Request, Response } from 'express';
import { TezYoneticiligiService } from '../services/tezService';
import { getTezlerByKullaniciId } from '../services/tezService';


export const getTezler = async (req: Request, res: Response) => {
  const kullaniciId = parseInt(req.query.kullaniciId as string);

  if (!kullaniciId) {
    res.status(400).json({ message: 'Kullanıcı ID eksik' });
    return;
  }

  try {
    const tezler = await getTezlerByKullaniciId(kullaniciId);
    res.status(200).json(tezler);
  } catch (error) {
    res.status(500).json({ message: `Tez verileri alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}` });
  }
};

export const createTez = async (req: Request, res: Response) => {
  const { kullaniciId, ogrenciAdi, tezAdi, enstitu, yil, tezTuru, puan } = req.body;

  try {
    const tez = await TezYoneticiligiService.create({
      kullaniciId,
      ogrenciAdi,
      tezAdi,
      enstitu,
      yil,
      tezTuru,
      puan,
    });

    res.status(201).json({
      message: 'Tez Yöneticiliği başarıyla eklendi.',
      tez,
    });
  } catch (error) {
    res.status(500).json({ message: `Bir hata oluştu: ${error.message}` });
  }
};
