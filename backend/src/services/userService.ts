import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export async function createUser(tcKimlikNo: string, ad: string, soyad: string, parola: string) {
    const hashedPassword = await bcrypt.hash(parola, 10)
    try {
    const newUser = await prisma.kullanici.create({
      data: {
        tcKimlikNo:tcKimlikNo,
        ad:ad,
        soyad:soyad,
        parola:hashedPassword
      },
    });
    console.log('Kullanıcı başarıyla kaydedildi:', newUser);
  } catch (error) {
    console.error('Kullanıcı kaydedilemedi:', error);
  }
}

export async function loginUser(tcKimlikNo: string, parola: string) {
  try {
    const user = await prisma.kullanici.findUnique({
      where: {
        tcKimlikNo: tcKimlikNo,
      },
    });

    if (!user) {
      console.log('Kullanıcı bulunamadı.');
      return { error: 'Kullanıcı bulunamadı' };
    }

    const isPasswordValid = await bcrypt.compare(parola, user.parola);

    if (!isPasswordValid) {
      console.log('Parola geçersiz');
      return { error: 'Geçersiz parola' };
    }

    console.log('Giriş başarılı:', user);
    return { message: 'Giriş başarılı', user };

  } catch (error) {
    console.error('Giriş işlemi sırasında bir hata oluştu:', error);
    return { error: 'Bir hata oluştu' };
  }
}

