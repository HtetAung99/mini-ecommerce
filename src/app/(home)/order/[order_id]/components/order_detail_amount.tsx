import { Order } from "@prisma/client";
import React from "react";

export default function OrderDetailAmount({ order }: { order: Order }) {
  const total = order.totalAmount / 100;
  const subTotal = total / 1.085;
  const tax = subTotal * 0.085;
  return (
    <div className="flex basis-1/5 flex-col justify-start gap-2 py-5">
      <span className="inline-flex items-center  text-sm tracking-wide">
        <p className="w-1/2 font-semibold ">Sub Total :</p>
        <p className="tracking-widest">$ {subTotal.toFixed(2)}</p>
      </span>
      <span className="inline-flex items-center  text-sm tracking-wide">
        <p className="w-1/2 font-semibold ">Tax :</p>
        <p className="tracking-widest">$ {tax.toFixed(2)}</p>
      </span>
      <span className="inline-flex items-center  text-sm tracking-wide">
        <p className="w-1/2 font-semibold ">Total :</p>
        <p className="tracking-widest">$ {total.toFixed(2)}</p>
      </span>
    </div>
  );
}
