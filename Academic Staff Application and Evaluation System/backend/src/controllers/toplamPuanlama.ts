import { Request, Response } from 'express';
import { getToplamPuan } from '../services/toplamPuan'; // getToplamPuan'ı import et

// Kullanıcının toplam puanını getiren controller
export const getTotalPuan = async (req: Request, res: Response) => {
  const { kullaniciId } = req.query; // Kullanıcı ID'sini query parametrelerinden al

  // Kullanıcı ID'sinin geçerli olup olmadığını kontrol et
  if (!kullaniciId || Array.isArray(kullaniciId)) {
    res.status(400).json({ message: 'Geçersiz kullanıcı ID\'si' });
  }

  try {
    // Kullanıcı ID'sini sayıya çevir
    const totalPuan = await getToplamPuan(Number(kullaniciId));

    // Başarıyla toplam puanı döndür
    res.status(200).json({
      message: 'Toplam puan başarıyla alındı.',
      totalPuan
    });
  } catch (error) {
    console.error("Puanları toplarken hata oluştu:", error);
    res.status(500).json({ message: `Puanlar hesaplanırken bir hata oluştu: ${error.message}` });
  }
};
