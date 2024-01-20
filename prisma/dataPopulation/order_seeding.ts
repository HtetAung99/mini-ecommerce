import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";

const orderData: Prisma.OrderCreateInput[] = [
  // {
  //   customer: { connect: { email: "htetaung@gmail.com" } },
  //   totalAmount: 150.0,
  //   orderItems: {
  //     create: [
  //       { quantity: 2, variantId: 1 },
  //       { quantity: 1, variantId: 2 },
  //     ],
  //   },
  // },
  // {
  //   customer: { connect: { email: "phyoUser@gmail.com" } },
  //   totalAmount: 75.5,
  //   orderItems: {
  //     create: [
  //       { quantity: 1, variantId: 3 },
  //       { quantity: 3, variantId: 4 },
  //     ],
  //   },
  // },
];

export const seedOrders = async () => {
  for (const o of orderData) {
    const order = await prisma.order.create({
      data: o,
    });
    console.log(`Created order with id: ${order.id}`);
  }
};
