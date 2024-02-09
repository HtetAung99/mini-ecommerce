import { OrderWithAllDetails } from "@/app/types";
import { ShippingMethod } from "@prisma/client";
import React from "react";

export default function CustomerPaymentInformation({
  order,
}: {
  order: OrderWithAllDetails;
}) {
  const shippingFee = () => {
    switch (order.shippingMethod) {
      case ShippingMethod.STANDARD:
        return 0;
      case ShippingMethod.NEXTDAY:
        return 7;
      case ShippingMethod.ONEDAY:
        return 10;
      default:
        return 0;
    }
  };
  const tax = () => {
    return (total() * 0.085) / 1.085;
  };

  const total = () => {
    return order.totalAmount / 100;
  };
  return (
    <>
      <h1 className="px-2 text-base font-medium leading-9 tracking-widest">
        Paid By Customer
      </h1>
      <div className="m-2 flex flex-col gap-2 rounded-lg border border-slate-200 p-2 text-sm leading-8 tracking-wide text-slate-600">
        <div className="flex w-full flex-row gap-4 px-4">
          <span className="w-40">Subtotal</span>
          <span className="">{order.orderItems.length} items</span>
          <span className="ml-auto">
            ${(total() - tax() - shippingFee()).toFixed(2)}
          </span>
        </div>
        <div className="flex w-full flex-row gap-4 px-4">
          <span className="w-40">Shipping</span>
          <span className="capitalize">
            {order.shippingMethod.toLowerCase()}
          </span>
          <span className="ml-auto">${shippingFee()}</span>
        </div>

        <div className="flex flex-row justify-between px-4">
          <span className="w-40">Tax</span>
          <span className="ml-auto">${tax().toFixed(2)}</span>
        </div>
        <hr />
        <div className="flex flex-row justify-between px-4 font-semibold">
          <span>Total paid by customer</span>
          <span className="tracking-widest">${total().toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}
