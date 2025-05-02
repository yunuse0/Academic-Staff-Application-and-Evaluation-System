-- CreateTable
CREATE TABLE "_IlanJuriRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_IlanJuriRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_IlanJuriRelation_B_index" ON "_IlanJuriRelation"("B");

-- AddForeignKey
ALTER TABLE "_IlanJuriRelation" ADD CONSTRAINT "_IlanJuriRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Ilanlar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IlanJuriRelation" ADD CONSTRAINT "_IlanJuriRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Kullanici"("id") ON DELETE CASCADE ON UPDATE CASCADE;
