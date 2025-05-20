/*
  Warnings:

  - The values [LİSANSUSTU,LİSANSUSTU_YD] on the enum `DersTuru` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DersTuru_new" AS ENUM ('ONLISANS_LISANS', 'ONLISANS_LISANS_YD', 'LISANSUSTU', 'LISANSUSTU_YD');
ALTER TABLE "EgitimOgretim" ALTER COLUMN "dersTuru" TYPE "DersTuru_new" USING ("dersTuru"::text::"DersTuru_new");
ALTER TYPE "DersTuru" RENAME TO "DersTuru_old";
ALTER TYPE "DersTuru_new" RENAME TO "DersTuru";
DROP TYPE "DersTuru_old";
COMMIT;
