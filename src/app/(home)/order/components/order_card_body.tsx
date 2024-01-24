import { Progress } from "@/components/ui/progress";
import React from "react";

export default function OrderCardBody() {
  return (
    <div className="flex overflow-hidden rounded-sm border-t">
      <div className="flex flex-1 items-start gap-2  px-2 py-4 text-sm font-light tracking-tight">
        <img
          className="m-2 object-contain"
          width={50}
          src={
            "https://pisces.bbystatic.com/image2//BestBuy_US/images/products/6474/6474524_sd.jpg;canvasHeight=130;canvasWidth=128"
          }
          alt={"Coffee Machine"}
        />
        <div className="flex h-full flex-col justify-between">
          <p className="text-sm font-semibold tracking-normal">
            Café - Affetto Automatic Espresso Machine with 20 bars of pressure,
            Milk Frother, and Built-In Wi-Fi - Matte White
          </p>
          <span className="font-semibold  leading-10 tracking-widest">
            Qty: 1
          </span>
        </div>
      </div>
      <div className="flex basis-1/4 flex-col gap-4 py-4 text-sm font-light tracking-tight">
        <h4 className="font-semibold tracking-normal">Shipping Address</h4>
        <div>
          <p>Phyo Pyae Aung</p>
          <p>2700 Peterson Pl</p>
          <p>67 D</p>
          <p>Costa Mesa, CA 92626</p>
        </div>
      </div>
      <div className="basis-1/3 py-4 text-sm font-semibold tracking-normal">
        <h4 className="font-semibold tracking-normal">
          Shipped on Nov 29, 2023
        </h4>
        <Progress className="my-4 h-2 w-[80%] bg-slate-300" value={67} />
      </div>
    </div>
  );
}
