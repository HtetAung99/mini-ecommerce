import { PrismaClient, Prisma } from "@prisma/client";
import { seedUsers } from "./dataPopulation/user_seeding";
import { seedStores } from "./dataPopulation/store_seeding";
import { seedAttributes } from "./dataPopulation/attribute&attributeValue_seeding";
import { seedProducts } from "./dataPopulation/product_seeding";
import { seedVariants } from "./dataPopulation/variant_seeding";
import { seedVariantAvailabilities } from "./dataPopulation/variantAvailability_seeding";
import { seedCategories } from "./dataPopulation/category_seeding";
import { seedOrders } from "./dataPopulation/order_seeding";
import { seedAddresses } from "./dataPopulation/address_seeding";
import { seedPromotion } from "./dataPopulation/promotion_seeding";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  await seedUsers();
  await seedStores();
  await seedCategories();
  await seedAttributes();
  await seedProducts();
  await seedVariants();
  await seedVariantAvailabilities();
  await seedOrders();
  await seedAddresses();
  await seedPromotion();

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
