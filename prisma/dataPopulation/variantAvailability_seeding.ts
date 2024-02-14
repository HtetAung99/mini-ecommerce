import prisma from "../../lib/prisma";

const stocksData = [
  {
    variantId: 1, // Connects to the first variant of Samsung Galaxy S22
    storeId: 1, // Connects to store1
    quantity: 15,
  },
  {
    variantId: 2, // Connects to the second variant of Samsung Galaxy S22
    storeId: 2, // Connects to store2
    quantity: 10,
  },
  {
    variantId: 3, // Connects to the variant of Men's Casual Shirt
    storeId: 3, // Connects to store3
    quantity: 20,
  },
  {
    variantId: 4, // Connects to the variant of ASUS ROG Zephyrus G14
    storeId: 1, // Connects to store1
    quantity: 10,
  },
  {
    variantId: 5, // Connects to the variant of Dell XPS 17
    storeId: 1, // Connects to store1
    quantity: 8,
  },
  {
    variantId: 6, // Connects to the first variant of Apple iPhone 13
    storeId: 1, // Connects to store1
    quantity: 10,
  },
  {
    variantId: 7, // Connects to the second variant of Apple iPhone 13
    storeId: 2, // Connects to store2
    quantity: 10,
  },
  // Additional variantAvailabilities
  {
    variantId: 8, // Connects to a variant of Sony Bravia 4K Smart TV
    storeId: 2, // Connects to store2
    quantity: 5,
  },
  {
    variantId: 9, // Connects to a variant of Women's Running Shoes
    storeId: 3, // Connects to store3
    quantity: 15,
  },
  {
    variantId: 10, // Connects to a variant of Lenovo Legion Y540 Gaming Desktop
    storeId: 1, // Connects to store1
    quantity: 12,
  },
  {
    variantId: 11, // Connects to a variant of Modern Coffee Table
    storeId: 2, // Connects to store2
    quantity: 18,
  },
  {
    variantId: 12, // Connects to a variant of Canon EOS R5 Mirrorless Camera
    storeId: 3, // Connects to store3
    quantity: 7,
  },
  {
    variantId: 13, // Connects to a variant of Wireless Earbuds
    storeId: 1, // Connects to store1
    quantity: 25,
  },
  {
    variantId: 14, // Connects to a variant of Smart Thermostat
    storeId: 2, // Connects to store2
    quantity: 10,
  },
  {
    variantId: 15, // Connects to a variant of Outdoor Camping Tent
    storeId: 3, // Connects to store3
    quantity: 14,
  },
  {
    variantId: 16, // Connects to a variant of LG UltraWide Gaming Monitor
    storeId: 1, // Connects to store1
    quantity: 9,
  },
  {
    variantId: 17, // Connects to a variant of Leather Office Chair
    storeId: 2, // Connects to store2
    quantity: 12,
  },
  // Add more variantAvailabilities as needed.
];

export const seedVariantAvailabilities = async () => {
  for (const va of stocksData) {
    const stock = await prisma.stock.create({
      data: va,
    });
    console.log(`Created Stock with id: ${stock.id}`);
  }
};
