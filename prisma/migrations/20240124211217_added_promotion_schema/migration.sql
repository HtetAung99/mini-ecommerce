-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "promotionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
