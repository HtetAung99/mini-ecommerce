import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CrossIcon, Headphones } from "lucide-react";
import React from "react";
import OrderAddress from "./order_address";

export default function OrderCardBody() {
  return (
    <div className="flex overflow-hidden rounded-sm border-t">
      <div className="mr-2 flex flex-1 items-start  gap-2 px-2 py-4 text-sm font-light tracking-tight">
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
      <OrderAddress />
      <div className="basis-1/3 py-4 text-sm font-semibold tracking-normal">
        <h4 className="font-semibold tracking-normal">
          Shipped on Nov 29, 2023
        </h4>
        <Progress className="my-4 h-2 w-[80%] bg-slate-300" value={67} />
        <Button className="flex flex-row items-center gap-3 px-8 py-2">
          <Headphones size={18} className="font-semibold" />
          Support Options
        </Button>
      </div>
    </div>
  );
}
