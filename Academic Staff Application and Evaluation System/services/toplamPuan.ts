import prisma from "../utils/prisma";
export async function getToplamPuan(kullaniciId: number) {
  try {
    const toplamPuan = await prisma.toplamPuanlama.aggregate({
      where: {
        kullaniciId: kullaniciId,  
      },
      _sum: {
        puan: true,  
      },
    });

    return toplamPuan._sum.puan || 0;  
  } catch (error) {
    console.error("Puan toplama hatası:", error);
    throw new Error("Puanları toplarken bir hata oluştu.");
  }
}
