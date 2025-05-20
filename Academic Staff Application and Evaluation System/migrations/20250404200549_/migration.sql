/*
  Warnings:

  - The values [SCI_E,SSCI,AHCI] on the enum `IndeksTuru` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `qSinifi` on the `Makaleler` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "IndeksTuru_new" AS ENUM ('SSCI_Q1', 'SSCI_Q2', 'SSCI_Q3', 'SSCI_Q4', 'ESCI', 'SCOPUS', 'DIGER_ULUSLARARASI', 'ULAKBIM', 'DIGER_ULUSAL');
ALTER TABLE "Makaleler" ALTER COLUMN "indeksTuru" TYPE "IndeksTuru_new" USING ("indeksTuru"::text::"IndeksTuru_new");
ALTER TYPE "IndeksTuru" RENAME TO "IndeksTuru_old";
ALTER TYPE "IndeksTuru_new" RENAME TO "IndeksTuru";
DROP TYPE "IndeksTuru_old";
COMMIT;

-- AlterTable
ALTER TABLE "Makaleler" DROP COLUMN "qSinifi";

-- DropEnum
DROP TYPE "QSinifi";
