// controllers/adayController.ts
import { Request, Response } from 'express';
import { createUser, loginUser } from '../services/userService';
import jwt from 'jsonwebtoken';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { tcKimlikNo, ad, soyad, parola } = req.body;
    const yeniAday = await createUser(tcKimlikNo, ad, soyad, parola);

    res.status(201).json({
      mesaj: 'Aday başarıyla kaydedildi',
      aday: yeniAday
    });
  } catch (error: any) {
    res.status(400).json({ hata: error.message });
  }
};

export const loginUserControler = async (req:Request , res:Response) =>{

  const { tcKimlikNo, parola } = req.body;

    if (!tcKimlikNo || !parola) {
      res.status(400).json({ error: 'Eksik alanlar' });
    }

    try {
      const loginResult = await loginUser(tcKimlikNo, parola);

      if (loginResult.error) {
        res.status(400).json({ error: loginResult.error });
      }

      const token = jwt.sign(
        { userId: loginResult.user.id, tcKimlikNo: loginResult.user.tcKimlikNo }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } 
      );
      res.status(200).json({
        message: loginResult.message,
        user: loginResult.user,
        token: token,  
      });
    } catch (error) {
      res.status(500).json({
        error: 'Login işlemi sırasında bir hata oluştu',
      });
    }
  }
