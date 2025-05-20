import { PrismaClient, EditorlukTuru } from "@prisma/client";

const prisma = new PrismaClient();

export const EditorlukFaaliyetleriService = {
  async create(data: {
    kullaniciId: number;
    dergiAdi: string;
    editTuru: EditorlukTuru;
    yil: number;
    puan?: number;
  }) {
    return await prisma.editorlukFaaliyetleri.create({ data });
  }
};

export const getEditorlukByKullaniciId = async (kullaniciId: number) => {
  return await prisma.editorlukFaaliyetleri.findMany({
    where: { kullaniciId }
  });
};