import { ShippingMethod } from "@prisma/client";

export const calculateFees = (order: any) => {
  const total = order.totalAmount / 100;
  const tax = (total * 0.085) / 1.085;

  switch (order.shippingMethod) {
    case ShippingMethod.STANDARD:
      return { total, tax, shippingFee: 0, subTotal: total - tax - 0 };
    case ShippingMethod.NEXTDAY:
      return { total, tax, shippingFee: 7, subTotal: total - tax - 7 };
    case ShippingMethod.ONEDAY:
      return { total, tax, shippingFee: 10, subTotal: total - tax - 10 };
    default:
      return { total, tax, shippingFee: 0, subTotal: total - tax - 0 };
  }
};
