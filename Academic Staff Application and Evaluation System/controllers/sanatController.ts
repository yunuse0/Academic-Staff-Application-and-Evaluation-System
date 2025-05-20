import { Request, Response } from "express";
import { GuzelSanatlarFaaliyetleriService } from "../services/sanatService";
import { getSanatlarByKullaniciId } from "../services/sanatService";


export const createSanat = async (req: Request, res: Response) => {
  try {
    const { kullaniciId, faaliyetAdi, faaliyetTuru, yil, puan } = req.body;

    const newFaaliyet = await GuzelSanatlarFaaliyetleriService.create({
      kullaniciId,
      faaliyetAdi,
      faaliyetTuru,
      yil,
      puan,
    });

    res.status(201).json({
      message: "Faaliyet başarıyla eklendi.",
      faaliyet: newFaaliyet,
    });
  } catch (error) {
    console.error("Ekleme hatası:", error);
    res.status(400).json({
      message: "Bir hata oluştu.",
      description: "Faaliyet eklenemedi.",
    });
  }
};
export const getSanatFaaliyetleri = async (req: Request, res: Response) => {
  const kullaniciId = parseInt(req.query.kullaniciId as string);

  if (!kullaniciId) {
    return;
  }

  try {
    const faaliyetler = await getSanatlarByKullaniciId(kullaniciId);
    res.status(200).json(faaliyetler);
  } catch (error) {
    console.error("Veri getirme hatası:", error);
    res.status(500).json({ message: "Faaliyetler getirilemedi." });
  }
};