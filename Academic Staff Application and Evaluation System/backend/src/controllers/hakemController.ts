import { Request, Response } from "express";
import { EditorlukFaaliyetleriService } from "../services/hakemService";
import { EditorlukTuru } from "@prisma/client";
import { getEditorlukByKullaniciId } from "../services/hakemService";

export const getHakemlikler = async (req: Request, res: Response) => {
  const kullaniciId = parseInt(req.query.kullaniciId as string);

  if (!kullaniciId) {
    res.status(400).json({ message: "Kullanıcı ID eksik." });
    return;
  }

  try {
    const kayitlar = await getEditorlukByKullaniciId(kullaniciId);
    res.status(200).json(kayitlar);
  } catch (error) {
    console.error("Veri getirme hatası:", error);
    res.status(500).json({ message: "Editörlük faaliyetleri getirilemedi." });
  }
};


export const createHakem = async (req: Request, res: Response) => {
  try {
    const { kullaniciId, dergiAdi, editTuru, yil, puan } = req.body;

    if (!kullaniciId || !dergiAdi || !editTuru || !yil) {
      res.status(400).json({ message: "Zorunlu alanlar eksik." });
    }

    const yeniKayit = await EditorlukFaaliyetleriService.create({
      kullaniciId,
      dergiAdi,
      editTuru: editTuru as EditorlukTuru,
      yil,
      puan,
    });

    res.status(201).json({ message: "Editörlük faaliyeti eklendi.", data: yeniKayit });
  } catch (error) {
    console.error("Ekleme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası oluştu." });
  }
};
