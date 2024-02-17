import { getCurrentUser, isAdmin } from "../../../lib/session";
import prisma from "../../../lib/prisma";
import { OrderWithAllDetails } from "../types";

export const getOrders = async () => {
  const user = await getCurrentUser();
  console.log("inside getOrders:", user);
  const userId = user?.id;
  if (!userId) {
    return [];
  }
  const orders = await prisma.order.findMany({
    where: { customerId: userId },
    include: { orderItems: true },
  });
  return orders;
};

export const getOrderById = async (id: string) => {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (!userId) {
    throw new Error("You are not authorized!");
  }
  const order = await prisma.order.findUnique({
    where: { id, customerId: userId },
    include: { orderItems: true },
  });

  return order;
};

export const getOrdersForAdmin = async (): Promise<OrderWithAllDetails[]> => {
  const hasAccess = await isAdmin();
  // including customer is dangerouse, because it includes password
  if (hasAccess) {
    const orders: OrderWithAllDetails[] = (await prisma.order.findMany({
      include: {
        orderItems: true,
        customer: { select: { id: true, email: true, name: true, role: true } },
        address: true,
      },
      orderBy: { createdAt: "desc" },
    })) as OrderWithAllDetails[];
    return orders;
  }
  return [];
};

export const calculateTotal = async (
  items: any,
  shippingFee: number,
  tax: number,
) => {
  const orderItems = await prisma.variant.findMany({
    where: { id: { in: items.map((item: any) => item.id) } },
    include: { product: true },
  });

  let total = orderItems.reduce((prev, cur) => {
    return (
      prev +
      (cur.product.price + cur.priceDiff) *
        items.find((item: any) => item.id === cur.id).quantity
    );
  }, 0);

  total += shippingFee;
  total *= 1 + tax / 100;

  return Math.round(total * 100);
};
