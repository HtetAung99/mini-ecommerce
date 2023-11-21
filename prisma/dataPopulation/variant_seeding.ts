import prisma from "../../lib/prisma";

const variantData = [
  // Variants for Samsung Galaxy S22
  {
    productId: 1,
    attributeValues: {
      connect: [{ name: "black" }, { name: "256GB" }],
    },
    priceDiff: 0,
  },
  {
    productId: 1,
    attributeValues: {
      connect: [{ name: "silver" }, { name: "512GB" }],
    },
    priceDiff: 150,
  },
  {
    productId: 1,
    attributeValues: {
      connect: [{ name: "blue" }, { name: "128GB" }],
    },
    priceDiff: -50,
  },
  {
    productId: 1,
    attributeValues: {
      connect: [{ name: "gold" }, { name: "1TB" }],
    },
    priceDiff: 200,
  },

  // Variants for Men's Casual Shirt
  {
    productId: 2,
    attributeValues: {
      connect: [{ name: "large" }, { name: "blue" }],
    },
    priceDiff: 5,
  },
  {
    productId: 2,
    attributeValues: {
      connect: [{ name: "medium" }, { name: "white" }],
    },
    priceDiff: 3,
  },
  {
    productId: 2,
    attributeValues: {
      connect: [{ name: "small" }, { name: "black" }],
    },
    priceDiff: 0,
  },
  {
    productId: 2,
    attributeValues: {
      connect: [{ name: "large" }, { name: "red" }],
    },
    priceDiff: 8,
  },

  // Variants for ASUS ROG Zephyrus G14
  {
    productId: 3,
    attributeValues: {
      connect: [{ name: "red" }, { name: "256GB" }],
    },
    priceDiff: -200,
  },
  {
    productId: 3,
    attributeValues: {
      connect: [{ name: "black" }, { name: "512GB" }],
    },
    priceDiff: -150,
  },
  {
    productId: 3,
    attributeValues: {
      connect: [{ name: "white" }, { name: "1TB" }],
    },
    priceDiff: -100,
  },
  {
    productId: 3,
    attributeValues: {
      connect: [{ name: "silver" }, { name: "256GB" }],
    },
    priceDiff: -180,
  },

  // Variants for Dell XPS 17
  {
    productId: 4,
    attributeValues: {
      connect: [{ name: "rose gold" }, { name: "512GB" }],
    },
    priceDiff: -100,
  },
  {
    productId: 4,
    attributeValues: {
      connect: [{ name: "silver" }, { name: "1TB" }],
    },
    priceDiff: -80,
  },
  {
    productId: 4,
    attributeValues: {
      connect: [{ name: "black" }, { name: "256GB" }],
    },
    priceDiff: -50,
  },
  {
    productId: 4,
    attributeValues: {
      connect: [{ name: "gold" }, { name: "512GB" }],
    },
    priceDiff: -120,
  },

  // Variants for Apple iPhone 13
  {
    productId: 5,
    attributeValues: {
      connect: [{ name: "red" }, { name: "512GB" }],
    },
    priceDiff: 100,
  },
  {
    productId: 5,
    attributeValues: {
      connect: [{ name: "blue" }, { name: "256GB" }],
    },
    priceDiff: -10,
  },
  {
    productId: 5,
    attributeValues: {
      connect: [{ name: "gold" }, { name: "128GB" }],
    },
    priceDiff: 50,
  },
  {
    productId: 5,
    attributeValues: {
      connect: [{ name: "silver" }, { name: "256GB" }],
    },
    priceDiff: -30,
  },

  // Variants for Sony Bravia 4K Smart TV
  {
    productId: 6,
    attributeValues: {
      connect: [{ name: "silver" }, { name: "55-inch" }],
    },
    priceDiff: 50,
  },
  {
    productId: 6,
    attributeValues: {
      connect: [{ name: "black" }, { name: "65-inch" }],
    },
    priceDiff: 120,
  },
  {
    productId: 6,
    attributeValues: {
      connect: [{ name: "white" }, { name: "40-inch" }],
    },
    priceDiff: -30,
  },
  {
    productId: 6,
    attributeValues: {
      connect: [{ name: "gold" }, { name: "50-inch" }],
    },
    priceDiff: 80,
  },

  // Add more variants for other products as needed.
];

// You can continue extending the array with more variants.

export const seedVariants = async () => {
  for (const v of variantData) {
    const variant = await prisma.variant.create({ data: v });
    console.log(`Created variant with id: ${variant.id}`);
  }
};
