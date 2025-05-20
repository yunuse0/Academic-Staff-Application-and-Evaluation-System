import { Request, Response } from "express";
import { EgitimOgretimService } from "../services/eduService";
import { getEgitimByKullaniciId } from "../services/eduService";

export const getEgitimFaaliyetleri = async (req: Request, res: Response) => {
  const kullaniciId = parseInt(req.query.kullaniciId as string);

  if (!kullaniciId) {
    res.status(400).json({ message: "Kullanıcı ID eksik" });
    return;
  }

  try {
    const egitimFaaliyetleri = await getEgitimByKullaniciId(kullaniciId);
    res.status(200).json(egitimFaaliyetleri);
  } catch (error) {
    console.error("Eğitim faaliyetleri alınırken hata oluştu:", error);
    res.status(500).json({ message: error instanceof Error ? error.message : "Bilinmeyen hata" });
  }
};

export const createFaaliyet = async (req: Request, res: Response) => {
  try {
    const yeniEgitim = await EgitimOgretimService.create(req.body);
    res.status(201).json(yeniEgitim);
  } catch (error) {
    console.error("Eğitim oluşturulurken hata:", error);
    res.status(500).json({ error: "Eğitim kaydı oluşturulamadı." });
  }
};
