import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import React from "react";

export default function OrderProgressBar({ stage }: { stage: OrderStatus }) {
  const stages: boolean[] = (() => {
    switch (stage) {
      case OrderStatus.PROCESSING:
        return [true, false, false];

      case OrderStatus.SHIPPED:
        return [true, true, false];

      case OrderStatus.DELIVERED:
        return [true, true, true];

      default:
        return [false, false, false];
    }
  })();

  return (
    <div className=" flex justify-center gap-32 text-xs text-slate-400">
      <div className="flex w-12 flex-col items-center gap-2">
        <div
          className={cn(
            " relative h-5 w-5 rounded-full  bg-slate-200",
            stages[0] && "bg-destructive",
          )}
        >
          <div
            className={cn(
              "absolute left-5 top-1/2 w-44 -translate-y-1/2 transform border-2 ",
              stages[1] && "border-destructive",
            )}
          ></div>
        </div>
        <span className="tracking-wide">Processing</span>
      </div>
      <div className="flex w-12  flex-col items-center gap-2">
        <div
          className={cn(
            "relative h-5 w-5 rounded-full bg-slate-200",
            stages[1] && "bg-destructive",
          )}
        ></div>
        <span>Shipped</span>
      </div>
      <div className="flex w-12  flex-col items-center gap-2">
        <div
          className={cn(
            "relative h-5 w-5 rounded-full bg-slate-200",
            stages[2] && "bg-destructive",
          )}
        >
          <div
            className={cn(
              "absolute right-5 top-1/2 -z-10 w-44 -translate-y-1/2 transform border-2 ",
              stages[2] && "border-destructive",
            )}
          ></div>
        </div>
        <span>Delivered</span>
      </div>
    </div>
  );
}
