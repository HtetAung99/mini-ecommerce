-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingMethod" "ShippingMethod" NOT NULL DEFAULT 'STANDARD',
ADD COLUMN     "shippingType" "ShippingType" NOT NULL DEFAULT 'DELIVERY';
