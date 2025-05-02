import { Request, Response } from "express";
import { BasvurularService } from "../services/basvuruService";

export const basvuruYap = async (req: Request, res: Response) => {
  const { kullaniciId, ilanId } = req.body;

  if (!kullaniciId || !ilanId) {
    res.status(400).json({ message: "Kullanıcı ID ve ilan ID zorunludur." });
  }

  try {
    const existingApplication = await BasvurularService.findByKullaniciId(kullaniciId);

    if (existingApplication.some((application) => application.ilan.id === ilanId)) {
      res.status(400).json({ message: "Bu ilana zaten başvurmuşsunuz." });
    }

    const yeniBasvuru = await BasvurularService.create({
      kullaniciId,
      ilanId,
    });

    res.status(201).json({
      message: "Başvuru başarıyla yapıldı.",
      basvuru: yeniBasvuru,
    });
  } catch (error) {
    console.error("Başvuru hatası:", error);
    res.status(500).json({ message: `Hata: ${error.message}` });
  }
};

export const getAdayBasvuru = async (req: Request, res: Response) => {
  const { kullaniciId } = req.query;

  if (!kullaniciId) {
    res.status(400).json({ message: "Kullanıcı ID gereklidir." });
  }

  try {
    const basvurular = await BasvurularService.findByKullaniciId(Number(kullaniciId));

    res.status(200).json(basvurular);
  } catch (error) {
    console.error("Başvurular getirilemedi:", error);
    res.status(500).json({ message: "Başvurular getirilemedi." });
  }
};
