import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import React from "react";
import OrderAddress from "./order-address";

import { OrderWithItems } from "@/app/types";
import { Headphones } from "lucide-react";
import { OrderStatus } from "@prisma/client";

export default async function OrderCardBody({
  order,
  item,
}: {
  order: OrderWithItems;
  item: any;
}) {
  const calculateProgress = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 10;
      case OrderStatus.PROCESSING:
        return 40;
      case OrderStatus.SHIPPED:
        return 80;
      case OrderStatus.DELIVERED:
        return 100;

      default:
        return 0;
    }
  };
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
          <p className="text-sm font-semibold capitalize tracking-normal">
            {item.product?.title}
            {" - "}
            {item.attributeValues?.map((v: any) => v.name).join(" ")}
          </p>
          <span className="font-semibold  leading-10 tracking-widest">
            Qty: {item.quantity}
          </span>
        </div>
      </div>
      <OrderAddress addressId={order.addressID} />
      <div className="basis-1/3 py-4 text-sm font-semibold tracking-normal">
        <h4 className="font-semibold tracking-normal">
          <span className="capitalize">{order.status.toLowerCase()}</span>
          <span> on {new Date(order.updatedAt).toDateString()}</span>
        </h4>
        <Progress
          className="my-4 h-2 w-[80%] bg-slate-300"
          value={calculateProgress(order.status)}
        />
        <Button className="flex flex-row items-center gap-3 px-8 py-2">
          <Headphones size={18} className="font-semibold" />
          Support Options
        </Button>
      </div>
    </div>
  );
}
