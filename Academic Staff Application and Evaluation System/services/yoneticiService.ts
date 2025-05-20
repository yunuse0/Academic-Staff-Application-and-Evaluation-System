import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  // Kullanıcıyı jüri olarak atama ve ilana ekleme
  static async assignJuryToJobPost(tcKimlikNo: string, jobPostId: number) {
    try {
      // Kullanıcıyı bul
      const user = await prisma.kullanici.findUnique({
        where: { tcKimlikNo: tcKimlikNo },
      });

      if (!user) {
        throw new Error("Kullanıcı bulunamadı");
      }

      // Kullanıcı rolünü JURİ olarak güncelle
      const updatedUser = await prisma.kullanici.update({
        where: { tcKimlikNo: tcKimlikNo },
        data: { role: 'JURI_UYESI' },
      });

      // İlanı ve kullanıcıyı ilişkilendir
      const jobPost = await prisma.ilanlar.update({
        where: { id: jobPostId },
        data: {
          juri: {
            connect: { id: updatedUser.id }, // Kullanıcıyı ilana ata
          },
        },
      });

      return { updatedUser, jobPost };
    } catch (error) {
      throw new Error("Jüri atama sırasında hata oluştu: " + error.message);
    }
  }
}