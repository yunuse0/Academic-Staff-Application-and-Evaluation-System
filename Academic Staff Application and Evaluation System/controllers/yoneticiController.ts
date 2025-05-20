import { Request, Response } from 'express';
import { UserService } from '../services/yoneticiService';

// Kullanıcıyı jüriye atama işlemi
export const assignJuryController = async (req: Request, res: Response) => {
  const { tcKimlikNo, jobPostId } = req.body;

  try {
    const result = await UserService.assignJuryToJobPost(tcKimlikNo, jobPostId);
    res.status(200).json({
      message: 'Kullanıcı jüri olarak atandı ve ilana ekledi.',
      data: result,
    });
  } catch (error) {
    console.error('Jüri atama işlemi sırasında hata:', error);
    res.status(500).json({
      message: 'Jüri atama işlemi sırasında bir hata oluştu.',
      error: error.message,
    });
  }
};
