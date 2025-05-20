import { Request, Response } from "express";
import { AtiflarService } from "../services/atifService";
import { getAtiflarByKullaniciId } from "../services/atifService";

export const getAtiflar = async (req: Request, res: Response) => {
  const kullaniciId = parseInt(req.query.kullaniciId as string);

  if (!kullaniciId) {
    res.status(400).json({ message: "Kullanıcı ID eksik" });
    return;
  }

  try {
    const atiflar = await getAtiflarByKullaniciId(kullaniciId);
    res.status(200).json(atiflar);
  } catch (error) {
    console.error("Atıflar alınırken bir hata oluştu:", error);
    res.status(500).json({ message: error instanceof Error ? error.message : "Bilinmeyen hata" });
  }
};

export const createAtif = async (req: Request, res: Response) => {
  try {
    const { kullaniciId, atifYapanEser, atifSayisi, indeks, puan } = req.body;

    const created = await AtiflarService.create({
      kullaniciId,
      atifYapanEser,
      atifSayisi,
      indeks,
      puan
    });

    res.status(201).json(created);
  } catch (error) {
    console.error("Atıf ekleme hatası:", error);
    res.status(500).json({ error: "Atıf eklenemedi." });
  }
};