import React from "react";

export default function OrderDetailAmount() {
  return (
    <div className="flex basis-1/5 flex-col justify-start gap-2 py-5">
      <span className="inline-flex items-center  text-sm tracking-wide">
        <p className="w-1/2 font-semibold ">Sub Total :</p>
        <p className="tracking-widest">$ 500.00</p>
      </span>
      <span className="inline-flex items-center  text-sm tracking-wide">
        <p className="w-1/2 font-semibold ">Tax :</p>
        <p className="tracking-widest">$ 50.00</p>
      </span>
      <span className="inline-flex items-center  text-sm tracking-wide">
        <p className="w-1/2 font-semibold ">Total :</p>
        <p className="tracking-widest">$ 550.00</p>
      </span>
    </div>
  );
}
