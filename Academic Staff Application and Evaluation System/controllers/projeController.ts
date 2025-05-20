import { Request, Response } from "express";
import { ArastirmaProjeleriService } from "../services/projeService";
import { getProjelerByKullaniciId } from "../services/projeService";

export const getProjeler = async (req: Request, res: Response) => {
  const kullaniciId = parseInt(req.query.kullaniciId as string);

  if (!kullaniciId) {
    res.status(400).json({ message: "Kullanıcı ID eksik." });
    return;
  }

  try {
    const projeler = await getProjelerByKullaniciId(kullaniciId);
    res.status(200).json(projeler);
  } catch (error) {
    console.error("Projeler getirme hatası:", error);
    res.status(500).json({ message: "Projeler alınamadı." });
  }
};

export const createProje = async (req: Request, res: Response) => {
  try {
    const {
      kullaniciId,
      projeAdi,
      projeTuru,
      yil,
      baslamaTarihi,
      bitisTarihi,
      sure,
      butce,
      puan,
    } = req.body;

    if (!kullaniciId || !projeAdi || !projeTuru || !yil || !baslamaTarihi || !bitisTarihi || !sure || !butce) {
      res.status(400).json({ message: "Zorunlu alanlar eksik." });
    }

    const newProje = await ArastirmaProjeleriService.create({
      kullaniciId,
      projeAdi,
      projeTuru,
      yil,
      baslamaTarihi: new Date(baslamaTarihi),
      bitisTarihi: new Date(bitisTarihi),
      sure,
      butce,
      puan,
    });

    res.status(201).json({ message: "Araştırma projesi eklendi.", proje: newProje });
  } catch (error) {
    console.error("Araştırma projesi ekleme hatası:", error);
    res.status(500).json({ message: "Bir hata oluştu." });
  }
};
