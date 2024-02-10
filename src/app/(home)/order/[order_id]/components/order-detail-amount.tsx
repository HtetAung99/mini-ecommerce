import { calculateFees } from "@/app/utils/calculateFee";
import { Order } from "@prisma/client";

export default function OrderDetailAmount({ order }: { order: Order }) {
  const { total, shippingFee, subTotal, tax } = calculateFees(order);
  return (
    <div className="flex basis-1/5 flex-col justify-start gap-2 py-5">
      <span className="inline-flex items-center  text-sm tracking-wide">
        <p className="w-1/2 font-semibold ">Sub Total:</p>
        <p className="tracking-widest">$ {subTotal.toFixed(2)}</p>
      </span>
      <span className="inline-flex items-center  text-sm tracking-wide">
        <p className="w-1/2 font-semibold ">Shipping Fee:</p>
        <p className="tracking-widest">$ {shippingFee.toFixed(2)}</p>
      </span>
      <span className="inline-flex items-center  text-sm tracking-wide">
        <p className="w-1/2 font-semibold ">Tax:</p>
        <p className="tracking-widest">$ {tax.toFixed(2)}</p>
      </span>
      <span className="inline-flex items-center  text-sm tracking-wide">
        <p className="w-1/2 font-semibold ">Total:</p>
        <p className="tracking-widest">$ {total.toFixed(2)}</p>
      </span>
    </div>
  );
}
