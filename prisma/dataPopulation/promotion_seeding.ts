import { DiscountType } from "@prisma/client";
import prisma from "../../lib/prisma";

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const promotionData = [
  {
    name: "Spring Promotion",
    description:
      "🌸 Welcome spring with blooming deals! Our Spring Fling Promotion is in full swing. Unearth fresh discounts on seasonal styles, vibrant essentials, and more. Embrace the bloom and shop now! 🌷🌼 #SpringFling #BloomingDeals",
    discount: 10.0,
    discountType: DiscountType.FLAT_PRICE,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    isActive: true,
    variants: {
      connect: Array.from({ length: 5 }, () => ({ id: getRandomInt(1, 50) })),
    },
  },
  {
    name: "Summer Promotion",
    description:
      "☀️ Dive into summer savings! Enjoy exclusive discounts on hot styles, outdoor essentials, and more. Make a splash with our limited-time Summer Promotion. Don't miss the sunshine deals! 🌺🕶️ #SummerSavings #HotDeals",
    discount: 20.0,
    discountType: DiscountType.PERCENTAGE,
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-02-28"),
    isActive: true,
    variants: {
      connect: Array.from({ length: 8 }, () => ({ id: getRandomInt(1, 50) })),
    },
  },
];

// You can continue extending the array with more attributes and values.

export const seedPromotion = async () => {
  for (const a of promotionData) {
    const promotion = await prisma.promotion.create({ data: a });
    console.log(`Created promotion with id: ${promotion.id}`);
  }
};
