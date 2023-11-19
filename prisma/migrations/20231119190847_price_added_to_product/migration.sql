/*
  Warnings:

  - You are about to drop the column `price` on the `Variant` table. All the data in the column will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceDiff` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "price",
ADD COLUMN     "priceDiff" DOUBLE PRECISION NOT NULL;
