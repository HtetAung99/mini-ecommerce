import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function OrderFilterHeader() {
  return (
    <div className="mb-4 flex flex-row items-center gap-10 border-b border-slate-200 pb-4">
      <Badge
        variant={"default"}
        className="cursor-pointer px-4 py-1  text-sm font-semibold leading-8 tracking-wide"
      >
        All Orders
      </Badge>
      <Badge
        variant={"secondary"}
        className=" cursor-pointer px-4 py-1 text-sm font-semibold leading-8 tracking-wide"
      >
        Completed Orders
      </Badge>
      <Badge
        variant={"secondary"}
        className=" cursor-pointer px-4 py-1 text-sm font-semibold leading-8 tracking-wide"
      >
        Cancelled Orders
      </Badge>
      <div className="ml-auto flex cursor-pointer items-center gap-4 text-sm font-semibold leading-8 tracking-wide">
        <span>Last 30 days</span>
        <ChevronDown size={18} />
      </div>
    </div>
  );
}
