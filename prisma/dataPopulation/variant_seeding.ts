import prisma from "../../lib/prisma";
import fs from "fs";
import path from "path";

const folderPath = "./public/images";

const variantData = [
  // Variants for Samsung Galaxy S22
  {
    productId: 1,
    attributeValues: {
      connect: [{ name: "black" }, { name: "256GB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 0,
  },
  {
    productId: 1,
    attributeValues: {
      connect: [{ name: "silver" }, { name: "512GB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 150,
  },
  {
    productId: 1,
    attributeValues: {
      connect: [{ name: "blue" }, { name: "128GB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: -50,
  },
  {
    productId: 1,
    attributeValues: {
      connect: [{ name: "gold" }, { name: "1TB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 200,
  },

  // Variants for Men's Casual Shirt
  {
    productId: 2,
    attributeValues: {
      connect: [{ name: "large" }, { name: "blue" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 5,
  },
  {
    productId: 2,
    attributeValues: {
      connect: [{ name: "medium" }, { name: "white" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 3,
  },
  {
    productId: 2,
    attributeValues: {
      connect: [{ name: "small" }, { name: "black" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 0,
  },
  {
    productId: 2,
    attributeValues: {
      connect: [{ name: "large" }, { name: "red" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 8,
  },

  // Variants for ASUS ROG Zephyrus G14
  {
    productId: 3,
    attributeValues: {
      connect: [{ name: "red" }, { name: "256GB" }],
    },
    imageUrls: getRandomImages(),
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
    imageUrls: getRandomImages(),
    priceDiff: -100,
  },
  {
    productId: 3,
    attributeValues: {
      connect: [{ name: "silver" }, { name: "256GB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: -180,
  },

  // Variants for Dell XPS 17
  {
    productId: 4,
    attributeValues: {
      connect: [{ name: "rose gold" }, { name: "512GB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: -100,
  },
  {
    productId: 4,
    attributeValues: {
      connect: [{ name: "silver" }, { name: "1TB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: -80,
  },
  {
    productId: 4,
    attributeValues: {
      connect: [{ name: "black" }, { name: "256GB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: -50,
  },
  {
    productId: 4,
    attributeValues: {
      connect: [{ name: "gold" }, { name: "512GB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: -120,
  },

  // Variants for Apple iPhone 13
  {
    productId: 5,
    attributeValues: {
      connect: [{ name: "red" }, { name: "512GB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 100,
  },
  {
    productId: 5,
    attributeValues: {
      connect: [{ name: "blue" }, { name: "256GB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: -10,
  },
  {
    productId: 5,
    attributeValues: {
      connect: [{ name: "gold" }, { name: "128GB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 50,
  },
  {
    productId: 5,
    attributeValues: {
      connect: [{ name: "silver" }, { name: "256GB" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: -30,
  },

  // Variants for Sony Bravia 4K Smart TV
  {
    productId: 6,
    attributeValues: {
      connect: [{ name: "silver" }, { name: "55-inch" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 50,
  },
  {
    productId: 6,
    attributeValues: {
      connect: [{ name: "black" }, { name: "65-inch" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 120,
  },
  {
    productId: 6,
    attributeValues: {
      connect: [{ name: "white" }, { name: "40-inch" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: -30,
  },
  {
    productId: 6,
    attributeValues: {
      connect: [{ name: "gold" }, { name: "50-inch" }],
    },
    imageUrls: getRandomImages(),
    priceDiff: 80,
  },

  // Add more variants for other products as needed.
];

// You can continue extending the array with more variants.

export const seedVariants = async () => {
  let imageFiles: string[];
  try {
    const files = fs.readdirSync(folderPath);
    imageFiles = files.filter((file) => {
      const extname = path.extname(file);
      return [".jpg", ".jpeg", ".png"].includes(extname.toLowerCase());
    });
  } catch (err) {
    console.error("Error reading folder:", err);
  }

  function getRandomImages() {
    if (!imageFiles || imageFiles.length === 0) {
      console.error("No image files available.");
      return [];
    }

    const numberOfImages = Math.floor(Math.random() * 3) + 1;
    const randomImageNames = [];

    for (let i = 0; i < numberOfImages; i++) {
      const randomIndex = Math.floor(Math.random() * imageFiles.length);
      randomImageNames.push(imageFiles[randomIndex]);
    }

    console.log("randomImageNames", randomImageNames);

    return randomImageNames;
  }

  for (const v of variantData) {
    const variant = await prisma.variant.create({
      data: {
        ...v,
        imageUrls: getRandomImages(imageFiles),
      },
    });
    console.log(`Created variant with id: ${variant.id}`);
  }
};
