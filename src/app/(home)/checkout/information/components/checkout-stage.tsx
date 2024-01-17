import { cn } from "@/lib/utils";
import React from "react";

export default function CheckoutStage({ stage }: { stage: boolean[] }) {
  return (
    <div className="flex justify-center gap-40 text-xs text-slate-400">
      <div className="flex flex-col items-center gap-2">
        <div className={cn(" relative h-5 w-5 rounded-full bg-destructive")}>
          <div
            className={cn(
              "absolute left-5 top-1/2 w-52 -translate-y-1/2 transform border-2 ",
              stage[0] && "border-destructive",
            )}
          ></div>
        </div>
        <span>Cart's detail</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "relative h-5 w-5 rounded-full bg-slate-200",
            stage[0] && "bg-destructive",
          )}
        ></div>
        <span>Review cart</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "relative h-5 w-5 rounded-full bg-slate-200",
            stage[1] && "bg-destructive",
          )}
        >
          <div
            className={cn(
              "absolute right-5 top-1/2 -z-10 w-52 -translate-y-1/2 transform border-2 ",
              stage[1] && "border-destructive",
            )}
          ></div>
        </div>
        <span>Complete</span>
      </div>
    </div>
  );
}
