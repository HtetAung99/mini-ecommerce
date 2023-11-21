import { PrismaClient, Prisma } from "@prisma/client";
import { seedUsers } from "./dataPopulation/user_seeding";
import { seedStores } from "./dataPopulation/store_seeding";
import { seedAttributes } from "./dataPopulation/attribute&attributeValue_seeding";
import { seedProducts } from "./dataPopulation/product_seeding";
import { seedVariants } from "./dataPopulation/variant_seeding";
import { seedVariantAvailabilities } from "./dataPopulation/variantAvailability_seeding";
import { seedCategories } from "./dataPopulation/category_seeding";
import { seedOrders } from "./dataPopulation/order_seeding";

const prisma = new PrismaClient();

// const productData = [
//   {
//     price: 1199.99,
//     title: "Samsung Galaxy S22",
//     categoryId: 4,
//     description:
//       "The Galaxy S22 offers cutting-edge features and a stunning display. With a powerful Exynos processor and versatile camera system, it's a flagship smartphone for tech enthusiasts.",
//     variants: {
//       create: [
//         {
//           attributeValues: {
//             connect: [{ name: "black" }, { name: "256GB" }],
//           },
//           priceDiff: 0,
//           variantAvailabilities: {
//             create: {
//               store: {
//                 connect: { name: "store1" },
//               },
//               quantity: 15,
//             },
//           },
//         },
//         {
//           attributeValues: {
//             connect: [{ name: "silver" }, { name: "512GB" }],
//           },
//           priceDiff: 150,
//           variantAvailabilities: {
//             create: {
//               store: {
//                 connect: { name: "store2" },
//               },
//               quantity: 10,
//             },
//           },
//         },
//         // Add more variants for the Samsung Galaxy S22 as needed.
//       ],
//     },
//   },
//   {
//     title: "Men's Casual Shirt",
//     description: "A comfortable and stylish shirt for casual occasions.",
//     price: 29.99,
//     categoryId: 8,
//     variants: {
//       create: [
//         {
//           attributeValues: {
//             connect: [{ name: "large" }, { name: "blue" }],
//           },
//           priceDiff: 5,
//           variantAvailabilities: {
//             create: {
//               store: {
//                 connect: { name: "store3" },
//               },
//               quantity: 20,
//             },
//           },
//         },
//       ],
//     },
//   },
//   {
//     title: "ASUS ROG Zephyrus G14",
//     price: 1399.99,
//     categoryId: 6,
//     description:
//       "The ASUS ROG Zephyrus G14 is a gaming laptop that combines performance and portability. With a powerful Ryzen processor and dedicated NVIDIA graphics, it delivers impressive gaming experiences in a compact form factor.",
//     variants: {
//       create: [
//         {
//           attributeValues: {
//             connect: [
//               {
//                 name: "red",
//               },
//               {
//                 name: "256GB",
//               },
//             ],
//           },
//           priceDiff: -200,
//           variantAvailabilities: {
//             create: {
//               store: {
//                 connect: { name: "store1" },
//               },
//               quantity: 10,
//             },
//           },
//         },
//       ],
//     },
//   },
//   {
//     title: "Dell XPS 17",
//     description:
//       "The Dell XPS 17 is a premium ultrabook with a stunning 4K OLED display. It's powered by the latest Intel processors and offers an exceptional computing experience.",
//     price: 1799.99,
//     categoryId: 5,
//     variants: {
//       create: [
//         {
//           attributeValues: {
//             connect: [{ name: "rose gold" }, { name: "512GB" }],
//           },
//           priceDiff: -100,
//           variantAvailabilities: {
//             create: {
//               store: {
//                 connect: { name: "store1" },
//               },
//               quantity: 8,
//             },
//           },
//         },
//       ],
//     },
//   },
//   {
//     title: "Apple iPhone 13",
//     price: 1249.99,
//     categoryId: 3,
//     description:
//       "The iPhone 13 offers advanced features and a powerful A15 Bionic chip. With a stunning Super Retina XDR display and improved camera capabilities, it is a flagship smartphone that meets the demands of modern users.",
//     variants: {
//       create: [
//         {
//           attributeValues: {
//             connect: [
//               {
//                 name: "red",
//               },
//               {
//                 name: "512GB",
//               },
//             ],
//           },
//           priceDiff: 100,
//           variantAvailabilities: {
//             create: {
//               store: {
//                 connect: { name: "store1" },
//               },
//               quantity: 10,
//             },
//           },
//         },
//         {
//           attributeValues: {
//             connect: [
//               {
//                 name: "blue",
//               },
//               {
//                 name: "256GB",
//               },
//             ],
//           },
//           priceDiff: -10,
//           variantAvailabilities: {
//             create: {
//               store: {
//                 connect: { name: "store2" },
//               },
//               quantity: 10,
//             },
//           },
//         },
//       ],
//     },
//   },
// ];

// You can continue adding more variants to the variantData array as needed.

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
