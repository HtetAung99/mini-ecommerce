import React from "react";
import OrderDetailAmount from "./order_detail_amount";
import Link from "next/link";
import { LucideReceipt } from "lucide-react";

export default function OrderDetailHeader() {
  return (
    <div className="flex flex-row gap-3 ">
      <div className="flex  basis-2/5 flex-col justify-start gap-2 py-5">
        <span className="inline-flex items-center text-sm tracking-wide">
          <p className="w-1/3 font-semibold ">Purchase Date:</p>
          <p className="tracking-widest">Nov 27, 2022</p>
        </span>
        <span className="inline-flex items-center text-sm tracking-wide">
          <p className="w-1/3 font-semibold ">Order Number:</p>
          <p className="tracking-widest">BBY01-806830591220</p>
        </span>
        <Link
          className="flex items-center gap-2 py-2 text-sm font-bold"
          href={"#"}
        >
          <LucideReceipt size={18} />
          View Receipt
        </Link>
      </div>
      <div className="basis-2/5"></div>
      <OrderDetailAmount />
    </div>
  );
}
