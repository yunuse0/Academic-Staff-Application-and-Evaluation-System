import { Request, Response } from 'express';
import validateIdentity from '../services/tcVerify';

export const validateIdentityController = async (req: Request, res: Response) => {
  const { TCKimlikNo, ad, soyad, DogumYili } = req.body;

  if (!TCKimlikNo || !ad || !soyad || !DogumYili) {
    res.status(400).json({ message: 'Tüm alanlar doldurulmalıdır.' });
  }

  try {
    const isValid = await validateIdentity(TCKimlikNo, ad, soyad, DogumYili);

    if (isValid) {
      res.status(200).json({ message: 'Kimlik doğrulama başarılı.' });
    } else {
      res.status(400).json({ message: 'Kimlik doğrulama başarısız.' });
    }
  } catch (error) {
    console.error("Kimlik doğrulama hatası:", error);
    res.status(500).json({ message: 'Kimlik doğrulama sırasında bir hata oluştu.' });
  }
};
