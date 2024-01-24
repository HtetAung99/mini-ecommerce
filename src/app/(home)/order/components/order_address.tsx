import React from "react";

export default function OrderAddress() {
  return (
    <div className="flex basis-1/5 flex-col gap-4 py-4 text-sm font-light tracking-tight">
      <h4 className="font-semibold tracking-normal">Shipping Address</h4>
      <div>
        <p>Phyo Pyae Aung</p>
        <p>2700 Peterson Pl</p>
        <p>67 D</p>
        <p>Costa Mesa, CA 92626</p>
      </div>
    </div>
  );
}
