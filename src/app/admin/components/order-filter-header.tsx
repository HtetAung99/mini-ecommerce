"use client";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function OrderFilterHeader() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const searchParamsValue = searchParams.get("o");

  return (
    <div className="mb-4 flex flex-row items-center gap-10 border-b border-slate-200 pb-4">
      <Link href={`${path}?o=all-orders`}>
        <Badge
          variant={searchParamsValue === "all-orders" ? "default" : "secondary"}
          className="cursor-pointer px-4 py-1  text-sm font-semibold leading-8 tracking-wide"
        >
          All Orders
        </Badge>
      </Link>
      <Link href={`${path}?o=completed-orders`}>
        <Badge
          variant={
            searchParamsValue === "completed-orders" ? "default" : "secondary"
          }
          className=" cursor-pointer px-4 py-1 text-sm font-semibold leading-8 tracking-wide"
        >
          Completed Orders
        </Badge>
      </Link>
      <Link href={`${path}?o=cancelled-orders`}>
        <Badge
          variant={
            searchParamsValue === "cancelled-orders" ? "default" : "secondary"
          }
          className=" cursor-pointer px-4 py-1 text-sm font-semibold leading-8 tracking-wide"
        >
          Cancelled Orders
        </Badge>
      </Link>
      <div className="ml-auto flex cursor-pointer items-center gap-4 text-sm font-semibold leading-8 tracking-wide">
        <span>Last 30 days</span>
        <ChevronDown size={18} />
      </div>
    </div>
  );
}
