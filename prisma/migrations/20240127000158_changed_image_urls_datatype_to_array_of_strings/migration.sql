/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Variant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrls" TEXT[];
