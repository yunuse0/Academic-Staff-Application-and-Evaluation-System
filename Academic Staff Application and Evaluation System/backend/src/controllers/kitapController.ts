import { Request, Response, NextFunction } from "express";
import { KitaplarService } from "../services/kitapService";
import { getKitaplarByKullaniciId } from "../services/kitapService";


export const getKitaplar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const kullaniciId = parseInt(req.query.kullaniciId as string);

  if (!kullaniciId) {
    res.status(400).json({ message: "Kullanıcı ID eksik" });
    return;
  }

  try {
    const kitaplar = await getKitaplarByKullaniciId(kullaniciId);
    res.status(200).json(kitaplar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error instanceof Error ? error.message : "Bilinmeyen hata" });
  }
};


export const createKitap = async (req: Request, res: Response) => {
  try {
    const kitap = await KitaplarService.create(req.body);
    res.status(201).json(kitap);
  } catch (error) {
    console.error("Kitap oluşturulurken hata:", error);
    res.status(500).json({ error: "Kitap kaydı oluşturulamadı." });
  }
};
